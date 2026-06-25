// GET /api/profile/[userId]/card — lightweight teammate card for Meet hover previews.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { prisma } from '@/lib/db/prisma'
import { resolvePresenceStatus } from '@/lib/presence/online'
import { PROFILE_CARD_SELECT, bioPreview, type ProfileCardData } from '@/lib/profile/card'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ userId: string }> }

export async function GET(req: Request, context: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { userId } = await context.params
  const row = await prisma.users.findFirst({
    where: { id: userId, status: 'active', deleted_at: null },
    select: PROFILE_CARD_SELECT,
  })
  if (!row) return toResponse(fail('not_found', 'User not found', 404))

  const card: ProfileCardData = {
    id: row.id,
    name: row.name,
    avatar_url: row.avatar_url,
    role: row.role,
    department: row.departments_users_department_idTodepartments?.name ?? null,
    bio: bioPreview(row.bio),
    linkedin_url: row.linkedin_url,
    instagram_url: row.instagram_url,
    behance_url: row.behance_url,
    website_url: row.website_url,
    presence_status: resolvePresenceStatus(
      row.user_presence?.status,
      row.user_presence?.last_seen,
    ),
    status_message: row.user_presence?.status_message ?? null,
  }

  return toResponse(ok(card, 'Profile card retrieved'))
}
