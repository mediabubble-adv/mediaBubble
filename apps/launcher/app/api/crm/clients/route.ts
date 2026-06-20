// GET /api/crm/clients — list clients (soft-deleted excluded).
// POST /api/crm/clients — create a client (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { serializeClient } from '@/lib/crm/clients'
import { createClientSchema, listClientsQuerySchema } from '@/lib/crm/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listClientsQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { status, q } = parsed.data
  const rows = await prisma.clients.findMany({
    where: {
      deleted_at: null,
      ...(status ? { status } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { primary_contact_name: { contains: q, mode: 'insensitive' } },
              { primary_contact_email: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { name: 'asc' },
    take: 200,
  })

  return toResponse(ok(rows.map(serializeClient), 'Clients retrieved'))
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createClientSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.clients.create({
    data: {
      name: parsed.data.name,
      primary_contact_name: parsed.data.primary_contact_name ?? null,
      primary_contact_email: parsed.data.primary_contact_email ?? null,
      primary_contact_phone: parsed.data.primary_contact_phone ?? null,
      contract_type: parsed.data.contract_type ?? 'retainer',
      monthly_budget: parsed.data.monthly_budget ?? null,
      vat_number: parsed.data.vat_number ?? null,
      status: parsed.data.status ?? 'active',
      brand_assets_url: parsed.data.brand_assets_url ?? null,
    },
  })

  return toResponse(ok(serializeClient(row), 'Client created', 201))
}
