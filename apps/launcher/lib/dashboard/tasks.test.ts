import {
  computeTodayProgress,
  pickNextStepTasks,
  recentTagsFromTasks,
  toDateKey,
  startOfToday,
} from './tasks'

describe('dashboard tasks helpers', () => {
  const today = startOfToday()

  it('computes today progress from assigned tasks', () => {
    const progress = computeTodayProgress([
      {
        status: 'Done',
        due_date: today,
        completed_at: today,
        updated_at: today,
      },
      {
        status: 'In Progress',
        due_date: today,
        completed_at: null,
        updated_at: today,
      },
      {
        status: 'Backlog',
        due_date: null,
        completed_at: null,
        updated_at: today,
      },
    ])

    expect(progress.dueTodayTotal).toBe(2)
    expect(progress.dueTodayDone).toBe(1)
    expect(progress.completedToday).toBe(1)
    expect(progress.activeAssigned).toBe(2)
  })

  it('orders next step tasks by status then due date', () => {
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const next = pickNextStepTasks([
      {
        id: '1',
        title: 'Backlog task',
        status: 'Backlog',
        priority: 'Low',
        due_date: tomorrow,
        tags: [],
        updated_at: today,
      },
      {
        id: '2',
        title: 'In progress',
        status: 'In Progress',
        priority: 'High',
        due_date: tomorrow,
        tags: [],
        updated_at: today,
      },
    ])

    expect(next[0]?.id).toBe('2')
  })

  it('collects recent unique tags', () => {
    const tags = recentTagsFromTasks([
      { tags: ['seo', 'client'], updated_at: new Date('2026-01-02') },
      { tags: ['seo', 'urgent'], updated_at: new Date('2026-01-03') },
    ])
    expect(tags).toEqual(['seo', 'urgent', 'client'])
  })

  it('formats date keys', () => {
    expect(toDateKey(today)).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
