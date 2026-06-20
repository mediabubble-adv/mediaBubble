// GET /api/portal/invoices — read-only invoices for the signed-in client.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentPortalSession } from '@/lib/portal/session'
import { invoiceInclude, serializeInvoice } from '@/lib/crm/invoices'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const VISIBLE_STATUSES = ['Sent', 'Paid', 'Overdue'] as const

export async function GET(req: Request): Promise<Response> {
  const session = getCurrentPortalSession(req)
  if (!session) return toResponse(fail('unauthorized', 'Portal sign-in required', 401))

  const client = await prisma.clients.findFirst({
    where: { id: session.clientId, deleted_at: null },
    select: { invoice_view_enabled: true },
  })
  if (!client) return toResponse(fail('not_found', 'Client not found', 404))
  if (client.invoice_view_enabled === false) {
    return toResponse(fail('forbidden', 'Invoice viewing is disabled for this client', 403))
  }

  const rows = await prisma.invoices.findMany({
    where: {
      client_id: session.clientId,
      deleted_at: null,
      status: { in: [...VISIBLE_STATUSES] },
    },
    include: invoiceInclude,
    orderBy: { created_at: 'desc' },
    take: 100,
  })

  return toResponse(ok(rows.map(serializeInvoice), 'Invoices retrieved'))
}
