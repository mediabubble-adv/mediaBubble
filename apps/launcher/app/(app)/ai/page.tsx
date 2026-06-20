import type { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from '@/lib/auth/server-session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { promptListWhere } from '@/lib/ai/access'
import { serializePrompt } from '@/lib/ai/prompts'
import { AiDashboard } from './ai-dashboard'

export const metadata: Metadata = { title: 'AI Tools' }
export const dynamic = 'force-dynamic'

export default async function AiPage() {
  const session = await getServerSession()
  const canManage = session ? hasAtLeast(session.role, 'Manager') : false

  const rows = session
    ? await prisma.prompts.findMany({
        where: {
          AND: [promptListWhere(session.id, session.role), { status: { not: 'Archived' } }],
        },
        orderBy: { updated_at: 'desc' },
        take: 200,
      })
    : []

  return <AiDashboard initialPrompts={rows.map(serializePrompt)} canManage={canManage} />
}
