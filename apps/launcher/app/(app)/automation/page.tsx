import type { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from '@/lib/auth/server-session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { workflowListWhere } from '@/lib/automation/access'
import { serializeTemplate, serializeWorkflow } from '@/lib/automation/workflows'
import { AutomationDashboard } from './automation-dashboard'

export const metadata: Metadata = { title: 'Workflow Automation' }
export const dynamic = 'force-dynamic'

export default async function AutomationPage() {
  const session = await getServerSession()
  if (!session || !hasAtLeast(session.role, 'Contributor')) {
    return null
  }

  const [workflows, templates] = await Promise.all([
    prisma.workflows.findMany({
      where: workflowListWhere(session.id, session.role),
      orderBy: { updated_at: 'desc' },
      take: 200,
    }),
    prisma.workflow_templates.findMany({
      orderBy: { usage_count: 'desc' },
      take: 50,
    }),
  ])

  return (
    <AutomationDashboard
      initialWorkflows={workflows.map(serializeWorkflow)}
      initialTemplates={templates.map(serializeTemplate)}
    />
  )
}
