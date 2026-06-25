import type { Prisma, PrismaClient } from '@prisma/client'

export const TASK_ACTIVITY_TYPES = [
  'task_created',
  'status_changed',
  'assignee_changed',
  'subtask_added',
  'subtask_completed',
  'attachment_added',
] as const

export type TaskActivityType = (typeof TASK_ACTIVITY_TYPES)[number]

type Db = PrismaClient | Prisma.TransactionClient

export async function recordTaskActivity(
  db: Db,
  input: {
    task_id: string
    actor_id: string
    type: TaskActivityType
    payload: Prisma.InputJsonValue
  },
) {
  return db.task_activity.create({
    data: {
      task_id: input.task_id,
      actor_id: input.actor_id,
      type: input.type,
      payload: input.payload,
    },
  })
}

export type FeedItemKind = 'comment' | 'activity'

export interface FeedTimestamp {
  created_at: Date | string
}

export function mergeFeedByTime<T extends FeedTimestamp>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const at = new Date(a.created_at).getTime()
    const bt = new Date(b.created_at).getTime()
    return at - bt
  })
}

export function formatActivityMessage(
  type: string,
  payload: Record<string, unknown>,
  actorName: string,
): string {
  switch (type) {
    case 'task_created':
      return `${actorName} created this task`
    case 'status_changed':
      return `${actorName} moved status to ${String(payload['to'] ?? '—')}`
    case 'assignee_changed':
      return `${actorName} updated the assignee`
    case 'subtask_added':
      return `${actorName} added subtask “${String(payload['title'] ?? '')}”`
    case 'subtask_completed':
      return `${actorName} completed “${String(payload['title'] ?? '')}”`
    case 'attachment_added':
      return `${actorName} attached ${String(payload['file_name'] ?? 'a file')}`
    default:
      return `${actorName} updated the task`
  }
}
