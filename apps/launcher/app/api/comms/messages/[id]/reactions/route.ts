// PATCH /api/comms/messages/:id/reactions — toggle emoji reaction on a message.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canAccessChannel } from '@/lib/comms/access'
import { messageInclude, parseReactions, serializeMessage } from '@/lib/comms/messages'
import { broadcastMessageUpdated } from '@/lib/comms/realtime/broadcast'
import { messageReactionSchema } from '@/lib/comms/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await params
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = messageReactionSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const existing = await prisma.messages.findFirst({
    where: { id, deleted_at: null },
    include: { channels: true },
  })
  if (!existing || !canAccessChannel(existing.channels, me.id, me.role)) {
    return toResponse(fail('not_found', 'Message not found', 404))
  }

  const reactions = { ...(parseReactions(existing.reactions) ?? {}) }
  const emoji = parsed.data.emoji
  const users = new Set(reactions[emoji] ?? [])
  if (users.has(me.id)) {
    users.delete(me.id)
  } else {
    users.add(me.id)
  }
  if (users.size === 0) {
    delete reactions[emoji]
  } else {
    reactions[emoji] = [...users]
  }

  const row = await prisma.messages.update({
    where: { id },
    data: { reactions },
    include: messageInclude,
  })

  const message = serializeMessage(row)
  broadcastMessageUpdated(message)

  return toResponse(ok(message, 'Reaction updated'))
}
