import type { Market } from './site-config'

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

const OFFICE_HOURS: Record<
  Extract<Market, 'eg' | 'ae'>,
  { timeZone: string; openDays: readonly number[]; openHour: number; closeHour: number }
> = {
  eg: {
    timeZone: 'Africa/Cairo',
    openDays: [0, 1, 2, 3, 4],
    openHour: 9,
    closeHour: 18,
  },
  ae: {
    timeZone: 'Asia/Dubai',
    openDays: [0, 1, 2, 3, 4],
    openHour: 9,
    closeHour: 18,
  },
}

/** Sunday–Thursday, 9:00–18:00 in the market's local timezone. */
export function isOfficeOpen(market: Extract<Market, 'eg' | 'ae'>, now: Date = new Date()): boolean {
  const { timeZone, openDays, openHour, closeHour } = OFFICE_HOURS[market]
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now)

  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? ''
  const day = WEEKDAY_INDEX[weekday] ?? -1
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? -1)
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0)

  if (!openDays.includes(day)) return false

  const minutesSinceMidnight = hour * 60 + minute
  return minutesSinceMidnight >= openHour * 60 && minutesSinceMidnight < closeHour * 60
}
