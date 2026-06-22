import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/server-session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { OpusTriggersDashboard } from './triggers-dashboard'

export const metadata: Metadata = { title: 'OPUS — Triggers' }
export const dynamic = 'force-dynamic'

export default async function OpusTriggersPage() {
  const session = await getServerSession()
  const canManage = session ? hasAtLeast(session.role, 'Manager') : false
  return <OpusTriggersDashboard canManage={canManage} />
}
