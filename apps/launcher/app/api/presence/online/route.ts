// GET /api/presence/online — teammates active within the online window.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { prisma } from '@/lib/db/prisma'
import { listOnlineUsers } from '@/lib/presence/online'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const excludeSelf = new URL(req.url).searchParams.get('include_self') !== '1'
  const users = await listOnlineUsers(prisma, {
    excludeUserId: excludeSelf ? me.id : undefined,
  })

  return toResponse(ok(users, 'Online users retrieved'))
}
