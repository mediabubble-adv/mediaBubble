// GET /api/time/holidays — list holidays for Egypt or UAE, optional date range.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { listHolidaysQuerySchema } from '@/lib/time/availability-schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listHolidaysQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { country, from, to } = parsed.data
  const rows = await prisma.holidays.findMany({
    where: {
      country,
      ...(from || to
        ? {
            date: {
              ...(from ? { gte: from } : {}),
              ...(to ? { lte: to } : {}),
            },
          }
        : {}),
    },
    orderBy: { date: 'asc' },
    take: 100,
  })
  return toResponse(ok(rows, 'Holidays retrieved'))
}
