import type { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { FinanceDashboard } from './finance-dashboard'
import type { FinanceTxn } from '@/lib/finance/kpis'

export const metadata: Metadata = { title: 'Finance' }
export const dynamic = 'force-dynamic'

export default async function FinancePage() {
  const rows = await prisma.transactions.findMany({
    orderBy: { date: 'desc' },
  })

  // Format Prisma Decimal & Date columns to cross the RSC boundary
  const txns: (FinanceTxn & {
    id: string
    description: string | null
    payment_method: string | null
    recurring: boolean
  })[] = rows.map((r) => ({
    id: r.id,
    date: r.date.toISOString().slice(0, 10),
    category: r.category,
    type: r.type as 'inflow' | 'outflow',
    amount: Number(r.amount),
    currency: r.currency as any,
    description: r.description,
    payment_method: r.payment_method,
    recurring: r.recurring,
  }))

  return <FinanceDashboard initialTxns={txns} />
}
