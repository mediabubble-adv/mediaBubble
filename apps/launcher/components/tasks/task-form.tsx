'use client'

import React, { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TASK_STATUSES } from '@/lib/tasks/status'
import { TASK_PRIORITIES } from '@/lib/tasks/schemas'
import type { BoardTask, BoardMember } from './types'

interface TaskFormProps {
  task?: BoardTask
  members: BoardMember[]
  onSuccess: (task: BoardTask) => void
  onClose: () => void
}

export function TaskForm({ task, members, onSuccess, onClose }: TaskFormProps) {
  const isEdit = !!task

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [priority, setPriority] = useState(task?.priority ?? 'Medium')
  const [status, setStatus] = useState(task?.status ?? 'Backlog')
  const [assignedTo, setAssignedTo] = useState(task?.assigned_to ?? '')
  const [dueDate, setDueDate] = useState(task?.due_date ?? '')
  const [tagsInput, setTagsInput] = useState((task?.tags ?? []).join(', '))
  const [estimatedHours, setEstimatedHours] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title.trim() || saving) return
    setSaving(true)
    setError(null)

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const body: Record<string, unknown> = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status,
      assigned_to: assignedTo || undefined,
      due_date: dueDate || undefined,
      tags: tags.length ? tags : undefined,
      estimated_hours: estimatedHours ? parseFloat(estimatedHours) : undefined,
    }
    for (const k of Object.keys(body)) {
      if (body[k] === undefined) delete body[k]
    }

    try {
      const url = isEdit ? `/api/tasks/${task!.id}` : '/api/tasks'
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.message ?? 'Something went wrong')
        return
      }
      const t = json.data
      onSuccess({
        id: t.id,
        title: t.title,
        description: t.description ?? null,
        status: t.status ?? 'Backlog',
        priority: t.priority ?? 'Medium',
        assigned_to: t.assigned_to ?? null,
        tags: t.tags ?? [],
        due_date: t.due_date ? String(t.due_date).slice(0, 10) : null,
      })
    } catch {
      setError('Network error — please try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-base font-bold">
            {isEdit ? 'Edit task' : 'New task'}
          </DialogTitle>
        </DialogHeader>

        <form id="task-form" onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-title" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="task-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-desc" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Description
            </Label>
            <Textarea
              id="task-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more detail…"
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Priority
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Assignee */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Assigned to
              </Label>
              <Select value={assignedTo || '__none__'} onValueChange={(v) => setAssignedTo(v === '__none__' ? '' : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">— Unassigned —</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Due date */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-due" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Due date
              </Label>
              <Input
                id="task-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tags */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-tags" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Tags <span className="font-normal normal-case tracking-normal text-muted-foreground/60">(comma-sep)</span>
              </Label>
              <Input
                id="task-tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="design, bug"
              />
            </div>
            {/* Estimated hours */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-hours" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Est. hours
              </Label>
              <Input
                id="task-hours"
                type="number"
                min="0"
                step="0.5"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
                placeholder="0.0"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-[13px] text-destructive">
              {error}
            </p>
          )}
        </form>

        <DialogFooter>
          <Button variant="secondary" size="sm" type="button" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button size="sm" type="submit" form="task-form" isLoading={saving} loadingText="Saving…">
            {isEdit ? 'Save changes' : 'Create task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
