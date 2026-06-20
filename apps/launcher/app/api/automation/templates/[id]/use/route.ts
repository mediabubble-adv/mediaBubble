// POST /api/automation/templates/:id/use — instantiate a workflow from a template.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { serializeTemplate, serializeWorkflow, workflowToJson } from '@/lib/automation/workflows'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const template = await prisma.workflow_templates.findUnique({ where: { id } })
  if (!template) return toResponse(fail('not_found', 'Template not found', 404))

  const config = serializeTemplate(template).workflow_config
  if (!config) return toResponse(fail('invalid_template', 'Template has no workflow_config', 422))

  const json = workflowToJson(config.trigger, config.steps)
  const row = await prisma.$transaction(async (tx) => {
    const created = await tx.workflows.create({
      data: {
        name: template.name,
        description: template.description,
        trigger: json.trigger,
        steps: json.steps,
        enabled: false,
        created_by: me.id,
      },
    })
    await tx.workflow_templates.update({
      where: { id },
      data: { usage_count: { increment: 1 } },
    })
    return created
  })

  return toResponse(ok(serializeWorkflow(row), 'Workflow created from template', 201))
}
