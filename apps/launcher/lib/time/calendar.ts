// Calendar week-view helpers.

import { weekDates, weekStart } from './kpis'

export interface CalendarBlock {
  id: string
  kind: 'entry' | 'availability'
  date: string
  start: string
  end: string
  label: string
  tone: 'entry' | 'available' | 'busy' | 'leave'
}

export interface DayColumn {
  date: string
  weekday: string
  blocks: CalendarBlock[]
}

const WEEKDAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function formatTime(isoOrTime: string): string {
  if (isoOrTime.includes('T')) {
    const d = new Date(isoOrTime)
    return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
  }
  return isoOrTime.slice(0, 5)
}

/** Build seven day columns for the week containing `anchor`. */
export function buildWeekColumns(
  anchor: Date,
  entries: {
    id: string
    date: string
    start_time: string
    end_time: string
    description: string | null
    taskTitle?: string | null
  }[],
  availability: {
    id: string
    date: string
    start_time: string
    end_time: string
    status: string | null
  }[],
): DayColumn[] {
  const dates = weekDates(anchor)
  return dates.map((date, i) => {
    const dayEntries = entries
      .filter((e) => e.date === date)
      .map(
        (e): CalendarBlock => ({
          id: e.id,
          kind: 'entry',
          date,
          start: formatTime(e.start_time),
          end: formatTime(e.end_time),
          label: e.taskTitle ?? e.description ?? 'Logged time',
          tone: 'entry',
        }),
      )

    const daySlots = availability
      .filter((a) => a.date === date)
      .map(
        (a): CalendarBlock => ({
          id: a.id,
          kind: 'availability',
          date,
          start: formatTime(a.start_time),
          end: formatTime(a.end_time),
          label: a.status ?? 'Available',
          tone:
            a.status === 'Busy' ? 'busy' : a.status === 'On Leave' ? 'leave' : 'available',
        }),
      )

    return {
      date,
      weekday: WEEKDAY[i] ?? '',
      blocks: [...daySlots, ...dayEntries].sort((a, b) => a.start.localeCompare(b.start)),
    }
  })
}

export function parseWeekParam(value: string | undefined): Date {
  if (!value) return new Date()
  const d = new Date(`${value}T00:00:00.000Z`)
  return Number.isNaN(d.getTime()) ? new Date() : d
}

export function shiftWeek(anchor: Date, delta: number): string {
  const d = new Date(`${weekStart(anchor)}T00:00:00.000Z`)
  d.setUTCDate(d.getUTCDate() + delta * 7)
  return d.toISOString().slice(0, 10)
}
