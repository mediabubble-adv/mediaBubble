// GET /api/comms/channels/:id/messages — list messages (newest first, paginated).
// POST /api/comms/channels/:id/messages — post a message.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canAccessChannel } from '@/lib/comms/access'
import { messageInclude, serializeMessage } from '@/lib/comms/messages'
import { broadcastMessageCreated } from '@/lib/comms/realtime/broadcast'
import { createMessageSchema, listMessagesQuerySchema } from '@/lib/comms/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

async function loadChannel(id: string) {
  return prisma.channels.findUnique({ where: { id } })
}

export async function GET(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const channel = await loadChannel(id)
  if (!channel || !canAccessChannel(channel, me.id, me.role)) {
    return toResponse(fail('not_found', 'Channel not found', 404))
  }

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listMessagesQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const limit = parsed.data.limit ?? 50
  const rows = await prisma.messages.findMany({
    where: {
      channel_id: id,
      deleted_at: null,
      thread_id: null,
      ...(parsed.data.before ? { created_at: { lt: new Date(parsed.data.before) } } : {}),
    },
    include: messageInclude,
    orderBy: { created_at: 'desc' },
    take: limit,
  })

  const chronological = rows.reverse().map(serializeMessage)
  return toResponse(ok(chronological, 'Messages retrieved'))
}

export async function POST(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const channel = await loadChannel(id)
  if (!channel || !canAccessChannel(channel, me.id, me.role)) {
    return toResponse(fail('not_found', 'Channel not found', 404))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createMessageSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  if (parsed.data.thread_id) {
    const parent = await prisma.messages.findFirst({
      where: { id: parsed.data.thread_id, channel_id: id, deleted_at: null },
    })
    if (!parent) return toResponse(fail('not_found', 'Thread parent not found', 404))
  }

  const row = await prisma.messages.create({
    data: {
      channel_id: id,
      user_id: me.id,
      content: parsed.data.content,
      thread_id: parsed.data.thread_id ?? null,
    },
    include: messageInclude,
  })

  const message = serializeMessage(row)
  broadcastMessageCreated(message)

  return toResponse(ok(message, 'Message posted', 201))
}
