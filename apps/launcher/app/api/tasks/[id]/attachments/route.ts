// GET/POST /api/tasks/:id/attachments

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { attachmentMetaSchema } from '@/lib/tasks/schemas'
import { recordTaskActivity } from '@/lib/tasks/activity'
import { createTaskFileSignedUrl } from '@/lib/tasks/uploads'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const rows = await prisma.task_attachments.findMany({
    where: { task_id: id },
    orderBy: { created_at: 'desc' },
    include: { users: { select: { id: true, name: true } } },
  })

  const withUrls = await Promise.all(
    rows.map(async (row) => ({
      ...row,
      download_url: await createTaskFileSignedUrl(row.file_url).catch(() => null),
    })),
  )

  return toResponse(ok(withUrls, 'Attachments retrieved'))
}

export async function POST(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = attachmentMetaSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const task = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!task) return toResponse(fail('not_found', 'Task not found', 404))

  const attachment = await prisma.task_attachments.create({
    data: {
      task_id: id,
      uploaded_by: me.id,
      file_name: parsed.data.file_name,
      file_url: parsed.data.file_url,
      file_size: parsed.data.file_size,
      mime_type: parsed.data.mime_type,
    },
  })

  await recordTaskActivity(prisma, {
    task_id: id,
    actor_id: me.id,
    type: 'attachment_added',
    payload: { attachment_id: attachment.id, file_name: attachment.file_name },
  })

  return toResponse(ok(attachment, 'Attachment recorded', 201))
}
