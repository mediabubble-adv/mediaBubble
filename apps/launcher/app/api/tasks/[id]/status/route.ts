// PATCH /api/tasks/:id/status — move a task between Kanban columns. Separate
// from PUT so drag-and-drop can fire a tiny, intent-revealing request.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { statusUpdateSchema } from '@/lib/tasks/schemas'
import { statusSideEffects } from '@/lib/tasks/status'
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
  const parsed = statusUpdateSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const existing = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!existing) return toResponse(fail('not_found', 'Task not found', 404))

  const { status } = parsed.data
  const task = await prisma.tasks.update({
    where: { id },
    data: { status, ...statusSideEffects(status), updated_at: new Date() },
  })
  return toResponse(ok(task, 'Task status updated'))
}
