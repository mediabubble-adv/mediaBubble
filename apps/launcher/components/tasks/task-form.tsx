'use client'

import React, { useEffect, useState, type FormEvent } from 'react'
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
import type { BoardTask, BoardMember, BoardClient } from './types'

interface TaskTemplateOption {
  id: string
  name: string
  description: string | null
  default_priority: string | null
  default_tags: string[]
  subtasks: Array<{ title: string }>
}

interface TaskFormProps {
  task?: BoardTask
  members: BoardMember[]
  clients: BoardClient[]
  onSuccess: (task: BoardTask) => void
  onClose: () => void
}

export function TaskForm({ task, members, clients, onSuccess, onClose }: TaskFormProps) {
  const isEdit = !!task

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [priority, setPriority] = useState(task?.priority ?? 'Medium')
  const [status, setStatus] = useState(task?.status ?? 'Backlog')
  const [assignedTo, setAssignedTo] = useState(task?.assigned_to ?? '')
  const [assigneeIds, setAssigneeIds] = useState<string[]>(
    task?.assignees?.map((a) => a.id) ?? (task?.assigned_to ? [task.assigned_to] : []),
  )
  const [clientId, setClientId] = useState(task?.client_id ?? clients[0]?.id ?? '')
  const [dueDate, setDueDate] = useState(task?.due_date ?? '')
  const [tagsInput, setTagsInput] = useState((task?.tags ?? []).join(', '))
  const [estimatedHours, setEstimatedHours] = useState('')
  const [templateId, setTemplateId] = useState('')
  const [templates, setTemplates] = useState<TaskTemplateOption[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isEdit) return
    void fetch('/api/tasks/templates')
      .then((r) => r.json())
      .then((j) => {
        if (j.data) setTemplates(j.data as TaskTemplateOption[])
      })
      .catch(() => {})
  }, [isEdit])

  function applyTemplate(id: string) {
    setTemplateId(id)
    if (!id || id === '__none__') return
    const tpl = templates.find((t) => t.id === id)
    if (!tpl) return
    if (!description.trim() && tpl.description) setDescription(tpl.description)
    if (tpl.default_priority) setPriority(tpl.default_priority)
    if (tpl.default_tags.length > 0 && !tagsInput.trim()) {
      setTagsInput(tpl.default_tags.join(', '))
    }
  }

  const selectedTemplate = templates.find((t) => t.id === templateId)

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
      client_id: clientId || undefined,
      priority,
      status,
      assigned_to: assignedTo || undefined,
      assignee_ids: assigneeIds.length ? assigneeIds : undefined,
      due_date: dueDate || undefined,
      tags: tags.length ? tags : undefined,
      estimated_hours: estimatedHours ? parseFloat(estimatedHours) : undefined,
      template_id: !isEdit && templateId && templateId !== '__none__' ? templateId : undefined,
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
      const subs = (t.other_tasks as Array<{ status: string | null }> | undefined) ?? []
      const subtaskDone = subs.filter((s) => s.status === 'Done').length
      onSuccess({
        id: t.id,
        title: t.title,
        description: t.description ?? null,
        status: t.status ?? 'Backlog',
        priority: t.priority ?? 'Medium',
        assigned_to: t.assigned_to ?? null,
        assignees: (t.assignees as BoardTask['assignees']) ?? [],
        tags: t.tags ?? [],
        due_date: t.due_date ? String(t.due_date).slice(0, 10) : null,
        client_id: t.client_id ?? clientId ?? null,
        client_name: t.clients?.name ?? clients.find((c) => c.id === clientId)?.name ?? null,
        subtask_done: subtaskDone,
        subtask_total: subs.length,
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

          {!isEdit && templates.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Template
              </Label>
              <Select
                value={templateId || '__none__'}
                onValueChange={(v) => applyTemplate(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Start from scratch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">No template</SelectItem>
                  {templates.map((tpl) => (
                    <SelectItem key={tpl.id} value={tpl.id}>
                      {tpl.name}
                      {tpl.subtasks.length > 0 ? ` (${tpl.subtasks.length} subtasks)` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTemplate && selectedTemplate.subtasks.length > 0 && (
                <ul className="mt-1 space-y-0.5 rounded-lg border border-border bg-muted/20 px-3 py-2 text-[12px] text-muted-foreground">
                  {selectedTemplate.subtasks.map((s) => (
                    <li key={s.title}>· {s.title}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!isEdit && clients.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Client <span className="text-destructive">*</span>
              </Label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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

          <div className="flex flex-col gap-1.5">
            <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Assignees
            </Label>
            <div className="max-h-32 space-y-1 overflow-y-auto rounded-lg border border-border p-2">
              {members.map((m) => {
                const checked = assigneeIds.includes(m.id)
                return (
                  <label
                    key={m.id}
                    className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-[12px] hover:bg-muted/40"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setAssigneeIds((prev) => {
                          const next = checked
                            ? prev.filter((id) => id !== m.id)
                            : [...prev, m.id]
                          setAssignedTo(next[0] ?? '')
                          return next
                        })
                      }}
                    />
                    {m.name}
                  </label>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
