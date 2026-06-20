// GET /api/automation/workflows — list workflows visible to the user.
// POST /api/automation/workflows — create a workflow (Contributor+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { workflowListWhere } from '@/lib/automation/access'
import { serializeWorkflow, workflowToJson } from '@/lib/automation/workflows'
import { createWorkflowSchema, listWorkflowsQuerySchema } from '@/lib/automation/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listWorkflowsQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { q, enabled } = parsed.data
  const rows = await prisma.workflows.findMany({
    where: {
      AND: [
        workflowListWhere(me.id, me.role),
        ...(enabled === 'true' ? [{ enabled: true }] : []),
        ...(enabled === 'false' ? [{ enabled: false }] : []),
        ...(q
          ? [
              {
                OR: [
                  { name: { contains: q, mode: 'insensitive' as const } },
                  { description: { contains: q, mode: 'insensitive' as const } },
                ],
              },
            ]
          : []),
      ],
    },
    orderBy: { updated_at: 'desc' },
    take: 200,
  })

  return toResponse(ok(rows.map(serializeWorkflow), 'Workflows retrieved'))
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createWorkflowSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const json = workflowToJson(parsed.data.trigger, parsed.data.steps)
  const row = await prisma.workflows.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      trigger: json.trigger,
      steps: json.steps,
      enabled: parsed.data.enabled ?? true,
      created_by: me.id,
    },
  })

  return toResponse(ok(serializeWorkflow(row), 'Workflow created', 201))
}
