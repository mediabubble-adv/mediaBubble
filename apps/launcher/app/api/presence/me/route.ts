// GET /api/presence/me — current user's presence snapshot.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'
import { getUserPresence } from '@/lib/presence/online'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const presence = await getUserPresence(prisma, me.id)
  return toResponse(ok(presence, 'Presence retrieved'))
}
