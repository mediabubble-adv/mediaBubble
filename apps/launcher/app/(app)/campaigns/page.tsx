import type { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from '@/lib/auth/server-session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { serializeClient } from '@/lib/crm/clients'
import { campaignInclude, serializeCampaign } from '@/lib/campaigns/campaigns'
import { proposalInclude, serializeProposal } from '@/lib/campaigns/proposals'
import { CampaignsDashboard } from './campaigns-dashboard'

export const metadata: Metadata = { title: 'Campaign & Proposal' }
export const dynamic = 'force-dynamic'

export default async function CampaignsPage() {
  const session = await getServerSession()
  const canManage = session ? hasAtLeast(session.role, 'Manager') : false

  const [clientRows, proposalRows, campaignRows] = await Promise.all([
    prisma.clients.findMany({
      where: { deleted_at: null },
      orderBy: { name: 'asc' },
    }),
    prisma.proposals.findMany({
      where: { status: { not: 'Archived' } },
      include: proposalInclude,
      orderBy: { updated_at: 'desc' },
      take: 200,
    }),
    prisma.campaigns.findMany({
      where: { deleted_at: null },
      include: campaignInclude,
      orderBy: { updated_at: 'desc' },
      take: 200,
    }),
  ])

  return (
    <CampaignsDashboard
      initialProposals={proposalRows.map(serializeProposal)}
      initialCampaigns={campaignRows.map(serializeCampaign)}
      clients={clientRows.map(serializeClient)}
      canManage={canManage}
    />
  )
}
