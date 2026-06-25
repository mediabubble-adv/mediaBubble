// POST /api/meet/dm — find or create a 1:1 DM channel.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { serializeChannel } from '@/lib/comms/channels'
import { createDmSchema } from '@/lib/comms/schemas'
import { dmKeyForUsers } from '@/lib/meet/dm'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createDmSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const peerId = parsed.data.user_id
  if (peerId === me.id) {
    return toResponse(fail('invalid_peer', 'Cannot start a DM with yourself', 400))
  }

  const peer = await prisma.users.findFirst({
    where: { id: peerId, status: 'active', deleted_at: null },
    select: { id: true, name: true },
  })
  if (!peer) return toResponse(fail('not_found', 'User not found', 404))

  const dmKey = dmKeyForUsers(me.id, peerId)
  const existing = await prisma.channels.findFirst({
    where: { dm_key: dmKey, archived_at: null },
  })
  if (existing) {
    return toResponse(ok(serializeChannel(existing), 'DM channel retrieved'))
  }

  const channel = await prisma.channels.create({
    data: {
      name: peer.name,
      type: 'DM',
      dm_key: dmKey,
      created_by: me.id,
      members: [me.id, peerId],
    },
  })

  return toResponse(ok(serializeChannel(channel), 'DM channel created', 201))
}
