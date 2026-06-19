// POST /api/auth/verify-email — consume a one-time token and activate the user.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { verifyEmailSchema } from '@/lib/auth/schemas'
import { hashToken, isExpired } from '@/lib/auth/tokens'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }

  const parsed = verifyEmailSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.email_verification_tokens.findUnique({
    where: { token_hash: hashToken(parsed.data.token) },
  })
  if (!row || row.consumed_at || isExpired(row.expires_at)) {
    return toResponse(fail('invalid_token', 'This verification link is invalid or has expired', 400))
  }

  await prisma.$transaction([
    prisma.email_verification_tokens.update({
      where: { id: row.id },
      data: { consumed_at: new Date() },
    }),
    prisma.users.update({ where: { id: row.user_id }, data: { status: 'active' } }),
  ])

  return toResponse(ok({ verified: true }, 'Email verified. You can now sign in.'))
}
