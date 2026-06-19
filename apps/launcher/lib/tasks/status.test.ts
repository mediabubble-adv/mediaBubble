import { TASK_STATUSES, isTaskStatus, statusSideEffects } from './status'

describe('task status', () => {
  it('exposes the four Kanban columns in order', () => {
    expect(TASK_STATUSES).toEqual(['Backlog', 'In Progress', 'Review', 'Done'])
  })

  it('accepts a known status', () => {
    expect(isTaskStatus('In Progress')).toBe(true)
  })

  it('rejects an unknown status', () => {
    expect(isTaskStatus('Archived')).toBe(false)
  })

  it('stamps completed_at when moving to Done', () => {
    const now = new Date('2026-06-19T12:00:00Z')
    expect(statusSideEffects('Done', now)).toEqual({ completed_at: now })
  })

  it('clears completed_at when moving off Done', () => {
    expect(statusSideEffects('In Progress', new Date())).toEqual({ completed_at: null })
  })
})
