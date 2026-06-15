import { isOfficeOpen } from './office-hours'

describe('isOfficeOpen', () => {
  it('returns true on a weekday during business hours (Cairo)', () => {
    // Sunday 10:00 Cairo — 2024-06-16 is Sunday
    const sundayMorning = new Date('2024-06-16T08:00:00Z')
    expect(isOfficeOpen('eg', sundayMorning)).toBe(true)
  })

  it('returns false on Friday (Cairo)', () => {
    const friday = new Date('2024-06-14T10:00:00Z')
    expect(isOfficeOpen('eg', friday)).toBe(false)
  })

  it('returns false after close (Dubai)', () => {
    const evening = new Date('2024-06-17T15:00:00Z') // Monday 19:00 GST
    expect(isOfficeOpen('ae', evening)).toBe(false)
  })
})
