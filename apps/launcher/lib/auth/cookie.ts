// Session-cookie primitives. Deliberately free of `node:crypto` so this module
// is safe to import from edge-runtime middleware (which only checks for the
// cookie's presence). JWT verification lives in session.ts (node runtime).

import { ACCESS_TOKEN_TTL, isProduction } from './config'

export const SESSION_COOKIE = 'mb_session'

/**
 * Build a Set-Cookie value for the session token. Pass `maxAgeSeconds <= 0`
 * (see {@link clearSessionCookie}) to expire it immediately.
 */
export function serializeSessionCookie(
  token: string,
  maxAgeSeconds: number = ACCESS_TOKEN_TTL,
): string {
  const attrs = [
    `${SESSION_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`,
  ]
  if (isProduction()) attrs.push('Secure')
  return attrs.join('; ')
}

/** Set-Cookie value that clears the session (logout). */
export const clearSessionCookie = (): string => serializeSessionCookie('', 0)

/** Read a single cookie value from a raw `Cookie` header string. */
export function readCookieHeader(header: string | null, name: string): string | undefined {
  if (!header) return undefined
  for (const part of header.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq).trim() === name) {
      return decodeURIComponent(part.slice(eq + 1).trim())
    }
  }
  return undefined
}
