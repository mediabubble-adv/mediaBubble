// GET /api/automation/templates — list workflow templates.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { serializeTemplate } from '@/lib/automation/workflows'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(_req: Request): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const rows = await prisma.workflow_templates.findMany({
    orderBy: { usage_count: 'desc' },
    take: 100,
  })

  return toResponse(ok(rows.map(serializeTemplate), 'Templates retrieved'))
}
