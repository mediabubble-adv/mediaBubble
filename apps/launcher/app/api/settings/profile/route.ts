// PATCH /api/settings/profile — update own name and avatar_url.

import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(255).optional(),
  avatar_url: z.string().url('Must be a valid URL').max(1024).nullable().optional(),
})

export async function PATCH(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = schema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { name, avatar_url } = parsed.data

  const updated = await prisma.users.update({
    where: { id: me.id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(avatar_url !== undefined ? { avatar_url } : {}),
      updated_at: new Date(),
    },
    select: { id: true, name: true, email: true, avatar_url: true, role: true, department_id: true },
  })

  return toResponse(ok(updated, 'Profile updated'))
}
