// Client portal session cookie (separate from staff mb_session).

import { isProduction } from '@/lib/auth/config'

export const CLIENT_SESSION_COOKIE = 'mb_client_session'

/** Portal session lifetime — 7 days (matches staff sessions). */
export const CLIENT_SESSION_TTL = 60 * 60 * 24 * 7

export function serializeClientSessionCookie(
  token: string,
  maxAgeSeconds: number = CLIENT_SESSION_TTL,
): string {
  const attrs = [
    `${CLIENT_SESSION_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`,
  ]
  if (isProduction()) attrs.push('Secure')
  return attrs.join('; ')
}

export const clearClientSessionCookie = (): string => serializeClientSessionCookie('', 0)
