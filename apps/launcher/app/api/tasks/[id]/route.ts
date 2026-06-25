// GET/PUT/DELETE /api/tasks/:id — fetch, update, or soft-delete a single task.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { updateTaskSchema } from '@/lib/tasks/schemas'
import { recordTaskActivity } from '@/lib/tasks/activity'
import { isParentTask } from '@/lib/tasks/parent'
import { statusSideEffects } from '@/lib/tasks/status'
import {
  assigneeUserSelect,
  replaceTaskAssignees,
  resolveAssigneeIds,
} from '@/lib/tasks/assignees'
import { notifyAssigneesChanged, notifyTaskActivityWatchers } from '@/lib/tasks/notifications'
import { publishTaskActivityToMeet, maybePublishFirstTaskAchievement } from '@/lib/meet/feed-bridge'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

const taskDetailInclude = {
  clients: { select: { id: true, name: true } },
  task_assignees: {
    include: { users: { select: assigneeUserSelect } },
    orderBy: { created_at: 'asc' as const },
  },
  other_tasks: {
    where: { deleted_at: null },
    select: {
      id: true,
      title: true,
      status: true,
      assigned_to: true,
      created_at: true,
      task_assignees: {
        include: { users: { select: assigneeUserSelect } },
        orderBy: { created_at: 'asc' as const },
      },
    },
    orderBy: { created_at: 'asc' as const },
  },
} as const

function serializeTaskDetail(task: {
  task_assignees: Array<{ users: { id: string; name: string; avatar_url: string | null } }>
  other_tasks: Array<{
    task_assignees: Array<{ users: { id: string; name: string; avatar_url: string | null } }>
    [key: string]: unknown
  }>
  [key: string]: unknown
}) {
  return {
    ...task,
    assignees: task.task_assignees.map((r) => r.users),
    other_tasks: task.other_tasks.map((s) => ({
      ...s,
      assignees: s.task_assignees.map((r) => r.users),
      task_assignees: undefined,
    })),
    task_assignees: undefined,
  }
}

export async function GET(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const task = await prisma.tasks.findFirst({
    where: { id, deleted_at: null },
    include: taskDetailInclude,
  })
  if (!task) return toResponse(fail('not_found', 'Task not found', 404))
  return toResponse(ok(serializeTaskDetail(task), 'Task retrieved'))
}

export async function PUT(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateTaskSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const existing = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!existing) return toResponse(fail('not_found', 'Task not found', 404))

  if (isParentTask(existing) && parsed.data.client_id) {
    const client = await prisma.clients.findFirst({
      where: { id: parsed.data.client_id, deleted_at: null },
    })
    if (!client) return toResponse(fail('invalid_client', 'Client not found', 400))
  }

  const { status, assigned_to, assignee_ids, client_id, ...rest } = parsed.data
  const nextAssignees =
    assignee_ids !== undefined || assigned_to !== undefined
      ? resolveAssigneeIds({ assignee_ids, assigned_to })
      : null

  const task = await prisma.$transaction(async (tx) => {
    const updated = await tx.tasks.update({
      where: { id },
      data: {
        ...rest,
        ...(status ? statusSideEffects(status) : {}),
        ...(status !== undefined ? { status } : {}),
        ...(nextAssignees !== null ? { assigned_to: nextAssignees[0] ?? null } : {}),
        ...(isParentTask(existing) && client_id !== undefined ? { client_id } : {}),
        updated_at: new Date(),
      },
      include: taskDetailInclude,
    })

    let assigneeDiff: { added: string[]; removed: string[] } | null = null
    if (nextAssignees !== null) {
      assigneeDiff = await replaceTaskAssignees(tx, {
        taskId: id,
        userIds: nextAssignees,
        actorId: me.id,
      })
    }

    return { updated, assigneeDiff }
  })

  if (status !== undefined && status !== existing.status) {
    const actor = await prisma.users.findUnique({
      where: { id: me.id },
      select: { name: true },
    })
    await recordTaskActivity(prisma, {
      task_id: id,
      actor_id: me.id,
      type: 'status_changed',
      payload: { from: existing.status, to: status },
    })
    await notifyTaskActivityWatchers(prisma, {
      taskId: id,
      actorId: me.id,
      actorName: actor?.name ?? 'Someone',
      activityType: 'status_changed',
      payload: { from: existing.status, to: status },
    })
    void publishTaskActivityToMeet(prisma, {
      activityType: 'status_changed',
      payload: { from: existing.status, to: status },
      actorId: me.id,
      actorName: actor?.name ?? 'Someone',
      taskId: id,
      taskTitle: existing.title,
    }).catch((err) => console.error('[meet] feed publish failed', err))
    if (status === 'Done') {
      void maybePublishFirstTaskAchievement(prisma, me.id, actor?.name ?? 'Someone').catch((err) =>
        console.error('[meet] achievement publish failed', err),
      )
    }
  }

  if (task.assigneeDiff && (task.assigneeDiff.added.length > 0 || task.assigneeDiff.removed.length > 0)) {
    await recordTaskActivity(prisma, {
      task_id: id,
      actor_id: me.id,
      type: 'assignee_changed',
      payload: {
        added_user_ids: task.assigneeDiff.added,
        removed_user_ids: task.assigneeDiff.removed,
      },
    })
    await notifyAssigneesChanged(prisma, {
      taskId: id,
      taskTitle: existing.title,
      actorId: me.id,
      added: task.assigneeDiff.added,
      removed: task.assigneeDiff.removed,
    })
  }

  return toResponse(ok(serializeTaskDetail(task.updated), 'Task updated'))
}

export async function DELETE(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const existing = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!existing) return toResponse(fail('not_found', 'Task not found', 404))

  await prisma.tasks.update({ where: { id }, data: { deleted_at: new Date() } })
  return toResponse(ok({ id }, 'Task deleted'))
}
