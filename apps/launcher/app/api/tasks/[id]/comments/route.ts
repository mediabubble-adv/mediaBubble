// GET/POST /api/tasks/:id/comments — list or add comments on a task.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { taskCommentSchema } from '@/lib/tasks/schemas'
import { notifyMentionedUsers } from '@/lib/tasks/notifications'
import { createTaskFileSignedUrl } from '@/lib/tasks/uploads'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const comments = await prisma.task_comments.findMany({
    where: { task_id: id },
    orderBy: { created_at: 'asc' },
    include: {
      users: { select: { id: true, name: true, avatar_url: true } },
      comment_attachments: true,
    },
  })

  const commentsWithUrls = await Promise.all(
    comments.map(async (comment) => ({
      ...comment,
      comment_attachments: await Promise.all(
        comment.comment_attachments.map(async (att) => ({
          ...att,
          download_url: await createTaskFileSignedUrl(att.file_url).catch(() => null),
        })),
      ),
    })),
  )

  const reactions = await prisma.task_reactions.findMany({
    where: { target_type: 'comment', target_id: { in: comments.map((c) => c.id) } },
  })

  return toResponse(ok({ comments: commentsWithUrls, reactions }, 'Comments retrieved'))
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

  if (parsed.data.parent_id) {
    const parentComment = await prisma.task_comments.findFirst({
      where: { id: parsed.data.parent_id, task_id: id, deleted_at: null },
    })
    if (!parentComment) return toResponse(fail('not_found', 'Parent comment not found', 404))
  }

  const comment = await prisma.task_comments.create({
    data: {
      task_id: id,
      user_id: me.id,
      parent_id: parsed.data.parent_id,
      content: parsed.data.content,
      mentioned_users: parsed.data.mentioned_users ?? [],
    },
    include: {
      users: { select: { id: true, name: true, avatar_url: true } },
      comment_attachments: true,
    },
  })

  const mentionIds = parsed.data.mentioned_users ?? []
  if (mentionIds.length > 0) {
    await notifyMentionedUsers(prisma, {
      userIds: mentionIds,
      actorId: me.id,
      taskId: id,
      taskTitle: task.title,
      excerpt: parsed.data.content,
    })
  }

  return toResponse(ok(comment, 'Comment added', 201))
}
