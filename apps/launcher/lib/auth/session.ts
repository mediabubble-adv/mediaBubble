// Server-side session resolution. Reads the session token (from the session
// cookie or an `Authorization: Bearer` header), verifies the JWT, and returns
// the authenticated user. Node runtime only (verifyJwt uses node:crypto) —
// call this from route handlers and server components, not edge middleware.

import { verifyJwt } from './jwt'
import { getJwtSecret } from './config'
import { isRole, type Role } from './rbac'
import { SESSION_COOKIE, readCookieHeader } from './cookie'

export interface SessionUser {
  id: string
  role: Role
}

/** Extract the raw session token from a request, or undefined if absent. */
export function getSessionToken(req: Request): string | undefined {
  const auth = req.headers.get('authorization')
  if (auth?.startsWith('Bearer ')) return auth.slice(7).trim() || undefined
  return readCookieHeader(req.headers.get('cookie'), SESSION_COOKIE)
}

/** Verify the request's session and return the user, or null if unauthenticated. */
export function getCurrentUser(req: Request): SessionUser | null {
  const token = getSessionToken(req)
  if (!token) return null
  const claims = verifyJwt(token, getJwtSecret())
  if (!claims || typeof claims.sub !== 'string' || !isRole(claims.role)) return null
  return { id: claims.sub, role: claims.role }
}
