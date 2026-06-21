'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { Clock, Plus, Trash2, Briefcase, CalendarOff, CalendarDays, BarChart3, Users, Send } from 'lucide-react'
import {
  summarize,
  entriesInRange,
  formatDuration,
  weekStart,
  weekEnd,
  type TimeEntryRow,
} from '@/lib/time/kpis'
import { LeavePanel, type LeaveRequestRow } from './leave-panel'
import { SchedulePanel, type AvailabilityRow, type HolidayRow } from './schedule-panel'
import { CapacityPanel } from './capacity-panel'
import { CalendarPanel } from './calendar-panel'
import { TeamPanel, type TeamTimeEntry } from './team-panel'
import type { CapacitySnapshot } from '@/lib/time/capacity'

export interface DashboardTimeEntry extends TimeEntryRow {
  id: string
  start_time: string
  end_time: string
  description: string | null
  status: string | null
  task: { id: string; title: string } | null
}

function toLocalTimeInput(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function combineDateTime(date: string, time: string): string {
  return new Date(`${date}T${time}:00`).toISOString()
}

type Tab = 'timesheet' | 'leave' | 'schedule' | 'capacity' | 'calendar' | 'team'

const ENTRY_STATUS_STYLES: Record<string, string> = {
  Draft: 'bg-muted-foreground/15 text-muted-foreground',
  Submitted: 'bg-[#CA8A04]/15 text-[#CA8A04]',
  Approved: 'bg-[#16A34A]/15 text-[#16A34A]',
  Rejected: 'bg-destructive/15 text-destructive',
}

export function TimeDashboard({
  initialEntries,
  initialLeaveMine,
  initialLeavePending,
  canReviewLeave,
  initialAvailability,
  initialHolidaysEgypt,
  initialHolidaysUae,
  selfCapacity,
  teamCapacity,
  canManageTeam,
  initialPendingTime,
  googleConfigured,
}: {
  initialEntries: DashboardTimeEntry[]
  initialLeaveMine: LeaveRequestRow[]
  initialLeavePending: LeaveRequestRow[]
  canReviewLeave: boolean
  initialAvailability: AvailabilityRow[]
  initialHolidaysEgypt: HolidayRow[]
  initialHolidaysUae: HolidayRow[]
  selfCapacity: CapacitySnapshot
  teamCapacity: CapacitySnapshot[]
  canManageTeam: boolean
  initialPendingTime: TeamTimeEntry[]
  googleConfigured: boolean
}) {
  const [tab, setTab] = useState<Tab>('timesheet')
  const [entries, setEntries] = useState(initialEntries)
  const [searchQuery, setSearchQuery] = useState('')
  const [billableFilter, setBillableFilter] = useState<'all' | 'billable' | 'non-billable'>('all')
  const [logging, setLogging] = useState(false)

  const today = new Date().toISOString().slice(0, 10)
  const weekFrom = weekStart(new Date())
  const weekTo = weekEnd(new Date())

  const weekSummary = useMemo(
    () => summarize(entriesInRange(entries, weekFrom, weekTo)),
    [entries, weekFrom, weekTo],
  )
  const todaySummary = useMemo(
    () => summarize(entriesInRange(entries, today, today)),
    [entries, today],
  )

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        e.description?.toLowerCase().includes(q) ||
        e.task?.title.toLowerCase().includes(q) ||
        e.date.includes(q)
      const matchesBillable =
        billableFilter === 'all' ||
        (billableFilter === 'billable' ? e.billable : !e.billable)
      return matchesSearch && matchesBillable
    })
  }, [entries, searchQuery, billableFilter])

  async function logTime(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (logging) return
    const form = e.currentTarget
    const data = new FormData(form)
    const date = String(data.get('date') ?? '')
    const start = String(data.get('start') ?? '')
    const end = String(data.get('end') ?? '')
    const description = String(data.get('description') ?? '').trim()
    const billable = data.get('billable') === 'on'

    if (!date || !start || !end) return
    setLogging(true)
    try {
      const res = await fetch('/api/time/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start_time: combineDateTime(date, start),
          end_time: combineDateTime(date, end),
          description: description || undefined,
          billable,
        }),
      })
      const json = await res.json()
      if (!res.ok) return
      const row = json.data
      setEntries((prev) => [
        {
          id: row.id,
          date: row.date.slice(0, 10),
          start_time: row.start_time,
          end_time: row.end_time,
          duration_minutes: row.duration_minutes,
          description: row.description,
          billable: row.billable,
          status: row.status,
          task: null,
        },
        ...prev,
      ])
      form.reset()
      const dateInput = form.elements.namedItem('date') as HTMLInputElement | null
      if (dateInput) dateInput.value = today
    } finally {
      setLogging(false)
    }
  }

  async function submitEntry(id: string) {
    const prev = entries
    setEntries((cur) => cur.map((e) => (e.id === id ? { ...e, status: 'Submitted' } : e)))
    try {
      const res = await fetch(`/api/time/entries/${id}/submit`, { method: 'PATCH' })
      if (!res.ok) setEntries(prev)
    } catch {
      setEntries(prev)
    }
  }

  async function removeEntry(id: string) {
    const prev = entries
    setEntries((cur) => cur.filter((e) => e.id !== id))
    try {
      const res = await fetch(`/api/time/entries/${id}`, { method: 'DELETE' })
      if (!res.ok) setEntries(prev)
    } catch {
      setEntries(prev)
    }
  }

  return (
    <div className="px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Clock size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Time</h1>
            <p className="text-[13px] text-muted-foreground">
              Log hours, request leave, and track billable work — task timers sync here automatically.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-border">
          {(
            [
              { id: 'timesheet' as const, label: 'Timesheet', icon: Clock },
              { id: 'leave' as const, label: 'Leave', icon: CalendarOff },
              { id: 'schedule' as const, label: 'Schedule', icon: CalendarDays },
              { id: 'capacity' as const, label: 'Capacity', icon: BarChart3 },
              { id: 'calendar' as const, label: 'Calendar', icon: CalendarDays },
              ...(canManageTeam
                ? [{ id: 'team' as const, label: 'Team', icon: Users }]
                : []),
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-[13px] font-bold transition-colors ${
                tab === id
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {tab === 'leave' ? (
          <div className="mt-6">
            <LeavePanel
              initialMine={initialLeaveMine}
              initialPending={initialLeavePending}
              canReview={canReviewLeave}
            />
          </div>
        ) : tab === 'schedule' ? (
          <div className="mt-6">
            <SchedulePanel
              initialAvailability={initialAvailability}
              initialHolidaysEgypt={initialHolidaysEgypt}
              initialHolidaysUae={initialHolidaysUae}
            />
          </div>
        ) : tab === 'capacity' ? (
          <div className="mt-6">
            <CapacityPanel self={selfCapacity} team={teamCapacity} canViewTeam={canManageTeam} />
          </div>
        ) : tab === 'calendar' ? (
          <div className="mt-6">
            <CalendarPanel
              entries={entries}
              availability={initialAvailability}
              googleConfigured={googleConfigured}
            />
          </div>
        ) : tab === 'team' && canManageTeam ? (
          <div className="mt-6">
            <TeamPanel initialPending={initialPendingTime} teamCapacity={teamCapacity} />
          </div>
        ) : (
          <>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: 'This week',
              value: formatDuration(weekSummary.totalMinutes),
              hint: `${weekFrom} → ${weekTo}`,
            },
            {
              label: 'Billable',
              value: formatDuration(weekSummary.billableMinutes),
              hint: 'This week',
            },
            {
              label: 'Today',
              value: formatDuration(todaySummary.totalMinutes),
              hint: today,
            },
            {
              label: 'Entries',
              value: String(weekSummary.entryCount),
              hint: 'This week',
            },
          ].map(({ label, value, hint }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-card px-4 py-4"
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-foreground" dir="ltr">
                {value}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={logTime}
          className="mt-6 rounded-2xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-2">
            <Plus size={16} className="text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Log time manually</h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
              Date
              <input
                name="date"
                type="date"
                defaultValue={today}
                required
                className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
              Start
              <input
                name="start"
                type="time"
                required
                className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
                dir="ltr"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
              End
              <input
                name="end"
                type="time"
                required
                className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
                dir="ltr"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground sm:col-span-2">
              Description
              <input
                name="description"
                type="text"
                placeholder="What did you work on?"
                className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
              />
            </label>
            <div className="flex flex-col justify-end gap-3">
              <label className="flex items-center gap-2 text-[13px] text-foreground">
                <input name="billable" type="checkbox" className="rounded border-border" />
                Billable
              </label>
              <button
                type="submit"
                disabled={logging}
                className="rounded-lg bg-accent px-4 py-2 text-[13px] font-bold text-accent-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              >
                {logging ? 'Saving…' : 'Add entry'}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries…"
            className="min-w-[200px] flex-1 rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
          />
          <select
            value={billableFilter}
            onChange={(e) => setBillableFilter(e.target.value as typeof billableFilter)}
            className="rounded-lg border border-border bg-input px-3 py-2 text-[13px] text-foreground"
          >
            <option value="all">All entries</option>
            <option value="billable">Billable only</option>
            <option value="non-billable">Non-billable</option>
          </select>
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="min-w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-bold">Date</th>
                <th className="px-4 py-3 font-bold">Time</th>
                <th className="px-4 py-3 font-bold">Duration</th>
                <th className="px-4 py-3 font-bold">Task</th>
                <th className="px-4 py-3 font-bold">Description</th>
                <th className="px-4 py-3 font-bold">Billable</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                    No time entries yet — log manually or start a timer on the task board.
                  </td>
                </tr>
              ) : (
                filtered.map((entry) => (
                  <tr key={entry.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-foreground" dir="ltr">
                      {entry.date}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground" dir="ltr">
                      {toLocalTimeInput(entry.start_time)} – {toLocalTimeInput(entry.end_time)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground" dir="ltr">
                      {formatDuration(entry.duration_minutes ?? 0)}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {entry.task ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase size={12} className="text-primary" />
                          {entry.task.title}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                      {entry.description ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      {entry.billable ? (
                        <span className="rounded-md bg-[#16A34A]/15 px-2 py-0.5 text-[11px] font-bold text-[#16A34A]">
                          Yes
                        </span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                          ENTRY_STATUS_STYLES[entry.status ?? 'Draft'] ??
                          'bg-muted-foreground/15 text-muted-foreground'
                        }`}
                      >
                        {entry.status ?? 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {(entry.status === 'Draft' || entry.status === 'Rejected') && (
                          <button
                            type="button"
                            onClick={() => submitEntry(entry.id)}
                            aria-label="Submit entry"
                            className="rounded-lg p-1.5 text-primary transition-colors hover:bg-primary/10 active:scale-[0.98]"
                          >
                            <Send size={14} />
                          </button>
                        )}
                        {entry.status === 'Draft' && (
                          <button
                            type="button"
                            onClick={() => removeEntry(entry.id)}
                            aria-label="Delete entry"
                            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive active:scale-[0.98]"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
          </>
        )}
      </div>
    </div>
  )
}
