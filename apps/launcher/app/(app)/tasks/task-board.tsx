'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { Plus, CheckSquare, Search, User, Users, Inbox } from 'lucide-react'
import { TASK_STATUSES, type TaskStatus } from '@/lib/tasks/status'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { TaskCard } from '@/components/tasks/task-card'
import { TaskForm } from '@/components/tasks/task-form'
import { TaskPanel } from '@/components/tasks/task-panel'
import type { BoardTask, BoardMember, BoardClient } from '@/components/tasks/types'
import { cn } from '@/lib/utils'

export type { BoardTask, BoardMember, BoardClient }

type AssigneeFilter = 'all' | 'mine' | 'unassigned'

const FILTER_OPTIONS: { id: AssigneeFilter; label: string; icon: typeof Users }[] = [
  { id: 'all', label: 'All', icon: Users },
  { id: 'mine', label: 'My tasks', icon: User },
  { id: 'unassigned', label: 'Unassigned', icon: Inbox },
]

export function TaskBoard({
  initialTasks,
  members,
  clients,
  currentUserId,
}: {
  initialTasks: BoardTask[]
  members: BoardMember[]
  clients: BoardClient[]
  currentUserId: string | null
}) {
  const searchParams = useSearchParams()
  const [tasks, setTasks] = useState<BoardTask[]>(initialTasks)
  const [assigneeFilter, setAssigneeFilter] = useState<AssigneeFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
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

  useEffect(() => {
    const taskParam = searchParams.get('task')
    if (taskParam) setSelectedTaskId(taskParam)
  }, [searchParams])

  function mapApiTask(t: Record<string, unknown>): BoardTask {
    const subs = (t['other_tasks'] as Array<{ status: string | null }> | undefined) ?? []
    const done = subs.filter((s) => s.status === 'Done').length
    const assignees =
      (t['assignees'] as BoardTask['assignees'] | undefined) ??
      []
    return {
      id: String(t['id']),
      title: String(t['title']),
      description: (t['description'] as string | null) ?? null,
      status: String(t['status'] ?? 'Backlog'),
      priority: String(t['priority'] ?? 'Medium'),
      assigned_to: (t['assigned_to'] as string | null) ?? null,
      assignees,
      tags: (t['tags'] as string[]) ?? [],
      due_date: t['due_date'] ? String(t['due_date']).slice(0, 10) : null,
      client_id: (t['client_id'] as string | null) ?? null,
      client_name: (t['clients'] as { name: string } | null)?.name ?? null,
      subtask_done: done,
      subtask_total: subs.length,
    }
  }

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
        setTasks((ts) => [mapApiTask(t as Record<string, unknown>), ...ts])
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

  function refreshBoard() {
    void fetch('/api/tasks')
      .then((r) => r.json())
      .then((j) => {
        if (!j.data) return
        setTasks((j.data as Array<Record<string, unknown>>).map(mapApiTask))
      })
      .catch(() => {})
  }

  const visibleTasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return tasks.filter((task) => {
      if (assigneeFilter === 'mine' && currentUserId) {
        const onTask =
          task.assigned_to === currentUserId ||
          task.assignees.some((a) => a.id === currentUserId)
        if (!onTask) return false
      } else if (assigneeFilter === 'unassigned') {
        if (task.assigned_to || task.assignees.length > 0) return false
      }

      if (!q) return true
      const haystack = [task.title, task.description ?? '', ...task.tags].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [tasks, assigneeFilter, searchQuery, currentUserId])

  const filteredCount = visibleTasks.length
  const totalCount = tasks.length

  const columns = TASK_STATUSES.map((status) => ({
    status,
    items: visibleTasks.filter((t) => t.status === status),
  }))

  return (
    <>
      <PageFrame width="full">
        <PageHeader
          title="Tasks"
          description={
            filteredCount === totalCount
              ? `${totalCount} task${totalCount === 1 ? '' : 's'} · drag between columns`
              : `${filteredCount} of ${totalCount} tasks · drag between columns`
          }
          icon={CheckSquare}
          actions={
            <Button onClick={() => setCreateOpen(true)}>
              <Plus size={15} />
              New task
            </Button>
          }
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {FILTER_OPTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setAssigneeFilter(id)}
                disabled={id === 'mine' && !currentUserId}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition-[border-color,background-color,color] duration-150',
                  assigneeFilter === id
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground',
                  id === 'mine' && !currentUserId && 'cursor-not-allowed opacity-50',
                )}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={14}
              className="pointer-events-none absolute start-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks…"
              aria-label="Search tasks"
              className="ps-8"
            />
          </div>
        </div>

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
                      {filteredCount === 0 && totalCount > 0
                        ? 'No tasks match your filters'
                        : 'Nothing here'}
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
          clients={clients}
          onSuccess={handleTaskSaved}
          onClose={() => setCreateOpen(false)}
        />
      )}
      {editingTask && (
        <TaskForm
          task={editingTask}
          members={members}
          clients={clients}
          onSuccess={handleTaskSaved}
          onClose={() => setEditingTask(null)}
        />
      )}
      {selectedTaskId && (
        <TaskPanel
          taskId={selectedTaskId}
          members={members}
          currentUserId={currentUserId}
          onClose={() => setSelectedTaskId(null)}
          onTaskUpdated={refreshBoard}
        />
      )}
    </>
  )
}
