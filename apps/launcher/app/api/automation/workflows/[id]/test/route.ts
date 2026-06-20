// POST /api/automation/workflows/:id/test — run a workflow manually and log execution.

import type { Prisma } from '@prisma/client'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canReadWorkflow } from '@/lib/automation/access'
import { executeWorkflowSteps } from '@/lib/automation/executor'
import { testWorkflowSchema } from '@/lib/automation/schemas'
import { serializeExecution, serializeWorkflow } from '@/lib/automation/workflows'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(req: Request, ctx: RouteContext): Promise<Response> {
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

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = testWorkflowSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const config = serializeWorkflow(workflow)
  const triggerData = parsed.data.trigger_data ?? {}
  const started = Date.now()

  const outcome = await executeWorkflowSteps({
    steps: config.steps,
    triggerData,
    triggeredBy: me.id,
    role: me.role,
  })

  const executionTimeMs = Date.now() - started
  const status = outcome.error ? 'Failed' : 'Completed'
  const triggerPayload = {
    ...triggerData,
    step_results: outcome.results,
  } as unknown as Prisma.InputJsonValue

  const execution = await prisma.$transaction(async (tx) => {
    const row = await tx.workflow_executions.create({
      data: {
        workflow_id: workflow.id,
        triggered_by: me.id,
        trigger_data: triggerPayload,
        status,
        steps_executed: outcome.stepsExecuted,
        error_message: outcome.error ?? null,
        execution_time_ms: executionTimeMs,
      },
    })

    await tx.workflows.update({
      where: { id: workflow.id },
      data: {
        last_executed_at: new Date(),
        execution_count: { increment: 1 },
        ...(status === 'Completed' ? { success_count: { increment: 1 } } : {}),
      },
    })

    return row
  })

  return toResponse(
    ok(
      {
        execution: serializeExecution(execution),
        results: outcome.results,
      },
      status === 'Completed' ? 'Workflow executed' : 'Workflow failed',
      status === 'Completed' ? 200 : 422,
    ),
  )
}
