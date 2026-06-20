// PATCH /api/time/leave-requests/:id — manager approve/reject a pending request.
// DELETE /api/time/leave-requests/:id — cancel an own pending request.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { reviewLeaveRequestSchema } from '@/lib/time/leave-schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

const leaveInclude = {
  users_leave_requests_user_idTousers: { select: { id: true, name: true, email: true } },
  users_leave_requests_approver_idTousers: { select: { id: true, name: true } },
} as const

export async function PATCH(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await params
  const existing = await prisma.leave_requests.findUnique({ where: { id } })
  if (!existing) return toResponse(fail('not_found', 'Leave request not found', 404))
  if (existing.status !== 'Pending') {
    return toResponse(fail('conflict', 'Only pending requests can be reviewed', 409))
  }
  if (existing.user_id === me.id) {
    return toResponse(fail('forbidden', 'You cannot review your own leave request', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = reviewLeaveRequestSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.leave_requests.update({
    where: { id },
    data: {
      status: parsed.data.status,
      approver_id: me.id,
      updated_at: new Date(),
    },
    include: leaveInclude,
  })
  return toResponse(ok(row, `Leave request ${parsed.data.status.toLowerCase()}`))
}

export async function DELETE(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const existing = await prisma.leave_requests.findFirst({
    where: { id, user_id: me.id },
  })
  if (!existing) return toResponse(fail('not_found', 'Leave request not found', 404))
  if (existing.status !== 'Pending') {
    return toResponse(fail('conflict', 'Only pending requests can be cancelled', 409))
  }

  await prisma.leave_requests.delete({ where: { id } })
  return toResponse(ok({ id }, 'Leave request cancelled'))
}
