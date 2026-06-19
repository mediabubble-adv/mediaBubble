// GET/PUT/DELETE /api/tasks/:id — fetch, update, or soft-delete a single task.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { updateTaskSchema } from '@/lib/tasks/schemas'
import { statusSideEffects } from '@/lib/tasks/status'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const task = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!task) return toResponse(fail('not_found', 'Task not found', 404))
  return toResponse(ok(task, 'Task retrieved'))
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

  const { status } = parsed.data
  const task = await prisma.tasks.update({
    where: { id },
    data: {
      ...parsed.data,
      ...(status ? statusSideEffects(status) : {}),
      updated_at: new Date(),
    },
  })
  return toResponse(ok(task, 'Task updated'))
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
