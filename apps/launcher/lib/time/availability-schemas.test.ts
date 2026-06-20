import {
  createAvailabilitySchema,
  listAvailabilityQuerySchema,
  listHolidaysQuerySchema,
} from './availability-schemas'
import { parseTimeValue, formatTimeValue } from './availability'

describe('createAvailabilitySchema', () => {
  it('accepts a valid slot', () => {
    const r = createAvailabilitySchema.safeParse({
      date: '2026-07-01',
      start_time: '09:00',
      end_time: '17:00',
      status: 'Available',
    })
    expect(r.success).toBe(true)
  })

  it('rejects end before start', () => {
    expect(
      createAvailabilitySchema.safeParse({
        date: '2026-07-01',
        start_time: '14:00',
        end_time: '10:00',
      }).success,
    ).toBe(false)
  })
})

describe('listHolidaysQuerySchema', () => {
  it('requires a supported country', () => {
    expect(listHolidaysQuerySchema.safeParse({ country: 'Egypt' }).success).toBe(true)
    expect(listHolidaysQuerySchema.safeParse({ country: 'USA' }).success).toBe(false)
  })
})

describe('parseTimeValue / formatTimeValue', () => {
  it('round-trips HH:MM', () => {
    const d = parseTimeValue('09:30')
    expect(formatTimeValue(d)).toBe('09:30')
  })
})

describe('listAvailabilityQuerySchema', () => {
  it('accepts optional date range', () => {
    expect(
      listAvailabilityQuerySchema.safeParse({ from: '2026-07-01', to: '2026-07-31' }).success,
    ).toBe(true)
  })
})
