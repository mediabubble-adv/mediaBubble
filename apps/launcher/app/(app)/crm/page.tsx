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

  const [
    clientRows,
    invoiceRows,
    quotationRows,
    activeClients,
    mrrAgg,
    outstandingAgg,
    overdueCount,
    pipelineAgg,
  ] = await Promise.all([
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
    // Summary metrics — aggregated across all rows, not just the 200 displayed.
    prisma.clients.count({ where: { deleted_at: null, status: 'active' } }),
    prisma.clients.aggregate({
      _sum: { monthly_budget: true },
      where: { deleted_at: null, status: 'active' },
    }),
    prisma.invoices.aggregate({
      _sum: { total: true },
      where: { deleted_at: null, status: { in: ['Sent', 'Overdue'] } },
    }),
    prisma.invoices.count({ where: { deleted_at: null, status: 'Overdue' } }),
    prisma.quotations.aggregate({
      _sum: { total: true },
      where: { status: { in: ['Sent', 'Approved'] } },
    }),
  ])

  const metrics = {
    activeClients,
    mrr: Number(mrrAgg._sum.monthly_budget ?? 0),
    outstanding: Number(outstandingAgg._sum.total ?? 0),
    overdueCount,
    pipeline: Number(pipelineAgg._sum.total ?? 0),
  }

  return (
    <CrmDashboard
      initialClients={clientRows.map(serializeClient)}
      initialInvoices={invoiceRows.map(serializeInvoice)}
      initialQuotations={quotationRows.map(serializeQuotation)}
      metrics={metrics}
      canManage={canManage}
    />
  )
}
