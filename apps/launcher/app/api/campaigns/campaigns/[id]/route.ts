// GET /api/campaigns/campaigns/:id — fetch one campaign.
// PUT /api/campaigns/campaigns/:id — update a campaign (Manager+).
// DELETE /api/campaigns/campaigns/:id — soft-delete a campaign (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { parseDateOnly } from '@/lib/campaigns/api'
import { campaignInclude, serializeCampaign } from '@/lib/campaigns/campaigns'
import { updateCampaignSchema } from '@/lib/campaigns/schemas'
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
  const row = await prisma.campaigns.findFirst({
    where: { id, deleted_at: null },
    include: campaignInclude,
  })
  if (!row) return toResponse(fail('not_found', 'Campaign not found', 404))

  return toResponse(ok(serializeCampaign(row), 'Campaign retrieved'))
}

export async function PUT(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.campaigns.findFirst({ where: { id, deleted_at: null } })
  if (!existing) return toResponse(fail('not_found', 'Campaign not found', 404))

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateCampaignSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.campaigns.update({
    where: { id },
    data: {
      ...(parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
      ...(parsed.data.brief !== undefined ? { brief: parsed.data.brief } : {}),
      ...(parsed.data.market !== undefined ? { market: parsed.data.market } : {}),
      ...(parsed.data.channels !== undefined ? { channels: parsed.data.channels } : {}),
      ...(parsed.data.budget !== undefined ? { budget: parsed.data.budget } : {}),
      ...(parsed.data.currency !== undefined ? { currency: parsed.data.currency } : {}),
      ...(parsed.data.start_date !== undefined
        ? { start_date: parseDateOnly(parsed.data.start_date) }
        : {}),
      ...(parsed.data.end_date !== undefined ? { end_date: parseDateOnly(parsed.data.end_date) } : {}),
      ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
      ...(parsed.data.proposal_id !== undefined ? { proposal_id: parsed.data.proposal_id } : {}),
    },
    include: campaignInclude,
  })

  return toResponse(ok(serializeCampaign(row), 'Campaign updated'))
}

export async function DELETE(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.campaigns.findFirst({ where: { id, deleted_at: null } })
  if (!existing) return toResponse(fail('not_found', 'Campaign not found', 404))

  await prisma.campaigns.update({
    where: { id },
    data: { deleted_at: new Date(), status: 'Archived' },
  })

  return toResponse(ok({ id }, 'Campaign archived'))
}
