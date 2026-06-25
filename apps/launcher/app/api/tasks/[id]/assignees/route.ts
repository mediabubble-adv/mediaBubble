// PATCH /api/tasks/:id/assignees — replace task assignees (multi-assignee).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { replaceAssigneesSchema } from '@/lib/tasks/schemas'
import { recordTaskActivity } from '@/lib/tasks/activity'
import { assigneeUserSelect, replaceTaskAssignees, serializeAssignees } from '@/lib/tasks/assignees'
import { notifyAssigneesChanged } from '@/lib/tasks/notifications'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = replaceAssigneesSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const task = await prisma.tasks.findFirst({
    where: { id, deleted_at: null },
    select: { id: true, title: true },
  })
  if (!task) return toResponse(fail('not_found', 'Task not found', 404))

  const { added, removed } = await prisma.$transaction(async (tx) => {
    const result = await replaceTaskAssignees(tx, {
      taskId: id,
      userIds: parsed.data.user_ids,
      actorId: me.id,
    })

    if (added.length > 0 || removed.length > 0) {
      await recordTaskActivity(tx, {
        task_id: id,
        actor_id: me.id,
        type: 'assignee_changed',
        payload: { added_user_ids: added, removed_user_ids: removed },
      })
    }

    return result
  })

  await notifyAssigneesChanged(prisma, {
    taskId: id,
    taskTitle: task.title,
    actorId: me.id,
    added,
    removed,
  })

  const rows = await prisma.task_assignees.findMany({
    where: { task_id: id },
    include: { users: { select: assigneeUserSelect } },
    orderBy: { created_at: 'asc' },
  })

  return toResponse(ok({ assignees: serializeAssignees(rows) }, 'Assignees updated'))
}
