import {
  createTaskSchema,
  updateTaskSchema,
  statusUpdateSchema,
  taskCommentSchema,
  timeEntrySchema,
  listTasksQuerySchema,
} from './schemas'

const UUID = '11111111-1111-1111-1111-111111111111'

describe('createTaskSchema', () => {
  it('accepts a minimal task and trims the title', () => {
    const r = createTaskSchema.safeParse({ title: '  Ship MVP  ' })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.title).toBe('Ship MVP')
  })

  it('rejects an empty title', () => {
    expect(createTaskSchema.safeParse({ title: '   ' }).success).toBe(false)
  })

  it('rejects a title longer than 255 chars', () => {
    expect(createTaskSchema.safeParse({ title: 'x'.repeat(256) }).success).toBe(false)
  })

  it('rejects an unknown priority', () => {
    expect(createTaskSchema.safeParse({ title: 'A', priority: 'Whenever' }).success).toBe(false)
  })

  it('accepts a known priority and a uuid assignee', () => {
    const r = createTaskSchema.safeParse({ title: 'A', priority: 'High', assigned_to: UUID })
    expect(r.success).toBe(true)
  })

  it('rejects a non-uuid assignee', () => {
    expect(createTaskSchema.safeParse({ title: 'A', assigned_to: 'nope' }).success).toBe(false)
  })

  it('coerces tags to a string array', () => {
    const r = createTaskSchema.safeParse({ title: 'A', tags: ['urgent', 'client'] })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.tags).toEqual(['urgent', 'client'])
  })
})

describe('updateTaskSchema', () => {
  it('allows a partial update', () => {
    expect(updateTaskSchema.safeParse({ title: 'Renamed' }).success).toBe(true)
  })

  it('rejects an empty update', () => {
    expect(updateTaskSchema.safeParse({}).success).toBe(false)
  })
})

describe('statusUpdateSchema', () => {
  it('accepts a valid column', () => {
    expect(statusUpdateSchema.safeParse({ status: 'Review' }).success).toBe(true)
  })

  it('rejects an invalid column', () => {
    expect(statusUpdateSchema.safeParse({ status: 'Done!' }).success).toBe(false)
  })
})

describe('taskCommentSchema', () => {
  it('requires non-empty content', () => {
    expect(taskCommentSchema.safeParse({ content: '' }).success).toBe(false)
    expect(taskCommentSchema.safeParse({ content: 'lgtm' }).success).toBe(true)
  })

  it('validates mentioned_users as uuids', () => {
    expect(
      taskCommentSchema.safeParse({ content: 'hi', mentioned_users: ['nope'] }).success,
    ).toBe(false)
    expect(
      taskCommentSchema.safeParse({ content: 'hi', mentioned_users: [UUID] }).success,
    ).toBe(true)
  })
})

describe('timeEntrySchema', () => {
  it('accepts an ISO start/end pair', () => {
    const r = timeEntrySchema.safeParse({
      start_time: '2026-06-19T10:00:00Z',
      end_time: '2026-06-19T10:30:00Z',
    })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.end_time.getTime()).toBeGreaterThan(r.data.start_time.getTime())
  })

  it('rejects end before start', () => {
    expect(
      timeEntrySchema.safeParse({
        start_time: '2026-06-19T10:30:00Z',
        end_time: '2026-06-19T10:00:00Z',
      }).success,
    ).toBe(false)
  })
})

describe('listTasksQuerySchema', () => {
  it('parses status and assignee filters from query params', () => {
    const r = listTasksQuerySchema.safeParse({ status: 'Backlog', assigned_to: UUID })
    expect(r.success).toBe(true)
  })

  it('rejects an invalid status filter', () => {
    expect(listTasksQuerySchema.safeParse({ status: 'Nope' }).success).toBe(false)
  })

  it('allows no filters', () => {
    expect(listTasksQuerySchema.safeParse({}).success).toBe(true)
  })
})
