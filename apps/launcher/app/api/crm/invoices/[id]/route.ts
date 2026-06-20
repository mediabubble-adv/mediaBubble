// GET /api/crm/invoices/:id — fetch one invoice.
// PUT /api/crm/invoices/:id — update status, due date, or line items (Manager+).
// DELETE /api/crm/invoices/:id — soft-delete (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import {
  buildInvoiceItemRows,
  computeInvoiceTotals,
} from '@/lib/crm/billing-api'
import { invoiceInclude, serializeInvoice } from '@/lib/crm/invoices'
import { updateInvoiceSchema } from '@/lib/crm/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

async function loadInvoice(id: string) {
  return prisma.invoices.findFirst({
    where: { id, deleted_at: null },
    include: invoiceInclude,
  })
}

export async function GET(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const row = await loadInvoice(id)
  if (!row) return toResponse(fail('not_found', 'Invoice not found', 404))

  return toResponse(ok(serializeInvoice(row), 'Invoice retrieved'))
}

export async function PUT(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await loadInvoice(id)
  if (!existing) return toResponse(fail('not_found', 'Invoice not found', 404))

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateInvoiceSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const discountPct = parsed.data.discount_percentage ?? Number(existing.discount_percentage ?? 0)
  const vatPct = parsed.data.vat_percentage ?? Number(existing.vat_percentage ?? 14)
  const items = parsed.data.items ?? existing.invoice_items.map((item) => ({
    description: item.description,
    quantity: Number(item.quantity),
    unit_price: Number(item.unit_price),
  }))
  const totals = computeInvoiceTotals(items, discountPct, vatPct)

  const sent_at =
    parsed.data.status === 'Sent' && !existing.sent_at ? new Date() : existing.sent_at
  const paid_at =
    parsed.data.status === 'Paid' && !existing.paid_at ? new Date() : existing.paid_at

  const row = await prisma.$transaction(async (tx) => {
    if (parsed.data.items) {
      await tx.invoice_items.deleteMany({ where: { invoice_id: id } })
    }
    return tx.invoices.update({
      where: { id },
      data: {
        ...(parsed.data.status ? { status: parsed.data.status } : {}),
        ...(parsed.data.due_date
          ? { due_date: new Date(`${parsed.data.due_date}T00:00:00.000Z`) }
          : {}),
        subtotal: totals.subtotal,
        discount_percentage: discountPct,
        discount_amount: totals.discount_amount,
        vat_percentage: vatPct,
        vat_amount: totals.vat_amount,
        total: totals.total,
        sent_at,
        paid_at,
        ...(parsed.data.items
          ? {
              invoice_items: {
                create: buildInvoiceItemRows(parsed.data.items),
              },
            }
          : {}),
      },
      include: invoiceInclude,
    })
  })

  return toResponse(ok(serializeInvoice(row), 'Invoice updated'))
}

export async function DELETE(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await loadInvoice(id)
  if (!existing) return toResponse(fail('not_found', 'Invoice not found', 404))

  await prisma.invoices.update({
    where: { id },
    data: { deleted_at: new Date(), status: 'Cancelled' },
  })

  return toResponse(ok({ id }, 'Invoice archived'))
}
