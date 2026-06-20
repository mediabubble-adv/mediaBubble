// GET /api/time/availability — list the current user's availability slots.
// POST /api/time/availability — add a slot for the current user.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { parseTimeValue } from '@/lib/time/availability'
import {
  createAvailabilitySchema,
  listAvailabilityQuerySchema,
} from '@/lib/time/availability-schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listAvailabilityQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { from, to } = parsed.data
  const rows = await prisma.availability.findMany({
    where: {
      user_id: me.id,
      ...(from || to
        ? {
            date: {
              ...(from ? { gte: from } : {}),
              ...(to ? { lte: to } : {}),
            },
          }
        : {}),
    },
    orderBy: [{ date: 'asc' }, { start_time: 'asc' }],
    take: 200,
  })
  return toResponse(ok(rows, 'Availability retrieved'))
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
  const parsed = createAvailabilitySchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.availability.create({
    data: {
      user_id: me.id,
      date: parsed.data.date,
      start_time: parseTimeValue(parsed.data.start_time),
      end_time: parseTimeValue(parsed.data.end_time),
      status: parsed.data.status ?? 'Available',
    },
  })
  return toResponse(ok(row, 'Availability slot created', 201))
}
