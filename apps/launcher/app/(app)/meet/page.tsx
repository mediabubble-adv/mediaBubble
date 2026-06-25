import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/server-session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { MeetPanel } from '@/components/meet/meet-provider'
import { Users } from 'lucide-react'

export const metadata: Metadata = { title: 'Meeting Room' }
export const dynamic = 'force-dynamic'

export default async function MeetPage() {
  const session = await getServerSession()
  if (!session || !hasAtLeast(session.role, 'Contributor')) {
    redirect('/login')
  }

  return (
    <PageFrame>
      <PageHeader
        icon={Users}
        title="Meeting Room"
        description="Channels, DMs & live studio updates"
      />
      <MeetPanel variant="page" />
    </PageFrame>
  )
}
