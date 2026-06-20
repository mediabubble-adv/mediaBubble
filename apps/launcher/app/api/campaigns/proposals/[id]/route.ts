// GET /api/campaigns/proposals/:id — fetch one proposal.
// PUT /api/campaigns/proposals/:id — update a proposal (Manager+).
// DELETE /api/campaigns/proposals/:id — archive a proposal (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import {
  deliverablesToJson,
  objectivesToJson,
  proposalInclude,
  serializeProposal,
} from '@/lib/campaigns/proposals'
import { updateProposalSchema } from '@/lib/campaigns/schemas'
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
  const row = await prisma.proposals.findUnique({ where: { id }, include: proposalInclude })
  if (!row) return toResponse(fail('not_found', 'Proposal not found', 404))

  return toResponse(ok(serializeProposal(row), 'Proposal retrieved'))
}

export async function PUT(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.proposals.findUnique({ where: { id } })
  if (!existing) return toResponse(fail('not_found', 'Proposal not found', 404))

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateProposalSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.proposals.update({
    where: { id },
    data: {
      ...(parsed.data.title !== undefined ? { title: parsed.data.title } : {}),
      ...(parsed.data.summary !== undefined ? { summary: parsed.data.summary } : {}),
      ...(parsed.data.objectives !== undefined
        ? { objectives: objectivesToJson(parsed.data.objectives) }
        : {}),
      ...(parsed.data.deliverables !== undefined
        ? { deliverables: deliverablesToJson(parsed.data.deliverables) }
        : {}),
      ...(parsed.data.timeline_weeks !== undefined
        ? { timeline_weeks: parsed.data.timeline_weeks }
        : {}),
      ...(parsed.data.budget_estimate !== undefined
        ? { budget_estimate: parsed.data.budget_estimate }
        : {}),
      ...(parsed.data.currency !== undefined ? { currency: parsed.data.currency } : {}),
      ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
    },
    include: proposalInclude,
  })

  return toResponse(ok(serializeProposal(row), 'Proposal updated'))
}

export async function DELETE(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.proposals.findUnique({ where: { id } })
  if (!existing) return toResponse(fail('not_found', 'Proposal not found', 404))

  await prisma.proposals.update({
    where: { id },
    data: { status: 'Archived' },
  })

  return toResponse(ok({ id }, 'Proposal archived'))
}
