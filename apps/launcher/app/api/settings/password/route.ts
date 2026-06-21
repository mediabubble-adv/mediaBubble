// POST /api/settings/password — change own password.

import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hashPassword, verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const schema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z.string().min(8, 'New password must be at least 8 characters'),
  confirm_password: z.string().min(1, 'Please confirm your new password'),
}).refine((d) => d.new_password === d.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = schema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { current_password, new_password } = parsed.data

  const user = await prisma.users.findUnique({
    where: { id: me.id },
    select: { password_hash: true },
  })

  if (!user?.password_hash || !verifyPassword(current_password, user.password_hash)) {
    return toResponse(fail('invalid_credentials', 'Current password is incorrect', 400))
  }

  await prisma.users.update({
    where: { id: me.id },
    data: { password_hash: hashPassword(new_password), updated_at: new Date() },
  })

  return toResponse(ok(null, 'Password changed successfully'))
}
