// GET/POST /api/tasks/:id/comments — list or add comments on a task.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { taskCommentSchema } from '@/lib/tasks/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const comments = await prisma.task_comments.findMany({
    where: { task_id: id, deleted_at: null },
    orderBy: { created_at: 'asc' },
  })
  return toResponse(ok(comments, 'Comments retrieved'))
}

export async function POST(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = taskCommentSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const task = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!task) return toResponse(fail('not_found', 'Task not found', 404))

  const comment = await prisma.task_comments.create({
    data: {
      task_id: id,
      user_id: me.id,
      content: parsed.data.content,
      mentioned_users: parsed.data.mentioned_users ?? [],
    },
  })
  return toResponse(ok(comment, 'Comment added', 201))
}
