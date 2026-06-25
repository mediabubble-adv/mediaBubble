// GET /api/meet/members — active teammates for DM picker.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { prisma } from '@/lib/db/prisma'
import { isOnline } from '@/lib/presence/online'
import type { PresenceStatus } from '@/lib/presence/constants'

export const runtime = 'nodejs'

function memberPresenceStatus(
  lastSeen: Date | null | undefined,
  stored: string | null | undefined,
  now: Date,
): PresenceStatus {
  if (!isOnline(lastSeen, now)) return 'Offline'
  if (stored === 'Away' || stored === 'Busy') return stored
  return 'Online'
}

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const now = new Date()
  const members = await prisma.users.findMany({
    where: { status: 'active', deleted_at: null, id: { not: me.id } },
    select: {
      id: true,
      name: true,
      email: true,
      user_presence: { select: { last_seen: true, status: true, status_message: true } },
    },
    orderBy: { name: 'asc' },
  })

  const withPresence = members.map((m) => {
    const lastSeen = m.user_presence?.last_seen
    const presence_status = memberPresenceStatus(lastSeen, m.user_presence?.status, now)
    return {
      id: m.id,
      name: m.name,
      email: m.email,
      online: presence_status !== 'Offline',
      presence_status,
      status_message: m.user_presence?.status_message ?? null,
    }
  })

  withPresence.sort(
    (a, b) => Number(b.online) - Number(a.online) || a.name.localeCompare(b.name),
  )

  return toResponse(ok(withPresence, 'Meet members retrieved'))
}
