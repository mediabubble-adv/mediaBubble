// GET /api/opus/campaigns/[id]/performance — campaign performance review data.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCampaignPerformance } from '@/lib/opus/metrics/campaign-performance'
import { requireOpusAccess, isErrorResponse } from '@/lib/opus/api/rbac'

export const runtime = 'nodejs'

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
): Promise<Response> {
  const me = requireOpusAccess(req)
  if (isErrorResponse(me)) return me
  const { id } = await ctx.params
  const performance = await getCampaignPerformance(id)
  if (!performance) return toResponse(fail('not_found', 'Campaign not found', 404))
  return toResponse(ok(performance, 'Campaign performance retrieved'))
}
