// GET /api/automation/catalog — list available triggers and actions.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { ACTION_CATALOG, TRIGGER_CATALOG } from '@/lib/automation/catalog'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  return toResponse(
    ok(
      {
        triggers: TRIGGER_CATALOG,
        actions: ACTION_CATALOG,
      },
      'Automation catalog retrieved',
    ),
  )
}
