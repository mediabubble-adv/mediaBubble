// GET /api/campaigns/proposals — list pitch proposals.
// POST /api/campaigns/proposals — create a proposal (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { assertActiveClient, nextProposalNumber } from '@/lib/campaigns/api'
import {
  deliverablesToJson,
  objectivesToJson,
  proposalInclude,
  serializeProposal,
} from '@/lib/campaigns/proposals'
import { createProposalSchema, listProposalsQuerySchema } from '@/lib/campaigns/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listProposalsQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { client_id, status, q } = parsed.data
  const rows = await prisma.proposals.findMany({
    where: {
      AND: [
        ...(client_id ? [{ client_id }] : []),
        ...(status ? [{ status }] : []),
        ...(q
          ? [
              {
                OR: [
                  { title: { contains: q, mode: 'insensitive' as const } },
                  { proposal_number: { contains: q, mode: 'insensitive' as const } },
                ],
              },
            ]
          : []),
      ],
    },
    include: proposalInclude,
    orderBy: { updated_at: 'desc' },
    take: 200,
  })

  return toResponse(ok(rows.map(serializeProposal), 'Proposals retrieved'))
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
  const parsed = createProposalSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  if (!(await assertActiveClient(parsed.data.client_id))) {
    return toResponse(fail('not_found', 'Client not found', 404))
  }

  const row = await prisma.proposals.create({
    data: {
      proposal_number: await nextProposalNumber(),
      client_id: parsed.data.client_id,
      title: parsed.data.title,
      summary: parsed.data.summary ?? null,
      objectives: objectivesToJson(parsed.data.objectives),
      deliverables: deliverablesToJson(parsed.data.deliverables),
      timeline_weeks: parsed.data.timeline_weeks ?? null,
      budget_estimate: parsed.data.budget_estimate ?? null,
      currency: parsed.data.currency ?? 'EGP',
      status: parsed.data.status ?? 'Draft',
      created_by: me.id,
    },
    include: proposalInclude,
  })

  return toResponse(ok(serializeProposal(row), 'Proposal created', 201))
}
