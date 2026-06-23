import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params

  const updated = await prisma.notifications.updateMany({
    where: { id, user_id: me.id },
    data: { read: true },
  })

  if (updated.count === 0) return toResponse(fail('not_found', 'Notification not found', 404))

  return toResponse(ok(null, 'Notification marked as read'))
}
