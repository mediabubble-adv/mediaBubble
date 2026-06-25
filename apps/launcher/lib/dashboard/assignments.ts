export interface DashboardParentAssignment {
  kind: 'parent'
  taskId: string
  title: string
  clientName: string | null
  status: string
  priority: string
  due_date: string | null
}

export interface DashboardSubtaskGroupAssignment {
  kind: 'subtask_group'
  parentId: string
  parentTitle: string
  clientName: string | null
  subtaskCount: number
  /** Highest-urgency status among grouped subtasks */
  status: string
}

export type DashboardAssignment =
  | DashboardParentAssignment
  | DashboardSubtaskGroupAssignment

const STATUS_RANK: Record<string, number> = {
  'In Progress': 0,
  Review: 1,
  Backlog: 2,
  Done: 3,
}

export function groupDashboardAssignments(input: {
  parents: Array<{
    id: string
    title: string
    status: string | null
    priority: string | null
    due_date: Date | null
    clients: { name: string } | null
  }>
  subtasks: Array<{
    id: string
    parent_task_id: string | null
    status: string | null
    tasks: {
      id: string
      title: string
      clients: { name: string } | null
    } | null
  }>
}): DashboardAssignment[] {
  const parentRows: DashboardParentAssignment[] = input.parents.map((t) => ({
    kind: 'parent',
    taskId: t.id,
    title: t.title,
    clientName: t.clients?.name ?? null,
    status: t.status ?? 'Backlog',
    priority: t.priority ?? 'Medium',
    due_date: t.due_date ? t.due_date.toISOString().slice(0, 10) : null,
  }))

  const groups = new Map<string, DashboardSubtaskGroupAssignment>()
  for (const sub of input.subtasks) {
    const parent = sub.tasks
    if (!parent || !sub.parent_task_id) continue
    const key = sub.parent_task_id
    const existing = groups.get(key)
    const status = sub.status ?? 'Backlog'
    if (!existing) {
      groups.set(key, {
        kind: 'subtask_group',
        parentId: parent.id,
        parentTitle: parent.title,
        clientName: parent.clients?.name ?? null,
        subtaskCount: 1,
        status,
      })
    } else {
      existing.subtaskCount += 1
      const curRank = STATUS_RANK[existing.status] ?? 9
      const newRank = STATUS_RANK[status] ?? 9
      if (newRank < curRank) existing.status = status
    }
  }

  return [...parentRows, ...groups.values()]
}

export function formatSubtaskGroupLabel(row: DashboardSubtaskGroupAssignment): string {
  const client = row.clientName ? ` for ${row.clientName}` : ''
  return `${row.subtaskCount} subtask${row.subtaskCount === 1 ? '' : 's'} of ${row.parentTitle}${client}`
}
