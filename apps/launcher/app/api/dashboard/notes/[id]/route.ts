// DELETE /api/dashboard/notes/[id]

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

  const note = await prisma.dashboard_notes.findFirst({
    where: { id, user_id: me.id },
    select: { id: true },
  })
  if (!note) return toResponse(fail('not_found', 'Note not found', 404))

  await prisma.dashboard_notes.delete({ where: { id } })

  return toResponse(ok({ id }, 'Note deleted'))
}
