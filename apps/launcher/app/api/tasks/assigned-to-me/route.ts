// GET /api/tasks/assigned-to-me — the current user's open task queue.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const tasks = await prisma.tasks.findMany({
    where: {
      deleted_at: null,
      OR: [
        { assigned_to: me.id },
        { task_assignees: { some: { user_id: me.id } } },
      ],
    },
    orderBy: [{ status: 'asc' }, { updated_at: 'desc' }],
  })
  return toResponse(ok(tasks, 'Assigned tasks retrieved'))
}
