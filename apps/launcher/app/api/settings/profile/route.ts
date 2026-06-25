// PATCH /api/settings/profile — update own name, avatar, bio, and social links.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'
import { profilePatchSchema, PROFILE_SELECT } from '@/lib/profile/schemas'

export const runtime = 'nodejs'

export async function PATCH(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = profilePatchSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { name, avatar_url, bio, linkedin_url, instagram_url, behance_url, website_url } =
    parsed.data

  const updated = await prisma.users.update({
    where: { id: me.id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(avatar_url !== undefined ? { avatar_url } : {}),
      ...(bio !== undefined ? { bio } : {}),
      ...(linkedin_url !== undefined ? { linkedin_url } : {}),
      ...(instagram_url !== undefined ? { instagram_url } : {}),
      ...(behance_url !== undefined ? { behance_url } : {}),
      ...(website_url !== undefined ? { website_url } : {}),
      updated_at: new Date(),
    },
    select: PROFILE_SELECT,
  })

  return toResponse(ok(updated, 'Profile updated'))
}
