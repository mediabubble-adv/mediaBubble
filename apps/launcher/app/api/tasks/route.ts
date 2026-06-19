// GET /api/tasks — list non-deleted tasks (optional status/assignee/department
// filters). POST /api/tasks — create a task owned by the current user.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { createTaskSchema, listTasksQuerySchema } from '@/lib/tasks/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listTasksQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const tasks = await prisma.tasks.findMany({
    where: { deleted_at: null, ...parsed.data },
    orderBy: { updated_at: 'desc' },
  })
  return toResponse(ok(tasks, 'Tasks retrieved'))
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createTaskSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const task = await prisma.tasks.create({
    data: { ...parsed.data, created_by: me.id },
  })
  return toResponse(ok(task, 'Task created', 201))
}
