// POST /api/comments/:commentId/attachments

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { attachmentMetaSchema } from '@/lib/tasks/schemas'
import { createTaskFileSignedUrl } from '@/lib/tasks/uploads'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ commentId: string }> }

export async function POST(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { commentId } = await params
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = attachmentMetaSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const comment = await prisma.task_comments.findFirst({
    where: { id: commentId, deleted_at: null },
  })
  if (!comment) return toResponse(fail('not_found', 'Comment not found', 404))

  const attachment = await prisma.comment_attachments.create({
    data: {
      comment_id: commentId,
      uploaded_by: me.id,
      file_name: parsed.data.file_name,
      file_url: parsed.data.file_url,
      file_size: parsed.data.file_size,
      mime_type: parsed.data.mime_type,
    },
  })

  const download_url = await createTaskFileSignedUrl(attachment.file_url).catch(() => null)

  return toResponse(ok({ ...attachment, download_url }, 'Comment attachment added', 201))
}
