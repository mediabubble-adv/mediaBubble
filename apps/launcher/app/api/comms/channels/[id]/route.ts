// GET /api/comms/channels/:id — fetch one channel.
// PUT /api/comms/channels/:id — update channel metadata/members (Manager+ or creator).
// DELETE /api/comms/channels/:id — archive channel.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canAccessChannel, canManageChannel, uniqueMemberIds } from '@/lib/comms/access'
import { serializeChannel } from '@/lib/comms/channels'
import { updateChannelSchema } from '@/lib/comms/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const row = await prisma.channels.findUnique({
    where: { id },
    include: { _count: { select: { messages: { where: { deleted_at: null } } } } },
  })
  if (!row || !canAccessChannel(row, me.id, me.role)) {
    return toResponse(fail('not_found', 'Channel not found', 404))
  }

  return toResponse(ok(serializeChannel(row, row._count.messages), 'Channel retrieved'))
}

export async function PUT(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.channels.findUnique({ where: { id } })
  if (!existing || !canManageChannel(existing, me.id, me.role)) {
    return toResponse(fail('not_found', 'Channel not found', 404))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateChannelSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.channels.update({
    where: { id },
    data: {
      ...(parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
      ...(parsed.data.description !== undefined ? { description: parsed.data.description } : {}),
      ...(parsed.data.member_ids !== undefined
        ? { members: uniqueMemberIds(existing.created_by, parsed.data.member_ids) }
        : {}),
    },
  })

  return toResponse(ok(serializeChannel(row), 'Channel updated'))
}

export async function DELETE(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.channels.findUnique({ where: { id } })
  if (!existing || !canManageChannel(existing, me.id, me.role)) {
    return toResponse(fail('not_found', 'Channel not found', 404))
  }

  await prisma.channels.update({
    where: { id },
    data: { archived_at: new Date() },
  })

  return toResponse(ok({ id }, 'Channel archived'))
}
