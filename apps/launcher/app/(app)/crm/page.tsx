import type { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from '@/lib/auth/server-session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { serializeClient } from '@/lib/crm/clients'
import { invoiceInclude, serializeInvoice } from '@/lib/crm/invoices'
import { quotationInclude, serializeQuotation } from '@/lib/crm/quotations'
import { CrmDashboard } from './crm-dashboard'

export const metadata: Metadata = { title: 'CRM' }
export const dynamic = 'force-dynamic'

export default async function CrmPage() {
  const session = await getServerSession()
  const canManage = session ? hasAtLeast(session.role, 'Manager') : false

  const [clientRows, invoiceRows, quotationRows] = await Promise.all([
    prisma.clients.findMany({
      where: { deleted_at: null },
      orderBy: { name: 'asc' },
    }),
    prisma.invoices.findMany({
      where: { deleted_at: null },
      include: invoiceInclude,
      orderBy: { created_at: 'desc' },
      take: 200,
    }),
    prisma.quotations.findMany({
      include: quotationInclude,
      orderBy: { created_at: 'desc' },
      take: 200,
    }),
  ])

  return (
    <CrmDashboard
      initialClients={clientRows.map(serializeClient)}
      initialInvoices={invoiceRows.map(serializeInvoice)}
      initialQuotations={quotationRows.map(serializeQuotation)}
      canManage={canManage}
    />
  )
}
