import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  await prisma.notifications.updateMany({
    where: { user_id: me.id, read: false },
    data: { read: true },
  })

  return toResponse(ok(null, 'All notifications marked as read'))
}
