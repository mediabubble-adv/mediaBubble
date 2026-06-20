// GET /api/crm/quotations — list quotations.
// POST /api/crm/quotations — create a quotation (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import {
  assertActiveClient,
  buildQuotationItemRows,
  nextDocumentNumber,
  sumLineItems,
} from '@/lib/crm/billing-api'
import { quotationInclude, serializeQuotation } from '@/lib/crm/quotations'
import { createQuotationSchema, listQuotationsQuerySchema } from '@/lib/crm/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listQuotationsQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { client_id, status } = parsed.data
  const rows = await prisma.quotations.findMany({
    where: {
      ...(client_id ? { client_id } : {}),
      ...(status ? { status } : {}),
    },
    include: quotationInclude,
    orderBy: { created_at: 'desc' },
    take: 200,
  })

  return toResponse(ok(rows.map(serializeQuotation), 'Quotations retrieved'))
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
  const parsed = createQuotationSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const clientOk = await assertActiveClient(parsed.data.client_id)
  if (!clientOk) return toResponse(fail('not_found', 'Client not found', 404))

  const subtotal = sumLineItems(parsed.data.items)

  const row = await prisma.quotations.create({
    data: {
      quotation_number: await nextDocumentNumber('QUO'),
      client_id: parsed.data.client_id,
      status: parsed.data.status ?? 'Draft',
      currency: parsed.data.currency ?? 'EGP',
      subtotal,
      total: subtotal,
      valid_until: parsed.data.valid_until
        ? new Date(`${parsed.data.valid_until}T00:00:00.000Z`)
        : null,
      created_by: me.id,
      quotation_items: {
        create: buildQuotationItemRows(parsed.data.items),
      },
    },
    include: quotationInclude,
  })

  return toResponse(ok(serializeQuotation(row), 'Quotation created', 201))
}
