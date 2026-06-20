// Short-lived JWT tickets for the WebSocket bridge (HttpOnly cookies do not cross ports).

import { signJwt } from '@/lib/auth/jwt'
import { getJwtSecret } from '@/lib/auth/config'
import type { Role } from '@/lib/auth/rbac'
import { COMMS_WS_KIND } from './events'

/** Ticket lifetime for WS auth (seconds). */
export const COMMS_WS_TICKET_TTL = 60 * 5

export interface CommsWsTicketClaims {
  sub: string
  role: Role
  kind: typeof COMMS_WS_KIND
  channels: string[]
}

export function issueCommsWsTicket(
  userId: string,
  role: Role,
  channelIds: string[],
): string {
  return signJwt(
    {
      sub: userId,
      role,
      kind: COMMS_WS_KIND,
      channels: channelIds,
    },
    getJwtSecret(),
    COMMS_WS_TICKET_TTL,
  )
}

export function parseCommsWsTicketClaims(
  claims: Record<string, unknown> | null,
): CommsWsTicketClaims | null {
  if (!claims || claims['kind'] !== COMMS_WS_KIND) return null
  if (typeof claims['sub'] !== 'string' || typeof claims['role'] !== 'string') return null
  if (!Array.isArray(claims['channels'])) return null
  const channels = claims['channels'].filter((id): id is string => typeof id === 'string')
  return {
    sub: claims['sub'],
    role: claims['role'] as Role,
    kind: COMMS_WS_KIND,
    channels,
  }
}

export function canSubscribeToChannel(claims: CommsWsTicketClaims, channelId: string): boolean {
  return claims.channels.includes(channelId)
}
