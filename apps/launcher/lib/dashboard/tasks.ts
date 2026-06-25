const STATUS_RANK: Record<string, number> = {
  'In Progress': 0,
  Review: 1,
  Backlog: 2,
  Done: 3,
}

export interface DashboardTaskRow {
  id: string
  title: string
  status: string
  priority: string
  due_date: string | null
  tags: string[]
}

export interface TodayTaskProgress {
  dueTodayTotal: number
  dueTodayDone: number
  completedToday: number
  activeAssigned: number
}

export function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfToday(): Date {
  const d = new Date()
  d.setHours(23, 59, 59, 999)
  return d
}

export function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function computeTodayProgress(
  tasks: Array<{
    status: string | null
    due_date: Date | null
    completed_at: Date | null
    updated_at: Date
  }>,
): TodayTaskProgress {
  const todayStart = startOfToday()
  const todayKey = toDateKey(todayStart)

  let dueTodayTotal = 0
  let dueTodayDone = 0
  let completedToday = 0
  let activeAssigned = 0

  for (const task of tasks) {
    const status = task.status ?? 'Backlog'
    const dueKey = task.due_date ? toDateKey(task.due_date) : null

    if (status !== 'Done') activeAssigned += 1

    if (dueKey === todayKey) {
      dueTodayTotal += 1
      if (status === 'Done') dueTodayDone += 1
    }

    if (status === 'Done') {
      const completedAt = task.completed_at ?? task.updated_at
      if (completedAt >= todayStart) completedToday += 1
    }
  }

  return { dueTodayTotal, dueTodayDone, completedToday, activeAssigned }
}

export function pickNextStepTasks(
  tasks: Array<{
    id: string
    title: string
    status: string | null
    priority: string | null
    due_date: Date | null
    tags: string[]
    updated_at: Date
  }>,
  limit = 8,
): DashboardTaskRow[] {
  const open = tasks.filter((t) => (t.status ?? 'Backlog') !== 'Done')

  open.sort((a, b) => {
    const sa = STATUS_RANK[a.status ?? 'Backlog'] ?? 9
    const sb = STATUS_RANK[b.status ?? 'Backlog'] ?? 9
    if (sa !== sb) return sa - sb

    const da = a.due_date?.getTime() ?? Number.MAX_SAFE_INTEGER
    const db = b.due_date?.getTime() ?? Number.MAX_SAFE_INTEGER
    if (da !== db) return da - db

    return b.updated_at.getTime() - a.updated_at.getTime()
  })

  return open.slice(0, limit).map((t) => ({
    id: t.id,
    title: t.title,
    status: t.status ?? 'Backlog',
    priority: t.priority ?? 'Medium',
    due_date: t.due_date ? toDateKey(t.due_date) : null,
    tags: t.tags,
  }))
}

export function recentTagsFromTasks(
  tasks: Array<{ tags: string[]; updated_at: Date }>,
  limit = 8,
): string[] {
  const sorted = [...tasks].sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime())
  const seen = new Set<string>()
  const result: string[] = []

  for (const task of sorted) {
    for (const tag of task.tags) {
      const key = tag.trim()
      if (!key || seen.has(key)) continue
      seen.add(key)
      result.push(key)
      if (result.length >= limit) return result
    }
  }

  return result
}
