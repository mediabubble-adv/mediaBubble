// Resolve the session inside Server Components / layouts, where there's no
// Request object — reads the cookie via next/headers. Mirrors getCurrentUser()
// (lib/auth/session.ts), which serves route handlers that do have a Request.

import { cookies } from 'next/headers'
import { verifyJwt } from './jwt'
import { getJwtSecret } from './config'
import { isRole, type Role } from './rbac'
import { SESSION_COOKIE } from './cookie'

export interface SessionUser {
  id: string
  role: Role
}

export async function getServerSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null
  const claims = verifyJwt(token, getJwtSecret())
  if (!claims || typeof claims.sub !== 'string' || !isRole(claims.role)) return null
  return { id: claims.sub, role: claims.role }
}
