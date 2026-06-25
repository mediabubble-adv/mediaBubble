// GET /api/tasks/:id/activity

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const task = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!task) return toResponse(fail('not_found', 'Task not found', 404))

  const activity = await prisma.task_activity.findMany({
    where: { task_id: id },
    orderBy: { created_at: 'asc' },
    include: { users: { select: { id: true, name: true } } },
  })

  const reactions = await prisma.task_reactions.findMany({
    where: { target_type: 'activity', target_id: { in: activity.map((a) => a.id) } },
  })

  return toResponse(ok({ activity, reactions }, 'Activity retrieved'))
}
