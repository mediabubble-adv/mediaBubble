import { formatActivityMessage, mergeFeedByTime } from './activity'

describe('mergeFeedByTime', () => {
  it('sorts items oldest first', () => {
    const sorted = mergeFeedByTime([
      { created_at: '2026-06-02T10:00:00Z' },
      { created_at: '2026-06-01T10:00:00Z' },
    ])
    expect(sorted[0].created_at).toBe('2026-06-01T10:00:00Z')
  })
})

describe('formatActivityMessage', () => {
  it('formats subtask completion', () => {
    expect(
      formatActivityMessage('subtask_completed', { title: 'Logo draft' }, 'Sara'),
    ).toBe('Sara completed “Logo draft”')
  })
})
