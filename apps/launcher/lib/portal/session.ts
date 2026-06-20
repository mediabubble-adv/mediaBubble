// Client portal JWT session resolution (Node runtime).

import { cookies } from 'next/headers'
import { verifyJwt } from '@/lib/auth/jwt'
import { getJwtSecret } from '@/lib/auth/config'
import { CLIENT_SESSION_COOKIE } from '@/lib/portal/cookie'

export const CLIENT_PORTAL_KIND = 'client_portal' as const

export interface PortalSession {
  clientId: string
  email: string
}

function parsePortalClaims(claims: Record<string, unknown> | null): PortalSession | null {
  if (!claims || claims['kind'] !== CLIENT_PORTAL_KIND) return null
  if (typeof claims['sub'] !== 'string' || typeof claims['email'] !== 'string') return null
  return { clientId: claims['sub'], email: claims['email'] }
}

export function getPortalSessionToken(req: Request): string | undefined {
  const header = req.headers.get('cookie')
  if (!header) return undefined
  for (const part of header.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq).trim() === CLIENT_SESSION_COOKIE) {
      return decodeURIComponent(part.slice(eq + 1).trim()) || undefined
    }
  }
  return undefined
}

export function getCurrentPortalSession(req: Request): PortalSession | null {
  const token = getPortalSessionToken(req)
  if (!token) return null
  const claims = verifyJwt(token, getJwtSecret())
  return parsePortalClaims(claims)
}

export async function getServerPortalSession(): Promise<PortalSession | null> {
  const token = (await cookies()).get(CLIENT_SESSION_COOKIE)?.value
  if (!token) return null
  const claims = verifyJwt(token, getJwtSecret())
  return parsePortalClaims(claims)
}
