// PUT /api/time/entries/:id — update an own Draft/Rejected entry.
// DELETE /api/time/entries/:id — remove an own Draft entry.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { canDeleteOwnEntry, canEditOwnEntry } from '@/lib/time/entries-policy'
import { updateTimeEntry } from '@/lib/time/entries'
import { updateTimeEntrySchema } from '@/lib/time/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

async function ownedEntry(id: string, userId: string) {
  return prisma.time_entries.findFirst({ where: { id, user_id: userId } })
}

export async function PUT(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const existing = await ownedEntry(id, me.id)
  if (!existing) return toResponse(fail('not_found', 'Time entry not found', 404))
  if (!canEditOwnEntry(existing.status)) {
    return toResponse(fail('conflict', 'Only draft or rejected entries can be edited', 409))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateTimeEntrySchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  if (parsed.data.status && parsed.data.status !== 'Draft' && parsed.data.status !== 'Submitted') {
    return toResponse(fail('forbidden', 'Use submit or review endpoints for status changes', 403))
  }

  if (parsed.data.task_id) {
    const task = await prisma.tasks.findFirst({
      where: { id: parsed.data.task_id, deleted_at: null },
    })
    if (!task) return toResponse(fail('not_found', 'Task not found', 404))
  }

  const start = parsed.data.start_time ?? existing.start_time
  const end = parsed.data.end_time ?? existing.end_time
  if (end.getTime() <= start.getTime()) {
    return toResponse(fail('validation_error', 'end_time must be after start_time', 400))
  }

  const entry = await updateTimeEntry(prisma, id, parsed.data)
  return toResponse(ok(entry, 'Time entry updated'))
}

export async function DELETE(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const existing = await ownedEntry(id, me.id)
  if (!existing) return toResponse(fail('not_found', 'Time entry not found', 404))
  if (!canDeleteOwnEntry(existing.status)) {
    return toResponse(fail('conflict', 'Only draft entries can be deleted', 409))
  }

  await prisma.time_entries.delete({ where: { id } })
  return toResponse(ok({ id }, 'Time entry deleted'))
}
