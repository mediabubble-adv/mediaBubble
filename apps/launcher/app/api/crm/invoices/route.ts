// GET /api/crm/invoices — list invoices.
// POST /api/crm/invoices — create an invoice (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import {
  assertActiveClient,
  buildInvoiceItemRows,
  computeInvoiceTotals,
  nextDocumentNumber,
} from '@/lib/crm/billing-api'
import { invoiceInclude, serializeInvoice } from '@/lib/crm/invoices'
import { createInvoiceSchema, listInvoicesQuerySchema } from '@/lib/crm/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listInvoicesQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { client_id, status } = parsed.data
  const rows = await prisma.invoices.findMany({
    where: {
      deleted_at: null,
      ...(client_id ? { client_id } : {}),
      ...(status ? { status } : {}),
    },
    include: invoiceInclude,
    orderBy: { created_at: 'desc' },
    take: 200,
  })

  return toResponse(ok(rows.map(serializeInvoice), 'Invoices retrieved'))
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
  const parsed = createInvoiceSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const clientOk = await assertActiveClient(parsed.data.client_id)
  if (!clientOk) return toResponse(fail('not_found', 'Client not found', 404))

  const totals = computeInvoiceTotals(
    parsed.data.items,
    parsed.data.discount_percentage ?? 0,
    parsed.data.vat_percentage ?? 14,
  )

  const row = await prisma.invoices.create({
    data: {
      invoice_number: await nextDocumentNumber('INV'),
      client_id: parsed.data.client_id,
      status: parsed.data.status ?? 'Draft',
      currency: parsed.data.currency ?? 'EGP',
      subtotal: totals.subtotal,
      discount_percentage: parsed.data.discount_percentage ?? 0,
      discount_amount: totals.discount_amount,
      vat_percentage: parsed.data.vat_percentage ?? 14,
      vat_amount: totals.vat_amount,
      total: totals.total,
      due_date: new Date(`${parsed.data.due_date}T00:00:00.000Z`),
      created_by: me.id,
      invoice_items: {
        create: buildInvoiceItemRows(parsed.data.items),
      },
    },
    include: invoiceInclude,
  })

  return toResponse(ok(serializeInvoice(row), 'Invoice created', 201))
}
