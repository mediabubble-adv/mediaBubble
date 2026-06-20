import { buildCapacitySnapshot, utilizationTone } from './capacity'

describe('buildCapacitySnapshot', () => {
  it('computes utilization from weekly entries', () => {
    const snap = buildCapacitySnapshot(
      {
        user_id: 'u1',
        user_name: 'Alex',
        entries: [
          { date: '2026-06-16', duration_minutes: 480, billable: true },
          { date: '2026-06-17', duration_minutes: 240, billable: false },
        ],
        allocated_hours: 40,
      },
      new Date('2026-06-18T12:00:00.000Z'),
    )
    expect(snap.logged_hours).toBe(12)
    expect(snap.utilization_percent).toBe(30)
    expect(snap.entry_count).toBe(2)
  })
})

describe('utilizationTone', () => {
  it('maps percent bands', () => {
    expect(utilizationTone(30)).toBe('low')
    expect(utilizationTone(75)).toBe('ok')
    expect(utilizationTone(95)).toBe('high')
    expect(utilizationTone(110)).toBe('over')
  })
})
