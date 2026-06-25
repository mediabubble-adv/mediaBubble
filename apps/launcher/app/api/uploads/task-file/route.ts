// POST /api/uploads/task-file — upload file to Supabase, return storage path metadata.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import {
  assertFileSize,
  buildTaskStoragePath,
  isAllowedTaskMime,
  uploadTaskFile,
  createTaskFileSignedUrl,
} from '@/lib/tasks/uploads'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const form = await req.formData()
  const file = form.get('file')
  const taskId = form.get('task_id')
  if (!(file instanceof File) || typeof taskId !== 'string' || !taskId) {
    return toResponse(fail('invalid_request', 'file and task_id are required', 400))
  }

  const task = await prisma.tasks.findFirst({ where: { id: taskId, deleted_at: null } })
  if (!task) return toResponse(fail('not_found', 'Task not found', 404))

  const mime = file.type || 'application/octet-stream'
  if (!isAllowedTaskMime(mime)) {
    return toResponse(fail('invalid_file', 'File type not allowed', 400))
  }

  assertFileSize(file.size)

  const storagePath = buildTaskStoragePath(taskId, file.name)
  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    await uploadTaskFile(storagePath, buffer, mime)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    return toResponse(fail('upload_failed', message, 502))
  }

  const download_url = await createTaskFileSignedUrl(storagePath).catch(() => null)

  return toResponse(
    ok(
      {
        file_name: file.name,
        file_url: storagePath,
        file_size: file.size,
        mime_type: mime,
        download_url,
      },
      'File uploaded',
      201,
    ),
  )
}
