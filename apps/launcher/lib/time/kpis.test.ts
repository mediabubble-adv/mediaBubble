import { summarize, entriesInRange, formatDuration, weekStart, weekEnd, type TimeEntryRow } from './kpis'

const entries: TimeEntryRow[] = [
  { date: '2026-06-16', duration_minutes: 60, billable: true },
  { date: '2026-06-17', duration_minutes: 30, billable: false },
  { date: '2026-06-18', duration_minutes: 90, billable: true },
  { date: '2026-06-20', duration_minutes: 45, billable: true },
]

describe('summarize', () => {
  it('totals minutes and billable minutes', () => {
    const s = summarize(entries)
    expect(s.totalMinutes).toBe(225)
    expect(s.billableMinutes).toBe(195)
    expect(s.entryCount).toBe(4)
  })
})

describe('entriesInRange', () => {
  it('filters by inclusive date range', () => {
    const filtered = entriesInRange(entries, '2026-06-17', '2026-06-18')
    expect(filtered).toHaveLength(2)
  })
})

describe('formatDuration', () => {
  it('renders hours and zero-padded minutes', () => {
    expect(formatDuration(90)).toBe('1:30')
    expect(formatDuration(5)).toBe('0:05')
  })
})

describe('weekStart and weekEnd', () => {
  it('returns Monday–Sunday for a mid-week date', () => {
    const d = new Date('2026-06-18T12:00:00.000Z') // Thursday
    expect(weekStart(d)).toBe('2026-06-15')
    expect(weekEnd(d)).toBe('2026-06-21')
  })
})
