// PATCH /api/presence/status — set Away / Busy / Available (Online).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'
import { getUserPresence, setUserPresence } from '@/lib/presence/online'
import { presencePatchSchema } from '@/lib/presence/schemas'

export const runtime = 'nodejs'

export async function PATCH(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = presencePatchSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { status, status_message } = parsed.data
  await setUserPresence(prisma, me.id, status, status_message)

  const presence = await getUserPresence(prisma, me.id)
  return toResponse(ok(presence, 'Presence updated'))
}
