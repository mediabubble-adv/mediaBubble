// POST /api/auth/logout — clear the session cookie. Sessions are stateless
// JWTs, so there's nothing server-side to revoke; we just expire the cookie.

import { ok } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { clearSessionCookie } from '@/lib/auth/cookie'

export const runtime = 'nodejs'

export async function POST(): Promise<Response> {
  const res = toResponse(ok(null, 'Signed out'))
  res.headers.append('Set-Cookie', clearSessionCookie())
  return res
}
