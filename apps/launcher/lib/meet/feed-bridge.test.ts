import { formatTaskFeedContent } from '@/lib/meet/feed-bridge'

describe('formatTaskFeedContent', () => {
  it('formats completion', () => {
    expect(
      formatTaskFeedContent('status_changed', { to: 'Done' }, 'Yasser'),
    ).toBe('Yasser completed a task')
  })

  it('formats subtask completion', () => {
    expect(
      formatTaskFeedContent('subtask_completed', { title: 'Design mockups' }, 'Sara'),
    ).toBe('Sara completed subtask “Design mockups”')
  })
})
