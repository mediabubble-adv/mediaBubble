export interface SubtaskProgressInput {
  status: string | null
}

/** Returns 0–100 percent, or null when there are no subtasks. */
export function taskProgress(subtasks: SubtaskProgressInput[]): number | null {
  if (subtasks.length === 0) return null
  const done = subtasks.filter((s) => s.status === 'Done').length
  return Math.round((done / subtasks.length) * 100)
}

export function subtaskCounts(subtasks: SubtaskProgressInput[]): { done: number; total: number } {
  return {
    done: subtasks.filter((s) => s.status === 'Done').length,
    total: subtasks.length,
  }
}
