// PUT /api/comms/messages/:id — edit own message.
// DELETE /api/comms/messages/:id — soft-delete message (author or Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canAccessChannel } from '@/lib/comms/access'
import { messageInclude, serializeMessage } from '@/lib/comms/messages'
import {
  broadcastMessageDeleted,
  broadcastMessageUpdated,
} from '@/lib/comms/realtime/broadcast'
import { updateMessageSchema } from '@/lib/comms/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

async function loadMessage(id: string) {
  return prisma.messages.findFirst({
    where: { id, deleted_at: null },
    include: { channels: true, ...messageInclude },
  })
}

export async function PUT(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const existing = await loadMessage(id)
  if (!existing || !canAccessChannel(existing.channels, me.id, me.role)) {
    return toResponse(fail('not_found', 'Message not found', 404))
  }
  if (existing.user_id !== me.id) {
    return toResponse(fail('forbidden', 'Only the author can edit this message', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateMessageSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.messages.update({
    where: { id },
    data: { content: parsed.data.content, edited_at: new Date() },
    include: messageInclude,
  })

  const message = serializeMessage(row)
  broadcastMessageUpdated(message)

  return toResponse(ok(message, 'Message updated'))
}

export async function DELETE(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const existing = await loadMessage(id)
  if (!existing || !canAccessChannel(existing.channels, me.id, me.role)) {
    return toResponse(fail('not_found', 'Message not found', 404))
  }
  if (existing.user_id !== me.id && !hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required to delete others\' messages', 403))
  }

  await prisma.messages.update({
    where: { id },
    data: { deleted_at: new Date() },
  })

  broadcastMessageDeleted(existing.channel_id, id)

  return toResponse(ok({ id }, 'Message deleted'))
}
