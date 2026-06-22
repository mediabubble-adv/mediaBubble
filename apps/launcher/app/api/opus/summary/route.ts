// GET /api/opus/summary — OPUS command center aggregates.

import { ok } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getRecentEvents } from '@/lib/opus/event-bus'
import { getUsageSnapshot } from '@/lib/opus/billing/metering'
import { listActiveCampaignSummaries } from '@/lib/opus/metrics/campaign-performance'
import { listTriggers } from '@/lib/opus/triggers/engine'
import { requireOpusAccess, isErrorResponse } from '@/lib/opus/api/rbac'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = requireOpusAccess(req)
  if (isErrorResponse(me)) return me

  const [usage, campaigns, triggers] = await Promise.all([
    getUsageSnapshot('professional'),
    listActiveCampaignSummaries(),
    listTriggers(),
  ])

  return toResponse(
    ok(
      {
        usage,
        campaigns,
        triggers: triggers.filter((t) => t.enabled),
        recent_events: getRecentEvents(10),
      },
      'OPUS summary retrieved',
    ),
  )
}
