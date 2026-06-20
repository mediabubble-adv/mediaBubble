import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerPortalSession } from '@/lib/portal/session'
import { invoiceInclude, serializeInvoice } from '@/lib/crm/invoices'
import { prisma } from '@/lib/db/prisma'
import { PortalDashboard } from './portal-dashboard'

export const metadata: Metadata = { title: 'Client portal' }
export const dynamic = 'force-dynamic'

const VISIBLE_STATUSES = ['Sent', 'Paid', 'Overdue'] as const

export default async function PortalPage() {
  const session = await getServerPortalSession()
  if (!session) redirect('/portal/verify')

  const client = await prisma.clients.findFirst({
    where: { id: session.clientId, deleted_at: null },
  })
  if (!client) redirect('/portal/verify')

  const invoices =
    client.invoice_view_enabled === false
      ? []
      : (
          await prisma.invoices.findMany({
            where: {
              client_id: session.clientId,
              deleted_at: null,
              status: { in: [...VISIBLE_STATUSES] },
            },
            include: invoiceInclude,
            orderBy: { created_at: 'desc' },
            take: 100,
          })
        ).map(serializeInvoice)

  return (
    <PortalDashboard
      clientName={client.name}
      email={session.email}
      invoices={invoices}
      invoiceViewEnabled={client.invoice_view_enabled !== false}
    />
  )
}
