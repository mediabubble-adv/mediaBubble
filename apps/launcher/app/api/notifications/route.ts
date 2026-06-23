import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'
import { serializeNotification } from '@/lib/notifications'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const [rows, unread_count] = await Promise.all([
    prisma.notifications.findMany({
      where: { user_id: me.id },
      orderBy: { created_at: 'desc' },
      take: 30,
    }),
    prisma.notifications.count({
      where: { user_id: me.id, read: false },
    }),
  ])

  return toResponse(ok({ items: rows.map(serializeNotification), unread_count }, 'Notifications retrieved'))
}
