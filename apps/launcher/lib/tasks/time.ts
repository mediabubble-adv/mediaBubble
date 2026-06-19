// Time-entry helpers for the inline card timer. A stopped timer records a
// `time_entries` row; the duration is derived from start/end so the stored
// `duration_minutes` always matches the timestamps.

/** Whole minutes elapsed between start and end. Throws if end <= start. */
export function durationMinutes(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime()
  if (ms <= 0) throw new Error('end must be after start')
  return Math.floor(ms / 60_000)
}
