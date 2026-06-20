// GET /api/comms/realtime/ticket — short-lived JWT for the WebSocket bridge.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { channelListWhere } from '@/lib/comms/access'
import { issueCommsWsTicket } from '@/lib/comms/realtime/ticket'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const rows = await prisma.channels.findMany({
    where: channelListWhere(me.id, me.role),
    select: { id: true },
    take: 500,
  })

  const ticket = issueCommsWsTicket(
    me.id,
    me.role,
    rows.map((row) => row.id),
  )

  return toResponse(
    ok({
      ticket,
      expires_in: 60 * 5,
      ws_url: process.env['NEXT_PUBLIC_COMMS_WS_URL'] ?? 'ws://localhost:3004',
    }),
  )
}
