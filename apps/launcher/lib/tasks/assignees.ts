import type { Prisma, PrismaClient } from '@prisma/client'

export interface TaskAssigneeUser {
  id: string
  name: string
  avatar_url: string | null
}

type Db = PrismaClient | Prisma.TransactionClient

export function diffAssigneeIds(previous: string[], next: string[]): {
  added: string[]
  removed: string[]
} {
  const prev = new Set(previous)
  const nxt = new Set(next)
  return {
    added: [...nxt].filter((id) => !prev.has(id)),
    removed: [...prev].filter((id) => !nxt.has(id)),
  }
}

export async function replaceTaskAssignees(
  db: Db,
  input: {
    taskId: string
    userIds: string[]
    actorId: string
  },
): Promise<{ added: string[]; removed: string[] }> {
  const uniqueIds = [...new Set(input.userIds)]
  const existing = await db.task_assignees.findMany({
    where: { task_id: input.taskId },
    select: { user_id: true },
  })
  const previous = existing.map((r) => r.user_id)
  const { added, removed } = diffAssigneeIds(previous, uniqueIds)

  if (removed.length > 0) {
    await db.task_assignees.deleteMany({
      where: { task_id: input.taskId, user_id: { in: removed } },
    })
  }

  for (const userId of added) {
    await db.task_assignees.create({
      data: {
        task_id: input.taskId,
        user_id: userId,
        assigned_by: input.actorId,
      },
    })
  }

  await db.tasks.update({
    where: { id: input.taskId },
    data: { assigned_to: uniqueIds[0] ?? null },
  })

  return { added, removed }
}

export const assigneeUserSelect = {
  id: true,
  name: true,
  avatar_url: true,
} as const

export async function loadTaskAssignees(
  db: Db,
  taskIds: string[],
): Promise<Map<string, TaskAssigneeUser[]>> {
  if (taskIds.length === 0) return new Map()
  const rows = await db.task_assignees.findMany({
    where: { task_id: { in: taskIds } },
    include: { users: { select: assigneeUserSelect } },
    orderBy: { created_at: 'asc' },
  })
  const map = new Map<string, TaskAssigneeUser[]>()
  for (const row of rows) {
    const list = map.get(row.task_id) ?? []
    list.push(row.users)
    map.set(row.task_id, list)
  }
  return map
}

export function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

/** Prefer explicit assignee_ids; fall back to legacy single assigned_to. */
export function resolveAssigneeIds(input: {
  assignee_ids?: string[]
  assigned_to?: string | null
}): string[] {
  if (input.assignee_ids !== undefined) return [...new Set(input.assignee_ids)]
  if (input.assigned_to) return [input.assigned_to]
  return []
}

export function serializeAssignees(
  rows: Array<{ users: TaskAssigneeUser }>,
): TaskAssigneeUser[] {
  return rows.map((r) => r.users)
}
