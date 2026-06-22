// GET /api/opus/usage — current period usage snapshot.

import { ok } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getUsageSnapshot } from '@/lib/opus/billing/metering'
import { requireOpusAccess, isErrorResponse } from '@/lib/opus/api/rbac'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = requireOpusAccess(req)
  if (isErrorResponse(me)) return me
  const snapshot = await getUsageSnapshot('professional')
  return toResponse(ok(snapshot, 'Usage snapshot retrieved'))
}
