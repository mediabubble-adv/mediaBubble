// POST /api/portal/logout — clear the client portal session cookie.

import { ok } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { clearClientSessionCookie } from '@/lib/portal/cookie'

export const runtime = 'nodejs'

export async function POST(): Promise<Response> {
  const response = toResponse(ok({ logged_out: true }, 'Signed out'))
  response.headers.append('Set-Cookie', clearClientSessionCookie())
  return response
}
