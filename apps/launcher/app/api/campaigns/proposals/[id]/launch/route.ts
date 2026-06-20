// POST /api/campaigns/proposals/:id/launch — mark proposal Won and create linked campaign (Manager+).

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { campaignInclude, serializeCampaign } from '@/lib/campaigns/campaigns'
import { proposalInclude, serializeProposal } from '@/lib/campaigns/proposals'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const proposal = await prisma.proposals.findUnique({
    where: { id },
    include: { ...proposalInclude, campaigns: true },
  })
  if (!proposal) return toResponse(fail('not_found', 'Proposal not found', 404))
  if (proposal.campaigns) {
    return toResponse(fail('conflict', 'Proposal already launched as a campaign', 409))
  }

  const start = new Date()
  const end = new Date(start)
  if (proposal.timeline_weeks) {
    end.setUTCDate(end.getUTCDate() + proposal.timeline_weeks * 7)
  } else {
    end.setUTCMonth(end.getUTCMonth() + 3)
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.proposals.update({
      where: { id },
      data: { status: 'Won' },
    })

    const campaign = await tx.campaigns.create({
      data: {
        client_id: proposal.client_id,
        name: proposal.title,
        brief: proposal.summary,
        market: proposal.currency === 'AED' ? 'ae' : 'eg',
        channels: [],
        budget: proposal.budget_estimate,
        currency: proposal.currency ?? 'EGP',
        start_date: start,
        end_date: end,
        status: 'Planning',
        proposal_id: proposal.id,
        created_by: me.id,
      },
      include: campaignInclude,
    })

    const updatedProposal = await tx.proposals.findUniqueOrThrow({
      where: { id },
      include: proposalInclude,
    })

    return { campaign, proposal: updatedProposal }
  })

  return toResponse(
    ok(
      {
        campaign: serializeCampaign(result.campaign),
        proposal: serializeProposal(result.proposal),
      },
      'Campaign launched from proposal',
      201,
    ),
  )
}
