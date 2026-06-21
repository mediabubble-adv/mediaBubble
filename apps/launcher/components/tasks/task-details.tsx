'use client'

import React, { useEffect, useState } from 'react'
import { Pencil, Trash2, Calendar, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton, SkeletonText } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { BoardTask, BoardMember } from './types'

const PRIORITY_TONES = {
  Low: 'neutral',
  Medium: 'blue',
  High: 'warning',
  Urgent: 'danger',
} as const satisfies Record<string, 'neutral' | 'blue' | 'warning' | 'danger'>

const STATUS_TONES = {
  Backlog: 'neutral',
  'In Progress': 'blue',
  Review: 'warning',
  Done: 'success',
} as const satisfies Record<string, 'neutral' | 'blue' | 'warning' | 'success'>

interface TaskDetailsProps {
  taskId: string
  members: BoardMember[]
  onClose: () => void
  onEdit: (task: BoardTask) => void
  onDelete: (taskId: string) => void
}

export function TaskDetails({ taskId, members, onClose, onEdit, onDelete }: TaskDetailsProps) {
  const [open, setOpen] = useState(true)
  const [task, setTask] = useState<BoardTask | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Fetch full task on mount
  useEffect(() => {
    setLoading(true)
    fetch(`/api/tasks/${taskId}`)
      .then((r) => r.json())
      .then((j) => { if (j.data) setTask(j.data as BoardTask) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [taskId])

  function handleOpenChange(v: boolean) {
    setOpen(v)
    if (!v) onClose()
  }

  async function handleDelete() {
    if (!task || deleting) return
    setDeleting(true)
    try {
      await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' })
      onDelete(task.id)
      setOpen(false)
    } finally {
      setDeleting(false)
    }
  }

  const memberMap = new Map(members.map((m) => [m.id, m.name]))
  const assigneeName = task?.assigned_to ? (memberMap.get(task.assigned_to) ?? '—') : null
  const priorityTone = task
    ? (PRIORITY_TONES[task.priority as keyof typeof PRIORITY_TONES] ?? 'neutral')
    : 'neutral'
  const statusTone = task
    ? (STATUS_TONES[task.status as keyof typeof STATUS_TONES] ?? 'neutral')
    : 'neutral'

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-[480px]"
      >
        {/* Header */}
        <SheetHeader className="flex-row items-center justify-between border-b border-border px-5 py-4 space-y-0">
          <div className="min-w-0 flex-1 pr-4">
            <SheetTitle className="font-display truncate text-[15px] font-bold leading-none">
              {loading ? (
                <Skeleton className="h-4 w-44" />
              ) : (
                task?.title ?? 'Task not found'
              )}
            </SheetTitle>
            <SheetDescription className="sr-only">Task details panel</SheetDescription>
          </div>
          {task && !loading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { onEdit(task); setOpen(false) }}
              className="shrink-0"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          )}
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {loading ? (
            <div className="flex flex-col gap-5">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
              <SkeletonText lines={4} />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
              </div>
            </div>
          ) : task ? (
            <div className="flex flex-col gap-5">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge tone={priorityTone}>{task.priority}</Badge>
                <Badge tone={statusTone}>{task.status}</Badge>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <SectionLabel>Description</SectionLabel>
                {task.description ? (
                  <p className="mt-1.5 whitespace-pre-wrap text-[13px] leading-relaxed text-foreground">
                    {task.description}
                  </p>
                ) : (
                  <p className="mt-1 text-[13px] italic text-muted-foreground">No description</p>
                )}
              </div>

              {/* Meta row */}
              <div className="grid grid-cols-2 gap-3">
                <MetaCard icon={User} label="Assigned to">
                  {assigneeName ?? (
                    <span className="text-muted-foreground">Unassigned</span>
                  )}
                </MetaCard>
                <MetaCard icon={Calendar} label="Due date">
                  {task.due_date ?? <span className="text-muted-foreground">—</span>}
                </MetaCard>
              </div>

              {/* Tags */}
              {task.tags.length > 0 && (
                <div>
                  <SectionLabel>Tags</SectionLabel>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-card px-2 py-0.5 text-[12px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[13px] text-muted-foreground">Task not found.</p>
          )}
        </div>

        {/* Footer — delete zone */}
        {task && !loading && (
          <div className="shrink-0 border-t border-border px-5 py-4">
            {confirmDelete ? (
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] text-muted-foreground">Delete this task?</p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setConfirmDelete(false)}
                    disabled={deleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    isLoading={deleting}
                    loadingText="Deleting…"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmDelete(true)}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete task
              </Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  )
}

function MetaCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-card px-3 py-2.5">
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-2.5 w-2.5" />
        {label}
      </span>
      <span className="text-[13px] font-medium text-foreground">{children}</span>
    </div>
  )
}
