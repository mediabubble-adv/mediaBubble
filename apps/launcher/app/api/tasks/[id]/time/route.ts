// POST /api/tasks/:id/time — record a stopped timer span as a time_entries row.
// duration_minutes is derived from start/end so it always matches the stamps.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { timeEntrySchema } from '@/lib/tasks/schemas'
import { durationMinutes } from '@/lib/tasks/time'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function POST(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = timeEntrySchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const task = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!task) return toResponse(fail('not_found', 'Task not found', 404))

  const { start_time, end_time, description, billable } = parsed.data
  const entry = await prisma.time_entries.create({
    data: {
      user_id: me.id,
      task_id: id,
      date: start_time,
      start_time,
      end_time,
      duration_minutes: durationMinutes(start_time, end_time),
      description,
      billable,
    },
  })
  return toResponse(ok(entry, 'Time logged', 201))
}
