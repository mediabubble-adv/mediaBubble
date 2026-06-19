// POST /api/auth/signup — create an account (pending email verification).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { signupSchema } from '@/lib/auth/schemas'
import { hashPassword } from '@/lib/auth/password'
import { generateOneTimeToken, TOKEN_TTL } from '@/lib/auth/tokens'
import { isProduction } from '@/lib/auth/config'
import { sendVerificationEmail } from '@/lib/auth/email'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }

  const parsed = signupSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))
  const { email, password, name } = parsed.data

  const existing = await prisma.users.findUnique({ where: { email } })
  if (existing) {
    return toResponse(fail('email_taken', 'An account with this email already exists', 409))
  }

  const user = await prisma.users.create({
    data: { email, name, password_hash: hashPassword(password), status: 'inactive' },
  })

  const { token, tokenHash } = generateOneTimeToken()
  await prisma.email_verification_tokens.create({
    data: {
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: new Date(Date.now() + TOKEN_TTL.emailVerification * 1000),
    },
  })

  try {
    await sendVerificationEmail(user.email, token)
  } catch (err: any) {
    if (isProduction()) {
      await prisma.email_verification_tokens.deleteMany({ where: { user_id: user.id } })
      await prisma.users.delete({ where: { id: user.id } })
      return toResponse(
        fail('email_delivery_failed', 'Failed to send verification email. Please try again.', 500),
      )
    }
    // eslint-disable-next-line no-console
    console.error('Failed to send verification email:', err)
  }

  const data = {
    user: { id: user.id, email: user.email, name: user.name, role: user.role, status: user.status },
    ...(isProduction() ? {} : { verificationToken: token }),
  }
  return toResponse(ok(data, 'Account created. Check your email to verify your address.', 201))
}
