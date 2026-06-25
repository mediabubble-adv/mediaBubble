import { taskProgress, subtaskCounts } from './progress'

describe('taskProgress', () => {
  it('returns null when there are no subtasks', () => {
    expect(taskProgress([])).toBeNull()
  })

  it('returns 0 when none are done', () => {
    expect(taskProgress([{ status: 'Backlog' }, { status: 'In Progress' }])).toBe(0)
  })

  it('returns 50 for half done', () => {
    expect(taskProgress([{ status: 'Done' }, { status: 'Backlog' }])).toBe(50)
  })

  it('returns 100 when all done', () => {
    expect(taskProgress([{ status: 'Done' }, { status: 'Done' }])).toBe(100)
  })
})

describe('subtaskCounts', () => {
  it('counts done subtasks', () => {
    expect(subtaskCounts([{ status: 'Done' }, { status: 'Review' }])).toEqual({
      done: 1,
      total: 2,
    })
  })
})
