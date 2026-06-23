// PATCH /api/settings/team/[id] — change a member's role and/or status.
// Manager+ only. Role/status changes are RBAC-gated so Managers cannot touch
// Admins or mint new Admins, and nobody can lock themselves out.

import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast, isAdmin, ROLES } from '@/lib/auth/rbac'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const MEMBER_STATUSES = ['active', 'inactive'] as const

const schema = z
  .object({
    role: z.enum(ROLES).optional(),
    status: z.enum(MEMBER_STATUSES).optional(),
  })
  .refine((v) => v.role !== undefined || v.status !== undefined, {
    message: 'Provide a role or status to update',
  })

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await params
  if (id === me.id) {
    return toResponse(fail('forbidden', 'You cannot change your own role or status', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))
  const { role, status } = parsed.data

  const target = await prisma.users.findFirst({
    where: { id, deleted_at: null },
    select: { id: true, role: true },
  })
  if (!target) return toResponse(fail('not_found', 'Team member not found', 404))

  // Only Admins may modify an Admin, assign the Admin role, or demote an Admin.
  const touchesAdmin = isAdmin(target.role as (typeof ROLES)[number]) || role === 'Admin'
  if (touchesAdmin && !isAdmin(me.role)) {
    return toResponse(fail('forbidden', 'Only an Admin can manage Admin accounts', 403))
  }

  const updated = await prisma.users.update({
    where: { id },
    data: {
      ...(role !== undefined ? { role } : {}),
      ...(status !== undefined ? { status } : {}),
      updated_at: new Date(),
    },
    select: { id: true, name: true, email: true, avatar_url: true, role: true, status: true },
  })

  return toResponse(ok(updated, 'Team member updated'))
}
