import type { PrismaClient } from '@prisma/client'

export const INTERNAL_CLIENT_NAME = 'MediaBubble Internal'

export async function resolveInternalClientId(db: PrismaClient): Promise<string> {
  const row = await db.clients.findFirst({
    where: { name: INTERNAL_CLIENT_NAME, deleted_at: null },
    select: { id: true },
  })
  if (!row) throw new Error(`Missing CRM client: ${INTERNAL_CLIENT_NAME}`)
  return row.id
}

export function isParentTask(task: { parent_task_id: string | null }): boolean {
  return task.parent_task_id === null
}
