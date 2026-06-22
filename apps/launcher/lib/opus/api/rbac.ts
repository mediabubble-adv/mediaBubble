// RBAC helpers for OPUS API routes.

import { fail } from '@/lib/api/response'
import { getCurrentUser, type SessionUser } from '@/lib/auth/session'
import { hasAtLeast, type Role } from '@/lib/auth/rbac'

export function requireOpusAccess(req: Request, minimum: Role = 'Contributor'): SessionUser | Response {
  const me = getCurrentUser(req)
  if (!me) {
    return Response.json(fail('unauthorized', 'Authentication required', 401), { status: 401 })
  }
  if (!hasAtLeast(me.role, minimum)) {
    return Response.json(fail('forbidden', `${minimum} access required`, 403), { status: 403 })
  }
  return me
}

export function requireOpusManager(req: Request): SessionUser | Response {
  return requireOpusAccess(req, 'Manager')
}

export function isErrorResponse(value: SessionUser | Response): value is Response {
  return value instanceof Response
}
