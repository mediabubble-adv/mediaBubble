'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Plus, CheckSquare } from 'lucide-react'
import { TASK_STATUSES, type TaskStatus } from '@/lib/tasks/status'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { TaskCard } from '@/components/tasks/task-card'
import { TaskForm } from '@/components/tasks/task-form'
import { TaskDetails } from '@/components/tasks/task-details'
import type { BoardTask, BoardMember } from '@/components/tasks/types'

export type { BoardTask, BoardMember }

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
  const [quickTitle, setQuickTitle] = useState('')
  const [quickCreating, setQuickCreating] = useState(false)

  // Running timers: task id → epoch ms when started
  const [timers, setTimers] = useState<Record<string, number>>({})
  const [, setNow] = useState(Date.now())
  const hasTimers = Object.keys(timers).length > 0
  useEffect(() => {
    if (!hasTimers) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [hasTimers])

  // UI overlay state
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [editingTask, setEditingTask] = useState<BoardTask | null>(null)

  const memberName = useMemo(() => {
    const map = new Map(members.map((m) => [m.id, m.name]))
    return (id: string | null) => (id ? (map.get(id) ?? null) : null)
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
      if (!res.ok) throw new Error('failed')
    } catch {
      setTasks(prev)
    }
  }

  async function quickCreate(e: FormEvent) {
    e.preventDefault()
    const title = quickTitle.trim()
    if (!title || quickCreating) return
    setQuickCreating(true)
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
        setQuickTitle('')
      }
    } finally {
      setQuickCreating(false)
    }
  }

  function toggleTimer(id: string) {
    const start = timers[id]
    if (start) {
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

  function handleTaskSaved(saved: BoardTask) {
    setTasks((ts) => {
      const idx = ts.findIndex((t) => t.id === saved.id)
      if (idx === -1) return [saved, ...ts]
      return ts.map((t) => (t.id === saved.id ? saved : t))
    })
    setCreateOpen(false)
    setEditingTask(null)
  }

  function handleEdit(task: BoardTask) {
    setSelectedTaskId(null)
    setEditingTask(task)
  }

  function handleDelete(id: string) {
    setTasks((ts) => ts.filter((t) => t.id !== id))
    setSelectedTaskId(null)
  }

  const columns = TASK_STATUSES.map((status) => ({
    status,
    items: tasks.filter((t) => t.status === status),
  }))

  return (
    <>
      <PageFrame width="full">
        <PageHeader
          title="Tasks"
          description={`${tasks.length} task${tasks.length === 1 ? '' : 's'} · drag between columns`}
          icon={CheckSquare}
          actions={
            <Button onClick={() => setCreateOpen(true)}>
              <Plus size={15} />
              New task
            </Button>
          }
        />

        <div className="launcher-scroll-x mt-6">
          <div className="flex min-w-max gap-4 pb-2">
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
                className={`flex w-[min(100vw-3rem,320px)] shrink-0 flex-col rounded-2xl border bg-card p-3 transition-[border-color] duration-200 sm:w-[300px] lg:w-[min(22vw,340px)] ${
                  overColumn === status
                    ? 'border-primary/60'
                    : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between px-1 pb-3">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                    {status}
                  </span>
                  <span className="rounded-md bg-border/40 px-1.5 text-[11px] font-semibold text-muted-foreground">
                    {items.length}
                  </span>
                </div>

                {/* Quick-add only in Backlog column */}
                {status === 'Backlog' && (
                  <form onSubmit={quickCreate} className="mb-2 flex items-center gap-1.5">
                    <Input
                      value={quickTitle}
                      onChange={(e) => setQuickTitle(e.target.value)}
                      placeholder="Quick add…"
                      aria-label="New task title"
                      className="min-w-0 flex-1 rounded-lg border border-input bg-background px-2.5 py-1.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground transition-[border-color] duration-150 focus:border-primary/60"
                    />
                    <button
                      type="submit"
                      disabled={quickCreating || !quickTitle.trim()}
                      aria-label="Create task"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-[transform,opacity] duration-150 ease-[var(--ease-out)] active:scale-[0.95] disabled:opacity-40"
                    >
                      <Plus size={15} />
                    </button>
                  </form>
                )}

                <div className="flex flex-col gap-2">
                  {items.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      memberName={memberName}
                      timerStart={timers[task.id]}
                      isDragging={dragId === task.id}
                      onOpen={() => setSelectedTaskId(task.id)}
                      onDragStart={() => setDragId(task.id)}
                      onDragEnd={() => setDragId(null)}
                      onTimerToggle={() => toggleTimer(task.id)}
                    />
                  ))}

                  {items.length === 0 && (
                    <p className="rounded-lg border border-dashed border-border px-3 py-4 text-center text-[11px] text-muted-foreground">
                      Nothing here
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageFrame>

      {/* Overlays — rendered outside the board layout so they sit above everything */}
      {createOpen && (
        <TaskForm
          members={members}
          onSuccess={handleTaskSaved}
          onClose={() => setCreateOpen(false)}
        />
      )}
      {editingTask && (
        <TaskForm
          task={editingTask}
          members={members}
          onSuccess={handleTaskSaved}
          onClose={() => setEditingTask(null)}
        />
      )}
      {selectedTaskId && (
        <TaskDetails
          taskId={selectedTaskId}
          members={members}
          onClose={() => setSelectedTaskId(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}
