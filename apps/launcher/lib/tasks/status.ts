// Task Board status model. The four values are the Kanban columns rendered in
// the UI and stored verbatim in `tasks.status` (DB default "Backlog").

export const TASK_STATUSES = ['Backlog', 'In Progress', 'Review', 'Done'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]

export function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && (TASK_STATUSES as readonly string[]).includes(value)
}

/**
 * Derive the `completed_at` change for a status transition: stamp it when the
 * task lands in Done, clear it otherwise so re-opened tasks don't keep a stale
 * completion time.
 */
export function statusSideEffects(
  status: TaskStatus,
  now: Date = new Date(),
): { completed_at: Date | null } {
  return { completed_at: status === 'Done' ? now : null }
}
