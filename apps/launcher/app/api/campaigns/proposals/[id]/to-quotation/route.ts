// POST /api/campaigns/proposals/:id/to-quotation — create CRM quotation from proposal scope (Manager+).

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import {
  buildQuotationItemRows,
  nextDocumentNumber,
  sumLineItems,
} from '@/lib/crm/billing-api'
import { proposalInclude, serializeProposal } from '@/lib/campaigns/proposals'
import { quotationInclude, serializeQuotation } from '@/lib/crm/quotations'
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
    include: proposalInclude,
  })
  if (!proposal) return toResponse(fail('not_found', 'Proposal not found', 404))
  if (proposal.quotation_id) {
    return toResponse(fail('conflict', 'Proposal already linked to a quotation', 409))
  }

  const serialized = serializeProposal(proposal)
  const items =
    serialized.deliverables.length > 0
      ? serialized.deliverables.map((d) => {
          const share =
            serialized.budget_estimate && serialized.deliverables.length > 0
              ? serialized.budget_estimate / serialized.deliverables.length
              : 0
          return {
            description: d.description ? `${d.title} — ${d.description}` : d.title,
            quantity: 1,
            unit_price: share,
          }
        })
      : [
          {
            description: `${serialized.title} (${serialized.proposal_number})`,
            quantity: 1,
            unit_price: serialized.budget_estimate ?? 0,
          },
        ]

  if (sumLineItems(items) <= 0) {
    return toResponse(fail('validation_error', 'Proposal needs deliverables or a budget estimate', 422))
  }

  const subtotal = sumLineItems(items)
  const validUntil = new Date()
  validUntil.setUTCDate(validUntil.getUTCDate() + 30)

  const quotation = await prisma.$transaction(async (tx) => {
    const created = await tx.quotations.create({
      data: {
        quotation_number: await nextDocumentNumber('QUO'),
        client_id: proposal.client_id,
        status: 'Draft',
        currency: proposal.currency ?? 'EGP',
        subtotal,
        total: subtotal,
        valid_until: validUntil,
        created_by: me.id,
        quotation_items: {
          create: buildQuotationItemRows(items),
        },
      },
      include: quotationInclude,
    })

    await tx.proposals.update({
      where: { id },
      data: { quotation_id: created.id, status: proposal.status === 'Draft' ? 'Sent' : proposal.status },
    })

    return created
  })

  const updatedProposal = await prisma.proposals.findUniqueOrThrow({
    where: { id },
    include: proposalInclude,
  })

  return toResponse(
    ok(
      {
        quotation: serializeQuotation(quotation),
        proposal: serializeProposal(updatedProposal),
      },
      'Quotation created from proposal',
      201,
    ),
  )
}
