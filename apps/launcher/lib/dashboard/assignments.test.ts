import { formatSubtaskGroupLabel, groupDashboardAssignments } from './assignments'

describe('groupDashboardAssignments', () => {
  it('groups subtasks under parent summary rows', () => {
    const rows = groupDashboardAssignments({
      parents: [
        {
          id: 'p1',
          title: 'Parent task',
          status: 'In Progress',
          priority: 'High',
          due_date: null,
          clients: { name: 'Acme' },
        },
      ],
      subtasks: [
        {
          id: 's1',
          parent_task_id: 'p2',
          status: 'Backlog',
          tasks: { id: 'p2', title: 'Website redesign', clients: { name: 'Cairo Retail' } },
        },
        {
          id: 's2',
          parent_task_id: 'p2',
          status: 'In Progress',
          tasks: { id: 'p2', title: 'Website redesign', clients: { name: 'Cairo Retail' } },
        },
      ],
    })

    expect(rows).toHaveLength(2)
    expect(rows[1]).toMatchObject({
      kind: 'subtask_group',
      subtaskCount: 2,
      parentTitle: 'Website redesign',
      clientName: 'Cairo Retail',
    })
    expect(formatSubtaskGroupLabel(rows[1] as never)).toBe(
      '2 subtasks of Website redesign for Cairo Retail',
    )
  })
})
