import { durationMinutes } from './time'

describe('durationMinutes', () => {
  it('floors the elapsed span to whole minutes', () => {
    const start = new Date('2026-06-19T10:00:00Z')
    const end = new Date('2026-06-19T10:25:45Z')
    expect(durationMinutes(start, end)).toBe(25)
  })

  it('returns 0 for a sub-minute span', () => {
    const start = new Date('2026-06-19T10:00:00Z')
    const end = new Date('2026-06-19T10:00:30Z')
    expect(durationMinutes(start, end)).toBe(0)
  })

  it('throws when end is not after start', () => {
    const t = new Date('2026-06-19T10:00:00Z')
    expect(() => durationMinutes(t, t)).toThrow('end must be after start')
  })
})
