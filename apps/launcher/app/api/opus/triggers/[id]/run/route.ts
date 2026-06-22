// POST /api/opus/triggers/[id]/run — execute trigger now (Manager+).

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { executeTrigger } from '@/lib/opus/triggers/engine'
import { requireOpusManager, isErrorResponse } from '@/lib/opus/api/rbac'
import { initOpusWorkflows } from '@/lib/opus/workflow-engine'

export const runtime = 'nodejs'

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
): Promise<Response> {
  const me = requireOpusManager(req)
  if (isErrorResponse(me)) return me
  initOpusWorkflows()

  const { id } = await ctx.params
  try {
    const result = await executeTrigger(id, me.id)
    return toResponse(ok(result, 'Trigger executed'))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Trigger execution failed'
    return toResponse(fail('trigger_error', message, 400))
  }
}
