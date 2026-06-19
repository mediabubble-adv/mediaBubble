// POST /api/auth/request-password-reset — issue a one-time reset token.
// Always responds 200 with the same message so it never reveals whether an
// account exists for the given email.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { requestPasswordResetSchema } from '@/lib/auth/schemas'
import { generateOneTimeToken, TOKEN_TTL } from '@/lib/auth/tokens'
import { isProduction } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const GENERIC_MESSAGE = 'If an account exists for that email, a reset link has been sent.'

export async function POST(req: Request): Promise<Response> {
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }

  const parsed = requestPasswordResetSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const user = await prisma.users.findUnique({ where: { email: parsed.data.email } })
  if (!user) return toResponse(ok({ requested: true }, GENERIC_MESSAGE))

  const { token, tokenHash } = generateOneTimeToken()
  const requestedIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
  await prisma.password_reset_tokens.create({
    data: {
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: new Date(Date.now() + TOKEN_TTL.passwordReset * 1000),
      requested_ip: requestedIp,
    },
  })

  // No email transport yet (Phase 1): expose the raw token in non-prod only.
  const data = { requested: true, ...(isProduction() ? {} : { resetToken: token }) }
  return toResponse(ok(data, GENERIC_MESSAGE))
}
