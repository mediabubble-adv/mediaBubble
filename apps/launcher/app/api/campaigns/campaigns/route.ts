// GET /api/campaigns/campaigns — list client campaigns.
// POST /api/campaigns/campaigns — create a campaign (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { assertActiveClient, parseDateOnly } from '@/lib/campaigns/api'
import { campaignInclude, serializeCampaign } from '@/lib/campaigns/campaigns'
import { createCampaignSchema, listCampaignsQuerySchema } from '@/lib/campaigns/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listCampaignsQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { client_id, status, q } = parsed.data
  const rows = await prisma.campaigns.findMany({
    where: {
      deleted_at: null,
      AND: [
        ...(client_id ? [{ client_id }] : []),
        ...(status ? [{ status }] : []),
        ...(q
          ? [
              {
                OR: [
                  { name: { contains: q, mode: 'insensitive' as const } },
                  { brief: { contains: q, mode: 'insensitive' as const } },
                ],
              },
            ]
          : []),
      ],
    },
    include: campaignInclude,
    orderBy: { updated_at: 'desc' },
    take: 200,
  })

  return toResponse(ok(rows.map(serializeCampaign), 'Campaigns retrieved'))
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createCampaignSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  if (!(await assertActiveClient(parsed.data.client_id))) {
    return toResponse(fail('not_found', 'Client not found', 404))
  }

  if (parsed.data.proposal_id) {
    const linked = await prisma.campaigns.findFirst({
      where: { proposal_id: parsed.data.proposal_id, deleted_at: null },
    })
    if (linked) return toResponse(fail('conflict', 'Proposal already linked to a campaign', 409))
  }

  const row = await prisma.campaigns.create({
    data: {
      client_id: parsed.data.client_id,
      name: parsed.data.name,
      brief: parsed.data.brief ?? null,
      market: parsed.data.market ?? 'eg',
      channels: parsed.data.channels ?? [],
      budget: parsed.data.budget ?? null,
      currency: parsed.data.currency ?? 'EGP',
      start_date: parseDateOnly(parsed.data.start_date),
      end_date: parseDateOnly(parsed.data.end_date),
      status: parsed.data.status ?? 'Planning',
      proposal_id: parsed.data.proposal_id ?? null,
      created_by: me.id,
    },
    include: campaignInclude,
  })

  return toResponse(ok(serializeCampaign(row), 'Campaign created', 201))
}
