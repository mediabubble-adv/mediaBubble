// DELETE /api/time/availability/:id — remove an own availability slot.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function DELETE(_req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const existing = await prisma.availability.findFirst({ where: { id, user_id: me.id } })
  if (!existing) return toResponse(fail('not_found', 'Availability slot not found', 404))

  await prisma.availability.delete({ where: { id } })
  return toResponse(ok({ id }, 'Availability slot deleted'))
}
