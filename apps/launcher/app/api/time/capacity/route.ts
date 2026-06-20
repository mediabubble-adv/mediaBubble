// GET /api/time/capacity — weekly utilization for self or team (managers).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { buildCapacitySnapshot } from '@/lib/time/capacity'
import { weekEnd, weekStart } from '@/lib/time/kpis'
import { capacityQuerySchema } from '@/lib/time/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = capacityQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const anchor = parsed.data.week ?? new Date()
  const from = new Date(`${weekStart(anchor)}T00:00:00.000Z`)
  const to = new Date(`${weekEnd(anchor)}T00:00:00.000Z`)
  const scope = parsed.data.scope ?? 'mine'

  if (scope === 'team') {
    if (!hasAtLeast(me.role, 'Manager')) {
      return toResponse(fail('forbidden', 'Manager access required', 403))
    }

    const users = await prisma.users.findMany({
      where: { deleted_at: null, status: 'active' },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    })

    const entries = await prisma.time_entries.findMany({
      where: { date: { gte: from, lte: to }, user_id: { in: users.map((u) => u.id) } },
      select: { user_id: true, date: true, duration_minutes: true, billable: true },
    })

    const snapshots = users.map((user) => {
      const mine = entries
        .filter((e) => e.user_id === user.id)
        .map((e) => ({
          date: e.date.toISOString().slice(0, 10),
          duration_minutes: e.duration_minutes,
          billable: e.billable,
        }))
      return buildCapacitySnapshot(
        { user_id: user.id, user_name: user.name, entries: mine },
        anchor,
      )
    })

    return toResponse(ok({ week_start: weekStart(anchor), week_end: weekEnd(anchor), snapshots }, 'Team capacity retrieved'))
  }

  const entries = await prisma.time_entries.findMany({
    where: { user_id: me.id, date: { gte: from, lte: to } },
    select: { date: true, duration_minutes: true, billable: true },
  })

  const meRow = await prisma.users.findUnique({ where: { id: me.id }, select: { name: true } })
  const snapshot = buildCapacitySnapshot(
    {
      user_id: me.id,
      user_name: meRow?.name ?? 'You',
      entries: entries.map((e) => ({
        date: e.date.toISOString().slice(0, 10),
        duration_minutes: e.duration_minutes,
        billable: e.billable,
      })),
    },
    anchor,
  )

  await prisma.capacity.findFirst({ where: { user_id: me.id, week_start: from } }).then(async (existing) => {
    if (existing) {
      await prisma.capacity.update({
        where: { id: existing.id },
        data: {
          scheduled_hours: snapshot.logged_hours,
          utilization_percent: snapshot.utilization_percent,
          calculated_at: new Date(),
        },
      })
    } else {
      await prisma.capacity.create({
        data: {
          user_id: me.id,
          week_start: from,
          allocated_hours: snapshot.allocated_hours,
          scheduled_hours: snapshot.logged_hours,
          utilization_percent: snapshot.utilization_percent,
        },
      })
    }
  })

  return toResponse(ok(snapshot, 'Capacity retrieved'))
}
