// POST /api/crm/quotations/:id/convert — create a draft invoice from a quotation (Manager+).

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import {
  buildInvoiceItemRows,
  computeInvoiceTotals,
  nextDocumentNumber,
} from '@/lib/crm/billing-api'
import { invoiceInclude, serializeInvoice } from '@/lib/crm/invoices'
import { quotationInclude } from '@/lib/crm/quotations'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const quotation = await prisma.quotations.findUnique({
    where: { id },
    include: quotationInclude,
  })
  if (!quotation) return toResponse(fail('not_found', 'Quotation not found', 404))
  if (quotation.converted_to_invoice_id) {
    return toResponse(fail('conflict', 'Quotation already converted', 409))
  }

  const items = quotation.quotation_items.map((item) => ({
    description: item.description,
    quantity: Number(item.quantity),
    unit_price: Number(item.unit_price),
  }))
  const totals = computeInvoiceTotals(items, 0, 14)
  const due = new Date()
  due.setUTCDate(due.getUTCDate() + 14)

  const invoice = await prisma.$transaction(async (tx) => {
    const created = await tx.invoices.create({
      data: {
        invoice_number: await nextDocumentNumber('INV'),
        client_id: quotation.client_id,
        status: 'Draft',
        currency: quotation.currency ?? 'EGP',
        subtotal: totals.subtotal,
        discount_percentage: 0,
        discount_amount: 0,
        vat_percentage: 14,
        vat_amount: totals.vat_amount,
        total: totals.total,
        due_date: due,
        created_by: me.id,
        invoice_items: {
          create: buildInvoiceItemRows(items),
        },
      },
      include: invoiceInclude,
    })

    await tx.quotations.update({
      where: { id },
      data: {
        converted_to_invoice_id: created.id,
        status: 'Approved',
      },
    })

    return created
  })

  return toResponse(ok(serializeInvoice(invoice), 'Invoice created from quotation', 201))
}
