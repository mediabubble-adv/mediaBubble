// GET /api/opus/triggers/[id]/runs — execution history.

import { ok } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { listTriggerRuns } from '@/lib/opus/triggers/engine'
import { requireOpusAccess, isErrorResponse } from '@/lib/opus/api/rbac'

export const runtime = 'nodejs'

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
): Promise<Response> {
  const me = requireOpusAccess(req)
  if (isErrorResponse(me)) return me
  const { id } = await ctx.params
  const runs = await listTriggerRuns(id)
  return toResponse(ok(runs, 'Trigger runs retrieved'))
}
