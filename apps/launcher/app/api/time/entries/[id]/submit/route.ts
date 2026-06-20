// PATCH /api/time/entries/:id/submit — submit an own draft entry for approval.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { canSubmitEntry } from '@/lib/time/entries-policy'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const existing = await prisma.time_entries.findFirst({ where: { id, user_id: me.id } })
  if (!existing) return toResponse(fail('not_found', 'Time entry not found', 404))
  if (!canSubmitEntry(existing.status, existing.user_id, me.id)) {
    return toResponse(fail('conflict', 'Only draft or rejected entries can be submitted', 409))
  }

  const row = await prisma.time_entries.update({
    where: { id },
    data: { status: 'Submitted', updated_at: new Date() },
    include: { tasks: { select: { id: true, title: true } } },
  })
  return toResponse(ok(row, 'Time entry submitted'))
}
