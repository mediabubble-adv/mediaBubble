// GET /api/comms/channels — list channels visible to the user.
// POST /api/comms/channels — create a channel (Contributor+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { channelListWhere, uniqueMemberIds } from '@/lib/comms/access'
import { serializeChannel } from '@/lib/comms/channels'
import { broadcastChannelCreated } from '@/lib/comms/realtime/broadcast'
import { createChannelSchema, listChannelsQuerySchema } from '@/lib/comms/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listChannelsQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const visibility = channelListWhere(me.id, me.role)
  const rows = await prisma.channels.findMany({
    where: {
      AND: [
        visibility,
        ...(parsed.data.q
          ? [
              {
                OR: [
                  { name: { contains: parsed.data.q, mode: 'insensitive' as const } },
                  { description: { contains: parsed.data.q, mode: 'insensitive' as const } },
                ],
              },
            ]
          : []),
      ],
    },
    include: {
      _count: { select: { messages: { where: { deleted_at: null } } } },
    },
    orderBy: { created_at: 'asc' },
    take: 200,
  })

  return toResponse(
    ok(
      rows.map((row) => serializeChannel(row, row._count.messages)),
      'Channels retrieved',
    ),
  )
}

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
  const parsed = createChannelSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const type = parsed.data.type ?? 'Public'
  if (type === 'Private' && !hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required for private channels', 403))
  }

  const row = await prisma.channels.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      type,
      created_by: me.id,
      members: uniqueMemberIds(me.id, parsed.data.member_ids),
    },
  })

  const channel = serializeChannel(row, 0)
  broadcastChannelCreated(channel)

  return toResponse(ok(channel, 'Channel created', 201))
}
