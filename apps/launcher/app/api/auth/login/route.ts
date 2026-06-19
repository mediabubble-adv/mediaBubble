// POST /api/auth/login — verify credentials and issue a stateless JWT.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { loginSchema } from '@/lib/auth/schemas'
import { verifyPassword } from '@/lib/auth/password'
import { signJwt } from '@/lib/auth/jwt'
import { getJwtSecret, ACCESS_TOKEN_TTL } from '@/lib/auth/config'
import { serializeSessionCookie } from '@/lib/auth/cookie'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))
  const { email, password } = parsed.data

  const user = await prisma.users.findUnique({ where: { email } })
  // Verify even when the user is missing to avoid leaking existence via timing.
  const valid = user?.password_hash ? verifyPassword(password, user.password_hash) : false
  if (!user || !valid) {
    return toResponse(fail('invalid_credentials', 'Email or password is incorrect', 401))
  }
  if (user.status !== 'active') {
    return toResponse(fail('account_inactive', 'Please verify your email before signing in', 403))
  }

  await prisma.users.update({ where: { id: user.id }, data: { last_login_at: new Date() } })

  const token = signJwt({ sub: user.id, role: user.role }, getJwtSecret(), ACCESS_TOKEN_TTL)
  const res = toResponse(
    ok(
      { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } },
      'Signed in',
    ),
  )
  // Persist the session as an httpOnly cookie so the proxy gate and server
  // components see it; the body token remains for non-browser API clients.
  res.headers.append('Set-Cookie', serializeSessionCookie(token))
  return res
}
