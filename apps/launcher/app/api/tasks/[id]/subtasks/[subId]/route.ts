// PATCH /api/tasks/:id/subtasks/:subId

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { updateSubtaskSchema } from '@/lib/tasks/schemas'
import { recordTaskActivity } from '@/lib/tasks/activity'
import { statusSideEffects } from '@/lib/tasks/status'
import { resolveAssigneeIds, replaceTaskAssignees } from '@/lib/tasks/assignees'
import { notifyAssigneesChanged } from '@/lib/tasks/notifications'
import { publishTaskActivityToMeet } from '@/lib/meet/feed-bridge'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string; subId: string }> }

export async function PATCH(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id, subId } = await params
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateSubtaskSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const existing = await prisma.tasks.findFirst({
    where: { id: subId, parent_task_id: id, deleted_at: null },
  })
  if (!existing) return toResponse(fail('not_found', 'Subtask not found', 404))

  const { status, assigned_to, assignee_ids, ...rest } = parsed.data
  const nextAssignees =
    assignee_ids !== undefined || assigned_to !== undefined
      ? resolveAssigneeIds({ assignee_ids, assigned_to })
      : null

  const result = await prisma.$transaction(async (tx) => {
    const subtask = await tx.tasks.update({
      where: { id: subId },
      data: {
        ...rest,
        ...(status !== undefined ? { status, ...statusSideEffects(status) } : {}),
        ...(nextAssignees !== null ? { assigned_to: nextAssignees[0] ?? null } : {}),
        updated_at: new Date(),
      },
    })

    let assigneeDiff: { added: string[]; removed: string[] } | null = null
    if (nextAssignees !== null) {
      assigneeDiff = await replaceTaskAssignees(tx, {
        taskId: subId,
        userIds: nextAssignees,
        actorId: me.id,
      })
    }

    return { subtask, assigneeDiff }
  })

  if (status === 'Done' && existing.status !== 'Done') {
    const actor = await prisma.users.findUnique({
      where: { id: me.id },
      select: { name: true },
    })
    const parent = await prisma.tasks.findUnique({
      where: { id },
      select: { title: true },
    })
    await recordTaskActivity(prisma, {
      task_id: id,
      actor_id: me.id,
      type: 'subtask_completed',
      payload: { subtask_id: result.subtask.id, title: result.subtask.title },
    })
    void publishTaskActivityToMeet(prisma, {
      activityType: 'subtask_completed',
      payload: { subtask_id: result.subtask.id, title: result.subtask.title },
      actorId: me.id,
      actorName: actor?.name ?? 'Someone',
      taskId: id,
      taskTitle: parent?.title,
    }).catch((err) => console.error('[meet] feed publish failed', err))
  }

  if (result.assigneeDiff && (result.assigneeDiff.added.length > 0 || result.assigneeDiff.removed.length > 0)) {
    await notifyAssigneesChanged(prisma, {
      taskId: subId,
      taskTitle: result.subtask.title,
      actorId: me.id,
      added: result.assigneeDiff.added,
      removed: result.assigneeDiff.removed,
    })
  }

  return toResponse(ok(result.subtask, 'Subtask updated'))
}
