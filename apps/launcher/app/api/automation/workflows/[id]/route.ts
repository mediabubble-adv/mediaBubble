// GET /api/automation/workflows/:id — fetch one workflow.
// PUT /api/automation/workflows/:id — update a workflow.
// DELETE /api/automation/workflows/:id — delete a workflow.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canManageWorkflow, canReadWorkflow } from '@/lib/automation/access'
import { serializeWorkflow, workflowToJson } from '@/lib/automation/workflows'
import { updateWorkflowSchema } from '@/lib/automation/schemas'
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
  const row = await prisma.workflows.findUnique({ where: { id } })
  if (!row || !canReadWorkflow(row, me.id, me.role)) {
    return toResponse(fail('not_found', 'Workflow not found', 404))
  }

  return toResponse(ok(serializeWorkflow(row), 'Workflow retrieved'))
}

export async function PUT(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.workflows.findUnique({ where: { id } })
  if (!existing || !canManageWorkflow(existing, me.id, me.role)) {
    return toResponse(fail('not_found', 'Workflow not found', 404))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateWorkflowSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const trigger = parsed.data.trigger ?? serializeWorkflow(existing).trigger
  const steps = parsed.data.steps ?? serializeWorkflow(existing).steps
  const json = workflowToJson(trigger, steps)

  const row = await prisma.workflows.update({
    where: { id },
    data: {
      ...(parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
      ...(parsed.data.description !== undefined ? { description: parsed.data.description } : {}),
      ...(parsed.data.trigger !== undefined || parsed.data.steps !== undefined
        ? { trigger: json.trigger, steps: json.steps }
        : {}),
      ...(parsed.data.enabled !== undefined ? { enabled: parsed.data.enabled } : {}),
    },
  })

  return toResponse(ok(serializeWorkflow(row), 'Workflow updated'))
}

export async function DELETE(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.workflows.findUnique({ where: { id } })
  if (!existing || !canManageWorkflow(existing, me.id, me.role)) {
    return toResponse(fail('not_found', 'Workflow not found', 404))
  }

  await prisma.workflow_executions.deleteMany({ where: { workflow_id: id } })
  await prisma.workflows.delete({ where: { id } })

  return toResponse(ok({ id }, 'Workflow deleted'))
}
