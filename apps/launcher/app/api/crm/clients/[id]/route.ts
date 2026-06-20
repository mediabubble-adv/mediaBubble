// PUT /api/crm/clients/:id — update a client (Manager+).
// DELETE /api/crm/clients/:id — soft-delete a client (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { serializeClient } from '@/lib/crm/clients'
import { updateClientSchema } from '@/lib/crm/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function PUT(req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.clients.findFirst({ where: { id, deleted_at: null } })
  if (!existing) return toResponse(fail('not_found', 'Client not found', 404))

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = updateClientSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.clients.update({
    where: { id },
    data: parsed.data,
  })

  return toResponse(ok(serializeClient(row), 'Client updated'))
}

export async function DELETE(_req: Request, ctx: RouteContext): Promise<Response> {
  const me = getCurrentUser(_req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const { id } = await ctx.params
  const existing = await prisma.clients.findFirst({ where: { id, deleted_at: null } })
  if (!existing) return toResponse(fail('not_found', 'Client not found', 404))

  await prisma.clients.update({
    where: { id },
    data: { deleted_at: new Date(), status: 'inactive' },
  })

  return toResponse(ok({ id }, 'Client archived'))
}
