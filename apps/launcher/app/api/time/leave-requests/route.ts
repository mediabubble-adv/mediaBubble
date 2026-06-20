// GET /api/time/leave-requests — list leave requests (own or pending queue).
// POST /api/time/leave-requests — submit a new leave request.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import {
  createLeaveRequestSchema,
  listLeaveRequestsQuerySchema,
} from '@/lib/time/leave-schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const leaveInclude = {
  users_leave_requests_user_idTousers: { select: { id: true, name: true, email: true } },
  users_leave_requests_approver_idTousers: { select: { id: true, name: true } },
} as const

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listLeaveRequestsQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { status, scope } = parsed.data

  if (scope === 'pending') {
    if (!hasAtLeast(me.role, 'Manager')) {
      return toResponse(fail('forbidden', 'Manager access required', 403))
    }
    const rows = await prisma.leave_requests.findMany({
      where: {
        status: status ?? 'Pending',
        user_id: { not: me.id },
      },
      include: leaveInclude,
      orderBy: { created_at: 'desc' },
      take: 100,
    })
    return toResponse(ok(rows, 'Pending leave requests retrieved'))
  }

  const rows = await prisma.leave_requests.findMany({
    where: {
      user_id: me.id,
      ...(status ? { status } : {}),
    },
    include: leaveInclude,
    orderBy: { start_date: 'desc' },
    take: 100,
  })
  return toResponse(ok(rows, 'Leave requests retrieved'))
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
  const parsed = createLeaveRequestSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.leave_requests.create({
    data: {
      user_id: me.id,
      type: parsed.data.type,
      start_date: parsed.data.start_date,
      end_date: parsed.data.end_date,
      reason: parsed.data.reason,
      status: 'Pending',
    },
    include: leaveInclude,
  })
  return toResponse(ok(row, 'Leave request submitted', 201))
}
