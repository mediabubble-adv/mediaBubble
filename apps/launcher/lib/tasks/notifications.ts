import type { Prisma, PrismaClient } from '@prisma/client'
import { formatActivityMessage } from '@/lib/tasks/activity'

type Db = PrismaClient | Prisma.TransactionClient

async function loadAssigneeIds(db: Db, taskId: string): Promise<string[]> {
  const rows = await db.task_assignees.findMany({
    where: { task_id: taskId },
    select: { user_id: true },
  })
  return rows.map((r) => r.user_id)
}

export async function notifyAssigneesChanged(
  db: Db,
  input: {
    taskId: string
    taskTitle: string
    actorId: string
    added: string[]
    removed: string[]
  },
): Promise<void> {
  const rows: Array<{
    user_id: string
    type: string
    title: string
    body: string
    href: string
  }> = []

  for (const userId of input.added) {
    if (userId === input.actorId) continue
    rows.push({
      user_id: userId,
      type: 'task_assigned',
      title: 'You were assigned to a task',
      body: input.taskTitle.slice(0, 280),
      href: `/tasks/${input.taskId}`,
    })
  }

  for (const userId of input.removed) {
    if (userId === input.actorId) continue
    rows.push({
      user_id: userId,
      type: 'task_unassigned',
      title: 'You were unassigned from a task',
      body: input.taskTitle.slice(0, 280),
      href: `/tasks`,
    })
  }

  if (rows.length === 0) return
  await db.notifications.createMany({ data: rows })
}

export async function notifyTaskActivityWatchers(
  db: Db,
  input: {
    taskId: string
    actorId: string
    actorName: string
    activityType: string
    payload: Record<string, unknown>
  },
): Promise<void> {
  if (input.activityType === 'assignee_changed') return

  const assigneeIds = await loadAssigneeIds(db, input.taskId)
  const targets = assigneeIds.filter((id) => id !== input.actorId)
  if (targets.length === 0) return

  const body = formatActivityMessage(input.activityType, input.payload, input.actorName)
  await db.notifications.createMany({
    data: targets.map((user_id) => ({
      user_id,
      type: 'task_activity',
      title: 'Task update',
      body: body.slice(0, 280),
      href: `/tasks/${input.taskId}`,
    })),
  })
}

export async function notifyMentionedUsers(
  db: PrismaClient,
  input: {
    userIds: string[]
    actorId: string
    taskId: string
    taskTitle: string
    excerpt: string
  },
): Promise<void> {
  const targets = [...new Set(input.userIds)].filter((id) => id !== input.actorId)
  if (targets.length === 0) return

  await db.notifications.createMany({
    data: targets.map((user_id) => ({
      user_id,
      type: 'task_mention',
      title: 'You were mentioned on a task',
      body: input.excerpt.slice(0, 280),
      href: `/tasks/${input.taskId}`,
    })),
  })
}
