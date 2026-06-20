// Magic-link issuance for client portal access.

import { signJwt } from '@/lib/auth/jwt'
import { getJwtSecret } from '@/lib/auth/config'
import { generateOneTimeToken, hashToken, isExpired } from '@/lib/auth/tokens'
import { CLIENT_SESSION_TTL } from '@/lib/portal/cookie'
import { CLIENT_PORTAL_KIND } from '@/lib/portal/session'

/** Magic link lifetime — 24 hours. */
export const PORTAL_MAGIC_LINK_TTL = 60 * 60 * 24

export function buildPortalSessionToken(clientId: string, email: string): string {
  return signJwt(
    { sub: clientId, email, kind: CLIENT_PORTAL_KIND },
    getJwtSecret(),
    CLIENT_SESSION_TTL,
  )
}

export function portalMagicLinkExpiresAt(now: Date = new Date()): Date {
  return new Date(now.getTime() + PORTAL_MAGIC_LINK_TTL * 1000)
}

export function createPortalMagicLink(): { token: string; tokenHash: string; expiresAt: Date } {
  const { token, tokenHash } = generateOneTimeToken()
  return { token, tokenHash, expiresAt: portalMagicLinkExpiresAt() }
}

export function isPortalTokenUsable(row: { expires_at: Date; used_at: Date | null }): boolean {
  return !row.used_at && !isExpired(row.expires_at)
}

export { hashToken }
