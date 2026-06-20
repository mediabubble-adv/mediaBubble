// PATCH /api/time/entries/:id/review — manager approve/reject a submitted entry.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { canReviewEntry } from '@/lib/time/entries-policy'
import { reviewTimeEntrySchema } from '@/lib/time/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const existing = await prisma.time_entries.findUnique({ where: { id } })
  if (!existing) return toResponse(fail('not_found', 'Time entry not found', 404))
  if (!canReviewEntry(existing.status, existing.user_id, me.id, me.role)) {
    return toResponse(fail('forbidden', 'Cannot review this entry', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = reviewTimeEntrySchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.time_entries.update({
    where: { id },
    data: { status: parsed.data.status, updated_at: new Date() },
    include: {
      tasks: { select: { id: true, title: true } },
      users: { select: { id: true, name: true, email: true } },
    },
  })
  return toResponse(ok(row, `Time entry ${parsed.data.status.toLowerCase()}`))
}
