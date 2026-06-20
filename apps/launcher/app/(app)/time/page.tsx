import type { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from '@/lib/auth/server-session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { formatTimeValue } from '@/lib/time/availability'
import { buildCapacitySnapshot } from '@/lib/time/capacity'
import { weekEnd, weekStart } from '@/lib/time/kpis'
import { TimeDashboard } from './time-dashboard'
import type { LeaveRequestRow } from './leave-panel'
import type { AvailabilityRow, HolidayRow } from './schedule-panel'
import type { TeamTimeEntry } from './team-panel'
import type { CapacitySnapshot } from '@/lib/time/capacity'

export const metadata: Metadata = { title: 'Time' }
export const dynamic = 'force-dynamic'

const leaveInclude = {
  users_leave_requests_user_idTousers: { select: { id: true, name: true, email: true } },
  users_leave_requests_approver_idTousers: { select: { id: true, name: true } },
} as const

function mapLeave(row: {
  id: string
  type: string
  start_date: Date
  end_date: Date
  reason: string | null
  status: string | null
  created_at: Date
  users_leave_requests_user_idTousers: { id: string; name: string; email: string }
  users_leave_requests_approver_idTousers: { id: string; name: string } | null
}): LeaveRequestRow {
  return {
    id: row.id,
    type: row.type,
    start_date: row.start_date.toISOString().slice(0, 10),
    end_date: row.end_date.toISOString().slice(0, 10),
    reason: row.reason,
    status: row.status,
    created_at: row.created_at.toISOString(),
    employee: row.users_leave_requests_user_idTousers,
    approver: row.users_leave_requests_approver_idTousers,
  }
}

function mapHoliday(row: {
  id: string
  date: Date
  name: string
  country: string | null
  is_working_day: boolean | null
}): HolidayRow {
  return {
    id: row.id,
    date: row.date.toISOString().slice(0, 10),
    name: row.name,
    country: row.country ?? '',
    is_working_day: row.is_working_day,
  }
}

function mapTeamEntry(row: {
  id: string
  date: Date
  start_time: Date
  end_time: Date
  duration_minutes: number | null
  description: string | null
  billable: boolean | null
  status: string | null
  users: { id: string; name: string; email: string }
  tasks: { id: string; title: string } | null
}): TeamTimeEntry {
  return {
    id: row.id,
    date: row.date.toISOString().slice(0, 10),
    start_time: row.start_time.toISOString(),
    end_time: row.end_time.toISOString(),
    duration_minutes: row.duration_minutes,
    description: row.description,
    billable: row.billable,
    status: row.status,
    employee: row.users,
    task: row.tasks,
  }
}

export default async function TimePage() {
  const session = await getServerSession()
  if (!session) return null

  const canManage = hasAtLeast(session.role, 'Manager')
  const anchor = new Date()
  const weekFrom = new Date(`${weekStart(anchor)}T00:00:00.000Z`)
  const weekTo = new Date(`${weekEnd(anchor)}T00:00:00.000Z`)
  const year = anchor.getUTCFullYear()
  const yearStart = new Date(Date.UTC(year, 0, 1))
  const yearEnd = new Date(Date.UTC(year, 11, 31))

  const [
    rows,
    mineLeave,
    pendingLeave,
    availability,
    holidaysEgypt,
    holidaysUae,
    pendingTime,
    teamUsers,
    weekEntries,
  ] = await Promise.all([
    prisma.time_entries.findMany({
      where: { user_id: session.id },
      include: { tasks: { select: { id: true, title: true } } },
      orderBy: [{ date: 'desc' }, { start_time: 'desc' }],
      take: 200,
    }),
    prisma.leave_requests.findMany({
      where: { user_id: session.id },
      include: leaveInclude,
      orderBy: { start_date: 'desc' },
      take: 100,
    }),
    canManage
      ? prisma.leave_requests.findMany({
          where: { status: 'Pending', user_id: { not: session.id } },
          include: leaveInclude,
          orderBy: { created_at: 'desc' },
          take: 100,
        })
      : Promise.resolve([]),
    prisma.availability.findMany({
      where: { user_id: session.id },
      orderBy: [{ date: 'asc' }, { start_time: 'asc' }],
      take: 200,
    }),
    prisma.holidays.findMany({
      where: { country: 'Egypt', date: { gte: yearStart, lte: yearEnd } },
      orderBy: { date: 'asc' },
    }),
    prisma.holidays.findMany({
      where: { country: 'UAE', date: { gte: yearStart, lte: yearEnd } },
      orderBy: { date: 'asc' },
    }),
    canManage
      ? prisma.time_entries.findMany({
          where: { status: 'Submitted', user_id: { not: session.id } },
          include: {
            tasks: { select: { id: true, title: true } },
            users: { select: { id: true, name: true, email: true } },
          },
          orderBy: [{ date: 'desc' }, { start_time: 'desc' }],
          take: 100,
        })
      : Promise.resolve([]),
    canManage
      ? prisma.users.findMany({
          where: { deleted_at: null, status: 'active' },
          select: { id: true, name: true },
          orderBy: { name: 'asc' },
        })
      : Promise.resolve([]),
    canManage
      ? prisma.time_entries.findMany({
          where: { date: { gte: weekFrom, lte: weekTo } },
          select: { user_id: true, date: true, duration_minutes: true, billable: true },
        })
      : Promise.resolve([]),
  ])

  const meRow = await prisma.users.findUnique({ where: { id: session.id }, select: { name: true } })

  const entries = rows.map((r) => ({
    id: r.id,
    date: r.date.toISOString().slice(0, 10),
    start_time: r.start_time.toISOString(),
    end_time: r.end_time.toISOString(),
    duration_minutes: r.duration_minutes,
    description: r.description,
    billable: r.billable,
    status: r.status,
    task: r.tasks ? { id: r.tasks.id, title: r.tasks.title } : null,
  }))

  const availabilityRows: AvailabilityRow[] = availability.map((a) => ({
    id: a.id,
    date: a.date.toISOString().slice(0, 10),
    start_time: formatTimeValue(a.start_time),
    end_time: formatTimeValue(a.end_time),
    status: a.status,
  }))

  const selfCapacity = buildCapacitySnapshot(
    {
      user_id: session.id,
      user_name: meRow?.name ?? 'You',
      entries: entries.map((e) => ({
        date: e.date,
        duration_minutes: e.duration_minutes,
        billable: e.billable,
      })),
    },
    anchor,
  )

  const teamCapacity: CapacitySnapshot[] = canManage
    ? teamUsers.map((user) => {
        const mine = weekEntries
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
    : []

  const googleConfigured = Boolean(
    process.env['GOOGLE_CLIENT_ID']?.trim() && process.env['GOOGLE_CLIENT_SECRET']?.trim(),
  )

  return (
    <TimeDashboard
      initialEntries={entries}
      initialLeaveMine={mineLeave.map(mapLeave)}
      initialLeavePending={pendingLeave.map(mapLeave)}
      canReviewLeave={canManage}
      initialAvailability={availabilityRows}
      initialHolidaysEgypt={holidaysEgypt.map(mapHoliday)}
      initialHolidaysUae={holidaysUae.map(mapHoliday)}
      selfCapacity={selfCapacity}
      teamCapacity={teamCapacity}
      canManageTeam={canManage}
      initialPendingTime={pendingTime.map(mapTeamEntry)}
      googleConfigured={googleConfigured}
    />
  )
}
