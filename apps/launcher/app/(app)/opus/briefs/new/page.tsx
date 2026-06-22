import type { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { serializeClient } from '@/lib/crm/clients'
import { OpusBriefBuilder } from './brief-builder'

export const metadata: Metadata = { title: 'OPUS — New Brief' }
export const dynamic = 'force-dynamic'

export default async function OpusBriefNewPage() {
  const clients = await prisma.clients.findMany({
    where: { deleted_at: null, status: 'active' },
    orderBy: { name: 'asc' },
  })
  return (
    <div className="px-6 py-8 lg:px-10">
      <OpusBriefBuilder clients={clients.map(serializeClient)} />
    </div>
  )
}
