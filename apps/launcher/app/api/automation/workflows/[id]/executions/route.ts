// GET /api/automation/workflows/:id/executions — list execution history for a workflow.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canReadWorkflow } from '@/lib/automation/access'
import { serializeExecution } from '@/lib/automation/workflows'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const workflow = await prisma.workflows.findUnique({ where: { id } })
  if (!workflow || !canReadWorkflow(workflow, me.id, me.role)) {
    return toResponse(fail('not_found', 'Workflow not found', 404))
  }

  const limit = Math.min(Number(new URL(req.url).searchParams.get('limit') ?? '50'), 100)

  const rows = await prisma.workflow_executions.findMany({
    where: { workflow_id: id },
    orderBy: { created_at: 'desc' },
    take: Number.isFinite(limit) && limit > 0 ? limit : 50,
  })

  return toResponse(ok(rows.map(serializeExecution), 'Executions retrieved'))
}
