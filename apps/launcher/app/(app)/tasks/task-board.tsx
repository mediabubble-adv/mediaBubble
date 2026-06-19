'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Plus, Play, Square, Clock } from 'lucide-react'
import { TASK_STATUSES, type TaskStatus } from '@/lib/tasks/status'

export interface BoardTask {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  assigned_to: string | null
  tags: string[]
  due_date: string | null
}

export interface BoardMember {
  id: string
  name: string
}

const PRIORITY_STYLES: Record<string, string> = {
  Low: 'bg-brand-text-muted/15 text-brand-text-muted',
  Medium: 'bg-brand-info/15 text-brand-info',
  High: 'bg-brand-warning/15 text-brand-warning',
  Urgent: 'bg-brand-error/15 text-brand-error',
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

function formatElapsed(ms: number): string {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function TaskBoard({
  initialTasks,
  members,
}: {
  initialTasks: BoardTask[]
  members: BoardMember[]
}) {
  const [tasks, setTasks] = useState<BoardTask[]>(initialTasks)
  const [dragId, setDragId] = useState<string | null>(null)
  const [overColumn, setOverColumn] = useState<TaskStatus | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [creating, setCreating] = useState(false)

  // Running timers: task id -> epoch ms when started. A 1s tick re-renders the
  // active timers; the interval only runs while at least one timer is live.
  const [timers, setTimers] = useState<Record<string, number>>({})
  const [, setNow] = useState(Date.now())
  const hasTimers = Object.keys(timers).length > 0
  useEffect(() => {
    if (!hasTimers) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [hasTimers])

  const memberName = useMemo(() => {
    const map = new Map(members.map((m) => [m.id, m.name]))
    return (id: string | null) => (id ? (map.get(id) ?? '—') : null)
  }, [members])

  async function moveTask(id: string, to: TaskStatus) {
    const prev = tasks
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: to } : t)))
    try {
      const res = await fetch(`/api/tasks/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: to }),
      })
      if (!res.ok) throw new Error('status update failed')
    } catch {
      setTasks(prev) // roll back the optimistic move
    }
  }

  async function createTask(e: FormEvent) {
    e.preventDefault()
    const title = newTitle.trim()
    if (!title || creating) return
    setCreating(true)
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      const json = await res.json()
      if (res.ok) {
        const t = json.data
        setTasks((ts) => [
          {
            id: t.id,
            title: t.title,
            description: t.description ?? null,
            status: t.status ?? 'Backlog',
            priority: t.priority ?? 'Medium',
            assigned_to: t.assigned_to ?? null,
            tags: t.tags ?? [],
            due_date: t.due_date ? String(t.due_date).slice(0, 10) : null,
          },
          ...ts,
        ])
        setNewTitle('')
      }
    } finally {
      setCreating(false)
    }
  }

  function toggleTimer(id: string) {
    const start = timers[id]
    if (start) {
      // Stop: record the span as a time entry. The fetch stays OUT of the state
      // updater so Strict Mode's double-invocation can't fire it twice.
      const end = Date.now()
      if (end > start) {
        void fetch(`/api/tasks/${id}/time`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            start_time: new Date(start).toISOString(),
            end_time: new Date(end).toISOString(),
          }),
        })
      }
      setTimers((cur) => {
        const rest = { ...cur }
        delete rest[id]
        return rest
      })
    } else {
      setTimers((cur) => ({ ...cur, [id]: Date.now() }))
    }
  }

  const columns = TASK_STATUSES.map((status) => ({
    status,
    items: tasks.filter((t) => t.status === status),
  }))

  return (
    <div className="px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/[0.16]">
            <Clock size={20} className="text-brand-blue" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-text">Tasks</h1>
            <p className="text-[13px] text-brand-text-muted">
              {tasks.length} task{tasks.length === 1 ? '' : 's'} · drag between columns, time them inline.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {columns.map(({ status, items }) => (
            <div
              key={status}
              onDragOver={(e) => {
                e.preventDefault()
                setOverColumn(status)
              }}
              onDragLeave={() => setOverColumn((c) => (c === status ? null : c))}
              onDrop={() => {
                if (dragId) moveTask(dragId, status)
                setDragId(null)
                setOverColumn(null)
              }}
              className={`flex flex-col rounded-2xl border bg-brand-surface p-3 transition-colors duration-200 ${
                overColumn === status ? 'border-brand-blue/60' : 'border-brand-whisper-border'
              }`}
            >
              <div className="flex items-center justify-between px-1 pb-3">
                <span className="text-[12px] font-bold uppercase tracking-wider text-brand-text-muted">
                  {status}
                </span>
                <span className="rounded-md bg-brand-whisper-border/40 px-1.5 text-[11px] font-semibold text-brand-text-muted">
                  {items.length}
                </span>
              </div>

              {status === 'Backlog' && (
                <form onSubmit={createTask} className="mb-2 flex items-center gap-1.5">
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Add a task…"
                    aria-label="New task title"
                    className="min-w-0 flex-1 rounded-lg border border-brand-input-border bg-brand-canvas px-2.5 py-1.5 text-[13px] text-brand-text outline-none placeholder:text-brand-text-muted focus:border-brand-blue/60"
                  />
                  <button
                    type="submit"
                    disabled={creating || !newTitle.trim()}
                    aria-label="Create task"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue text-white transition-all duration-200 active:scale-[0.95] disabled:opacity-40"
                  >
                    <Plus size={16} />
                  </button>
                </form>
              )}

              <div className="flex flex-col gap-2">
                {items.map((task) => {
                  const running = timers[task.id]
                  const assignee = memberName(task.assigned_to)
                  return (
                    <article
                      key={task.id}
                      draggable
                      onDragStart={() => setDragId(task.id)}
                      onDragEnd={() => setDragId(null)}
                      className={`cursor-grab rounded-xl border border-brand-whisper-border bg-brand-canvas p-3 transition-all duration-200 hover:border-brand-blue/40 active:cursor-grabbing ${
                        dragId === task.id ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[13px] font-semibold leading-snug text-brand-text">
                          {task.title}
                        </p>
                        <span
                          className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                            PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES['Medium']
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {task.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-brand-whisper-border/40 px-1.5 py-0.5 text-[10px] text-brand-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {assignee && (
                            <span
                              title={assignee}
                              className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue/[0.16] text-[9px] font-bold text-brand-blue"
                            >
                              {initials(assignee)}
                            </span>
                          )}
                          {task.due_date && (
                            <span className="text-[10px] text-brand-text-muted">{task.due_date}</span>
                          )}
                        </div>

                        <button
                          onClick={() => toggleTimer(task.id)}
                          aria-label={running ? 'Stop timer' : 'Start timer'}
                          className={`flex items-center gap-1 rounded-lg px-1.5 py-1 text-[11px] font-semibold transition-all duration-200 active:scale-[0.95] ${
                            running
                              ? 'bg-brand-error/15 text-brand-error'
                              : 'text-brand-text-muted hover:text-brand-blue'
                          }`}
                        >
                          {running ? (
                            <>
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-error" />
                              <span className="tabular-nums" dir="ltr">
                                {formatElapsed(Date.now() - running)}
                              </span>
                              <Square size={12} />
                            </>
                          ) : (
                            <Play size={13} />
                          )}
                        </button>
                      </div>
                    </article>
                  )
                })}

                {items.length === 0 && (
                  <p className="rounded-lg border border-dashed border-brand-whisper-border px-3 py-4 text-center text-[11px] text-brand-text-muted">
                    Nothing here
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
