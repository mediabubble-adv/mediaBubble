// POST /api/presence/heartbeat — refresh user presence last_seen.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'
import { upsertPresence } from '@/lib/presence/online'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  await upsertPresence(prisma, me.id)

  return toResponse(ok({ ok: true }, 'Presence updated'))
}
