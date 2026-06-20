// Helpers for Prisma `@db.Time` fields and availability validation.

/** Parse `HH:MM` into a UTC time-only Date for Prisma Time columns. */
export function parseTimeValue(time: string): Date {
  const [h, m] = time.split(':').map(Number)
  return new Date(Date.UTC(1970, 0, 1, h, m, 0))
}

/** Format a Prisma Time Date as `HH:MM`. */
export function formatTimeValue(value: Date): string {
  return `${String(value.getUTCHours()).padStart(2, '0')}:${String(value.getUTCMinutes()).padStart(2, '0')}`
}

/** ISO date string from a Date column. */
export function formatDateValue(value: Date): string {
  return value.toISOString().slice(0, 10)
}
