// POST /api/auth/reset-password — consume a reset token and set a new password.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { resetPasswordSchema } from '@/lib/auth/schemas'
import { hashPassword } from '@/lib/auth/password'
import { hashToken, isExpired } from '@/lib/auth/tokens'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }

  const parsed = resetPasswordSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))
  const { token, password } = parsed.data

  const row = await prisma.password_reset_tokens.findUnique({
    where: { token_hash: hashToken(token) },
  })
  if (!row || row.consumed_at || isExpired(row.expires_at)) {
    return toResponse(fail('invalid_token', 'This reset link is invalid or has expired', 400))
  }

  await prisma.$transaction([
    prisma.password_reset_tokens.update({
      where: { id: row.id },
      data: { consumed_at: new Date() },
    }),
    prisma.users.update({
      where: { id: row.user_id },
      data: { password_hash: hashPassword(password) },
    }),
  ])

  return toResponse(ok({ reset: true }, 'Password updated. You can now sign in.'))
}
