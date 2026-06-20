// Capacity planning helpers — weekly utilization from time entries.

import { entriesInRange, summarize, weekEnd, weekStart, type TimeEntryRow } from './kpis'

export const DEFAULT_ALLOCATED_HOURS = 40

export interface CapacitySnapshot {
  user_id: string
  user_name: string
  week_start: string
  week_end: string
  allocated_hours: number
  logged_hours: number
  utilization_percent: number
  entry_count: number
}

export interface CapacityMemberInput {
  user_id: string
  user_name: string
  entries: TimeEntryRow[]
  allocated_hours?: number
}

/** Build a weekly capacity snapshot for one user. */
export function buildCapacitySnapshot(
  member: CapacityMemberInput,
  anchor: Date,
): CapacitySnapshot {
  const from = weekStart(anchor)
  const to = weekEnd(anchor)
  const allocated = member.allocated_hours ?? DEFAULT_ALLOCATED_HOURS
  const inWeek = entriesInRange(member.entries, from, to)
  const loggedMinutes = summarize(inWeek).totalMinutes
  const loggedHours = Math.round((loggedMinutes / 60) * 100) / 100
  const utilization =
    allocated > 0 ? Math.round((loggedHours / allocated) * 1000) / 10 : 0

  return {
    user_id: member.user_id,
    user_name: member.user_name,
    week_start: from,
    week_end: to,
    allocated_hours: allocated,
    logged_hours: loggedHours,
    utilization_percent: utilization,
    entry_count: inWeek.length,
  }
}

/** Utilization bar color token by percent bands. */
export function utilizationTone(percent: number): 'low' | 'ok' | 'high' | 'over' {
  if (percent < 50) return 'low'
  if (percent <= 90) return 'ok'
  if (percent <= 100) return 'high'
  return 'over'
}
