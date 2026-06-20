// Pure helpers for Time Management KPIs and formatting.

export interface TimeEntryRow {
  date: string
  duration_minutes: number | null
  billable: boolean | null
}

export interface TimeSummary {
  totalMinutes: number
  billableMinutes: number
  entryCount: number
}

/** Sum duration and billable minutes for a set of entries. */
export function summarize(entries: TimeEntryRow[]): TimeSummary {
  let totalMinutes = 0
  let billableMinutes = 0

  for (const entry of entries) {
    const minutes = entry.duration_minutes ?? 0
    totalMinutes += minutes
    if (entry.billable) billableMinutes += minutes
  }

  return { totalMinutes, billableMinutes, entryCount: entries.length }
}

/** Filter entries whose `date` (YYYY-MM-DD) falls within [from, to] inclusive. */
export function entriesInRange(
  entries: TimeEntryRow[],
  from: string,
  to: string,
): TimeEntryRow[] {
  return entries.filter((e) => e.date >= from && e.date <= to)
}

/** Format minutes as `H:MM` for display (e.g. 90 → "1:30"). */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}:${String(m).padStart(2, '0')}`
}

/** ISO date string (YYYY-MM-DD) for the Monday of the week containing `date`. */
export function weekStart(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const day = d.getUTCDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setUTCDate(d.getUTCDate() + diff)
  return d.toISOString().slice(0, 10)
}

/** ISO date strings (Mon–Sun) for the week containing `date`. */
export function weekDates(date: Date): string[] {
  const start = weekStart(date)
  const d = new Date(`${start}T00:00:00.000Z`)
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(d)
    day.setUTCDate(d.getUTCDate() + i)
    return day.toISOString().slice(0, 10)
  })
}

/** ISO date string (YYYY-MM-DD) for the Sunday of the week containing `date`. */
export function weekEnd(date: Date): string {
  const start = weekStart(date)
  const d = new Date(`${start}T00:00:00.000Z`)
  d.setUTCDate(d.getUTCDate() + 6)
  return d.toISOString().slice(0, 10)
}
