// GET /api/crm/quotations/:id — fetch one quotation.
// PUT /api/crm/quotations/:id — update status, validity, or line items (Manager+).
// DELETE /api/crm/quotations/:id — remove draft quotation (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { buildQuotationItemRows, sumLineItems } from '@/lib/crm/billing-api'
import { quotationInclude, serializeQuotation } from '@/lib/crm/quotations'
import { updateQuotationSchema } from '@/lib/crm/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

async function loadQuotation(id: string) {
  return prisma.quotations.findUnique({
    where: { id },
    include: quotationInclude,
  })
}

export async function GET(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const row = await loadQuotation(id)
  if (!row) return toResponse(fail('not_found', 'Quotation not found', 404))

  return toResponse(ok(serializeQuotation(row), 'Quotation retrieved'))
}

export async function PUT(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await loadQuotation(id)
  if (!existing) return toResponse(fail('not_found', 'Quotation not found', 404))
  if (existing.converted_to_invoice_id) {
    return toResponse(fail('conflict', 'Converted quotations cannot be edited', 409))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateQuotationSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const items = parsed.data.items ?? existing.quotation_items.map((item) => ({
    description: item.description,
    quantity: Number(item.quantity),
    unit_price: Number(item.unit_price),
  }))
  const subtotal = sumLineItems(items)

  const row = await prisma.$transaction(async (tx) => {
    if (parsed.data.items) {
      await tx.quotation_items.deleteMany({ where: { quotation_id: id } })
    }
    return tx.quotations.update({
      where: { id },
      data: {
        ...(parsed.data.status ? { status: parsed.data.status } : {}),
        ...(parsed.data.valid_until !== undefined
          ? {
              valid_until: parsed.data.valid_until
                ? new Date(`${parsed.data.valid_until}T00:00:00.000Z`)
                : null,
            }
          : {}),
        subtotal,
        total: subtotal,
        ...(parsed.data.items
          ? {
              quotation_items: {
                create: buildQuotationItemRows(parsed.data.items),
              },
            }
          : {}),
      },
      include: quotationInclude,
    })
  })

  return toResponse(ok(serializeQuotation(row), 'Quotation updated'))
}

export async function DELETE(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await loadQuotation(id)
  if (!existing) return toResponse(fail('not_found', 'Quotation not found', 404))
  if (existing.converted_to_invoice_id) {
    return toResponse(fail('conflict', 'Converted quotations cannot be deleted', 409))
  }
  if (existing.status !== 'Draft') {
    return toResponse(fail('conflict', 'Only draft quotations can be deleted', 409))
  }

  await prisma.quotations.delete({ where: { id } })

  return toResponse(ok({ id }, 'Quotation deleted'))
}
