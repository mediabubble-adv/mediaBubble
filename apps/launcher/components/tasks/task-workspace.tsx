'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Check,
  Expand,
  Loader2,
  Paperclip,
  Plus,
  Send,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { taskProgress, subtaskCounts } from '@/lib/tasks/progress'
import {
  REACTION_LABELS,
  TASK_REACTION_EMOJIS,
  summarizeReactions,
  type TaskReactionEmoji,
} from '@/lib/tasks/reactions'
import { formatActivityMessage } from '@/lib/tasks/activity'
import { parseMentionedUserIds } from '@/lib/tasks/mentions'
import { UserAvatarStack } from './user-avatar-stack'
import type { BoardMember, TaskAssignee } from './types'

interface TaskDetail {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  assigned_to: string | null
  assignees?: TaskAssignee[]
  due_date: string | null
  client_id: string | null
  clients: { id: string; name: string } | null
  other_tasks: Array<{
    id: string
    title: string
    status: string | null
    assigned_to: string | null
  }>
}

interface CommentRow {
  id: string
  parent_id: string | null
  content: string
  deleted_at: string | null
  created_at: string
  users: { id: string; name: string; avatar_url?: string | null }
  comment_attachments: Array<{
    id: string
    file_name: string
    file_url: string
    download_url?: string | null
  }>
}

interface ActivityRow {
  id: string
  type: string
  payload: Record<string, unknown>
  created_at: string
  users: { id: string; name: string; avatar_url?: string | null }
}

interface ReactionRow {
  target_type: string
  target_id: string
  emoji: string
  user_id: string
}

interface AttachmentRow {
  id: string
  file_name: string
  download_url: string | null
}

type FeedEntry =
  | { kind: 'comment'; data: CommentRow }
  | { kind: 'activity'; data: ActivityRow }

export interface TaskWorkspaceProps {
  taskId: string
  members: BoardMember[]
  currentUserId: string | null
  variant: 'panel' | 'page'
  onClose?: () => void
  onTaskUpdated?: () => void
}

export function TaskWorkspace({
  taskId,
  members,
  currentUserId,
  variant,
  onClose,
  onTaskUpdated,
}: TaskWorkspaceProps) {
  const router = useRouter()
  const [task, setTask] = useState<TaskDetail | null>(null)
  const [comments, setComments] = useState<CommentRow[]>([])
  const [activity, setActivity] = useState<ActivityRow[]>([])
  const [reactions, setReactions] = useState<ReactionRow[]>([])
  const [attachments, setAttachments] = useState<AttachmentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [newSubtask, setNewSubtask] = useState('')
  const [newSubtaskAssignee, setNewSubtaskAssignee] = useState('')
  const [pendingCommentFiles, setPendingCommentFiles] = useState<File[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [savingDesc, setSavingDesc] = useState(false)
  const [posting, setPosting] = useState(false)
  const [assigneeIds, setAssigneeIds] = useState<string[]>([])
  const [savingAssignees, setSavingAssignees] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [savingTemplate, setSavingTemplate] = useState(false)
  const [templateMessage, setTemplateMessage] = useState<string | null>(null)

  const loadAll = useCallback(async () => {
    const [taskRes, commentsRes, activityRes, attachRes] = await Promise.all([
      fetch(`/api/tasks/${taskId}`),
      fetch(`/api/tasks/${taskId}/comments`),
      fetch(`/api/tasks/${taskId}/activity`),
      fetch(`/api/tasks/${taskId}/attachments`),
    ])

    const taskJson = await taskRes.json()
    if (taskRes.ok && taskJson.data) {
      const detail = taskJson.data as TaskDetail
      setTask(detail)
      setAssigneeIds(
        detail.assignees?.map((a) => a.id) ??
          (detail.assigned_to ? [detail.assigned_to] : []),
      )
    }

    const commentsJson = await commentsRes.json()
    if (commentsRes.ok && commentsJson.data) {
      setComments(commentsJson.data.comments ?? [])
      setReactions((prev) => {
        const activityReactions = prev.filter((r) => r.target_type === 'activity')
        const commentReactions = (commentsJson.data.reactions ?? []) as ReactionRow[]
        return [...activityReactions, ...commentReactions]
      })
    }

    const activityJson = await activityRes.json()
    if (activityRes.ok && activityJson.data) {
      setActivity(activityJson.data.activity ?? [])
      setReactions((prev) => {
        const commentReactions = prev.filter((r) => r.target_type === 'comment')
        const activityReactions = (activityJson.data.reactions ?? []) as ReactionRow[]
        return [...commentReactions, ...activityReactions]
      })
    }

    const attachJson = await attachRes.json()
    if (attachRes.ok && attachJson.data) setAttachments(attachJson.data as AttachmentRow[])
  }, [taskId])

  useEffect(() => {
    setLoading(true)
    void loadAll().finally(() => setLoading(false))
  }, [loadAll])

  useEffect(() => {
    const poll = setInterval(() => {
      if (document.visibilityState === 'visible') void loadAll()
    }, 30_000)
    const onFocus = () => void loadAll()
    document.addEventListener('visibilitychange', onFocus)
    return () => {
      clearInterval(poll)
      document.removeEventListener('visibilitychange', onFocus)
    }
  }, [loadAll])

  const subtasks = task?.other_tasks ?? []
  const progress = taskProgress(subtasks.map((s) => ({ status: s.status })))
  const counts = subtaskCounts(subtasks.map((s) => ({ status: s.status })))

  const feed: FeedEntry[] = useMemo(() => {
    const items: FeedEntry[] = [
      ...comments.map((c) => ({ kind: 'comment' as const, data: c })),
      ...activity.map((a) => ({ kind: 'activity' as const, data: a })),
    ]
    return [...items].sort((a, b) => new Date(a.data.created_at).getTime() - new Date(b.data.created_at).getTime())
  }, [comments, activity])

  function reactionsFor(targetType: 'comment' | 'activity', targetId: string) {
    return summarizeReactions(
      reactions.filter((r) => r.target_type === targetType && r.target_id === targetId),
      currentUserId,
    )
  }

  async function saveAssignees(nextIds: string[]) {
    setSavingAssignees(true)
    try {
      const res = await fetch(`/api/tasks/${taskId}/assignees`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_ids: nextIds }),
      })
      if (res.ok) {
        await loadAll()
        onTaskUpdated?.()
      }
    } finally {
      setSavingAssignees(false)
    }
  }

  async function saveAsTemplate() {
    const name = templateName.trim()
    if (!name || savingTemplate) return
    setSavingTemplate(true)
    setTemplateMessage(null)
    try {
      const res = await fetch('/api/tasks/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId, name }),
      })
      const json = await res.json()
      if (res.ok) {
        setTemplateName('')
        setTemplateMessage('Template saved to your library.')
      } else {
        setTemplateMessage(json.message ?? 'Could not save template')
      }
    } finally {
      setSavingTemplate(false)
    }
  }

  async function saveDescription(description: string) {
    if (!task) return
    setSavingDesc(true)
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      if (res.ok) {
        const json = await res.json()
        setTask(json.data)
        onTaskUpdated?.()
      }
    } finally {
      setSavingDesc(false)
    }
  }

  async function toggleSubtask(subId: string, done: boolean) {
    const status = done ? 'Done' : 'Backlog'
    const prev = task
    if (task) {
      setTask({
        ...task,
        other_tasks: task.other_tasks.map((s) =>
          s.id === subId ? { ...s, status } : s,
        ),
      })
    }
    try {
      const res = await fetch(`/api/tasks/${taskId}/subtasks/${subId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok && prev) setTask(prev)
      else {
        await loadAll()
        onTaskUpdated?.()
      }
    } catch {
      if (prev) setTask(prev)
    }
  }

  async function updateSubtaskAssignee(subId: string, assignedTo: string | null) {
    const prev = task
    if (task) {
      setTask({
        ...task,
        other_tasks: task.other_tasks.map((s) =>
          s.id === subId ? { ...s, assigned_to: assignedTo } : s,
        ),
      })
    }
    try {
      const res = await fetch(`/api/tasks/${taskId}/subtasks/${subId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigned_to: assignedTo }),
      })
      if (!res.ok && prev) setTask(prev)
      else await loadAll()
    } catch {
      if (prev) setTask(prev)
    }
  }

  async function uploadFileToStorage(
    file: File,
  ): Promise<{ file_name: string; file_url: string; file_size: number; mime_type: string } | null> {
    const form = new FormData()
    form.append('file', file)
    form.append('task_id', taskId)
    const up = await fetch('/api/uploads/task-file', { method: 'POST', body: form })
    if (!up.ok) return null
    const upJson = await up.json()
    return upJson.data ?? null
  }

  async function attachFilesToComment(commentId: string, files: File[]) {
    for (const file of files) {
      const meta = await uploadFileToStorage(file)
      if (!meta) continue
      await fetch(`/api/comments/${commentId}/attachments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_name: meta.file_name,
          file_url: meta.file_url,
          file_size: meta.file_size,
          mime_type: meta.mime_type,
        }),
      })
    }
  }

  async function addSubtask() {
    const title = newSubtask.trim()
    if (!title) return
    const assignee = newSubtaskAssignee || undefined
    setNewSubtask('')
    setNewSubtaskAssignee('')
    const res = await fetch(`/api/tasks/${taskId}/subtasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, assigned_to: assignee }),
    })
    if (res.ok) {
      await loadAll()
      onTaskUpdated?.()
    }
  }

  async function postComment() {
    const content = commentText.trim()
    const files = [...pendingCommentFiles]
    if ((!content && files.length === 0) || posting) return
    setPosting(true)
    setUploadError(null)
    const bodyContent =
      content || (files.length === 1 ? `Attached ${files[0].name}` : `Attached ${files.length} files`)
    const mentioned = parseMentionedUserIds(bodyContent, members)
    const optimistic: CommentRow = {
      id: `temp-${Date.now()}`,
      parent_id: replyTo,
      content: bodyContent,
      deleted_at: null,
      created_at: new Date().toISOString(),
      users: { id: currentUserId ?? '', name: 'You' },
      comment_attachments: files.map((f, i) => ({
        id: `temp-att-${i}`,
        file_name: f.name,
        file_url: '',
      })),
    }
    setComments((c) => [...c, optimistic])
    setCommentText('')
    setPendingCommentFiles([])
    const replyParent = replyTo
    setReplyTo(null)
    try {
      const res = await fetch(`/api/tasks/${taskId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: bodyContent,
          parent_id: replyParent ?? undefined,
          mentioned_users: mentioned,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setComments((c) => c.filter((x) => x.id !== optimistic.id))
        setUploadError(json?.message ?? 'Failed to post comment')
        return
      }
      const commentId = json.data?.id as string | undefined
      if (commentId && files.length > 0) {
        await attachFilesToComment(commentId, files)
      }
      await loadAll()
    } catch {
      setComments((c) => c.filter((x) => x.id !== optimistic.id))
      setUploadError('Network error — please try again')
    } finally {
      setPosting(false)
    }
  }

  async function toggleReaction(
    targetType: 'comment' | 'activity',
    targetId: string,
    emoji: TaskReactionEmoji,
  ) {
    await fetch('/api/reactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_type: targetType, target_id: targetId, emoji }),
    })
    await loadAll()
  }

  async function uploadTaskFile(file: File) {
    setUploadError(null)
    const meta = await uploadFileToStorage(file)
    if (!meta) {
      setUploadError('Upload failed — check Supabase storage config')
      return
    }
    await fetch(`/api/tasks/${taskId}/attachments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        file_name: meta.file_name,
        file_url: meta.file_url,
        file_size: meta.file_size,
        mime_type: meta.mime_type,
      }),
    })
    await loadAll()
    onTaskUpdated?.()
  }

  if (loading && !task) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    )
  }

  if (!task) {
    return <p className="p-6 text-sm text-muted-foreground">Task not found.</p>
  }

  return (
    <div className={cn('flex h-full flex-col', variant === 'page' && 'min-h-[70vh]')}>
      <header className="shrink-0 border-b border-border px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold text-foreground text-balance">{task.title}</h2>
            {task.clients && (
              <Link
                href="/crm"
                className="mt-1 inline-flex rounded-md border border-border bg-card px-2 py-0.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
              >
                {task.clients.name}
              </Link>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {variant === 'panel' && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Expand to full page"
                onClick={() => router.push(`/tasks/${taskId}`)}
              >
                <Expand size={16} />
              </Button>
            )}
            {variant === 'panel' && onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="blue">{task.status}</Badge>
          <Badge tone="neutral">{task.priority}</Badge>
          {(task.assignees?.length ?? 0) > 0 && (
            <UserAvatarStack users={task.assignees ?? []} size="md" />
          )}
        </div>

        <div className="mt-3">
          <label className="launcher-section-label">Assignees</label>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {members.map((m) => {
              const checked = assigneeIds.includes(m.id)
              return (
                <button
                  key={m.id}
                  type="button"
                  disabled={savingAssignees}
                  onClick={() => {
                    const next = checked
                      ? assigneeIds.filter((id) => id !== m.id)
                      : [...assigneeIds, m.id]
                    setAssigneeIds(next)
                    void saveAssignees(next)
                  }}
                  className={cn(
                    'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors',
                    checked
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40',
                  )}
                >
                  {m.name.split(' ')[0]}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <Input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Template name…"
            className="max-w-xs"
          />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            isLoading={savingTemplate}
            disabled={!templateName.trim()}
            onClick={() => void saveAsTemplate()}
          >
            Save as template
          </Button>
          {templateMessage && (
            <span className="text-[11px] text-muted-foreground">{templateMessage}</span>
          )}
        </div>

        {progress !== null && (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-[11px] font-semibold text-muted-foreground">
              <span>Progress</span>
              <span className="tabular-nums">
                {counts.done}/{counts.total} subtasks · {progress}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-0 lg:flex-row">
        <section className="min-h-0 flex-1 overflow-y-auto border-b border-border p-5 lg:border-b-0 lg:border-e">
          <label className="launcher-section-label">Description</label>
          <Textarea
            className="mt-2 min-h-[100px] resize-y"
            defaultValue={task.description ?? ''}
            onBlur={(e) => {
              const v = e.target.value
              if (v !== (task.description ?? '')) void saveDescription(v)
            }}
          />
          {savingDesc && (
            <p className="mt-1 text-[11px] text-muted-foreground">Saving…</p>
          )}

          <div className="mt-6">
            <label className="launcher-section-label">Subtasks</label>
            <ul className="mt-2 space-y-2">
              {subtasks.map((s) => (
                <li key={s.id} className="flex items-center gap-2 rounded-lg border border-border px-2 py-1.5">
                  <button
                    type="button"
                    aria-label={s.status === 'Done' ? 'Mark incomplete' : 'Mark done'}
                    onClick={() => void toggleSubtask(s.id, s.status !== 'Done')}
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded border',
                      s.status === 'Done'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border',
                    )}
                  >
                    {s.status === 'Done' && <Check size={12} />}
                  </button>
                  <span
                    className={cn(
                      'min-w-0 flex-1 text-[13px]',
                      s.status === 'Done' && 'text-muted-foreground line-through',
                    )}
                  >
                    {s.title}
                  </span>
                  <Select
                    value={s.assigned_to ?? '__none__'}
                    onValueChange={(v) =>
                      void updateSubtaskAssignee(s.id, v === '__none__' ? null : v)
                    }
                  >
                    <SelectTrigger className="h-7 w-[110px] border-border text-[11px]">
                      <SelectValue placeholder="Assign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">Unassigned</SelectItem>
                      {members.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name.split(' ')[0]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Input
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Add subtask…"
                className="min-w-0 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    void addSubtask()
                  }
                }}
              />
              <Select value={newSubtaskAssignee || '__none__'} onValueChange={(v) => setNewSubtaskAssignee(v === '__none__' ? '' : v)}>
                <SelectTrigger className="h-9 w-full border-border text-[12px] sm:w-[130px]">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">Unassigned</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" size="icon" variant="secondary" onClick={() => void addSubtask()}>
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <label className="launcher-section-label">Attachments</label>
            <ul className="mt-2 space-y-1">
              {attachments.map((a) => (
                <li key={a.id}>
                  {a.download_url ? (
                    <a
                      href={a.download_url}
                      className="text-[13px] text-primary hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {a.file_name}
                    </a>
                  ) : (
                    <span className="text-[13px] text-muted-foreground">{a.file_name}</span>
                  )}
                </li>
              ))}
            </ul>
            <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-muted-foreground hover:text-foreground">
              <Paperclip size={14} />
              Attach file
              <input
                type="file"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) void uploadTaskFile(f)
                  e.target.value = ''
                }}
              />
            </label>
            {uploadError && (
              <p className="mt-2 text-[12px] text-destructive">{uploadError}</p>
            )}
          </div>
        </section>

        <section className="flex min-h-[280px] flex-1 flex-col lg:max-w-md">
          <div className="flex-1 overflow-y-auto p-5">
            <label className="launcher-section-label">Activity</label>
            <ul className="mt-3 space-y-4">
              {feed.map((entry) => {
                if (entry.kind === 'activity') {
                  const a = entry.data
                  const summary = reactionsFor('activity', a.id)
                  return (
                    <li key={`a-${a.id}`} className="text-[12px] text-muted-foreground">
                      <p>
                        {formatActivityMessage(a.type, a.payload, a.users.name)}
                        <span className="ms-2 text-[10px] opacity-60">
                          {new Date(a.created_at).toLocaleString()}
                        </span>
                      </p>
                      <ReactionBar
                        summary={summary}
                        onPick={(emoji) => void toggleReaction('activity', a.id, emoji)}
                      />
                    </li>
                  )
                }

                const c = entry.data
                const summary = reactionsFor('comment', c.id)
                return (
                  <li
                    key={`c-${c.id}`}
                    className={cn('rounded-lg border border-border bg-card p-3', c.parent_id && 'ms-4')}
                  >
                    <div className="flex items-center gap-2">
                      <UserAvatarStack
                        users={[
                          {
                            id: c.users.id,
                            name: c.users.name,
                            avatar_url: c.users.avatar_url ?? null,
                          },
                        ]}
                      />
                      <p className="text-[11px] font-bold text-foreground">{c.users.name}</p>
                    </div>
                    <p className="mt-1 text-[13px] text-foreground">
                      {c.deleted_at ? '[deleted]' : c.content}
                    </p>
                    {c.comment_attachments.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {c.comment_attachments.map((att) => (
                          <li key={att.id}>
                            {att.download_url ? (
                              <a
                                href={att.download_url}
                                className="text-[12px] text-primary hover:underline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {att.file_name}
                              </a>
                            ) : (
                              <span className="text-[12px] text-muted-foreground">{att.file_name}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        className="text-[11px] font-semibold text-primary"
                        onClick={() => setReplyTo(c.id)}
                      >
                        Reply
                      </button>
                      <ReactionBar
                        summary={summary}
                        onPick={(emoji) => void toggleReaction('comment', c.id, emoji)}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <footer className="shrink-0 border-t border-border p-4">
            {replyTo && (
              <p className="mb-2 text-[11px] text-muted-foreground">
                Replying…{' '}
                <button type="button" className="text-primary" onClick={() => setReplyTo(null)}>
                  Cancel
                </button>
              </p>
            )}
            {pendingCommentFiles.length > 0 && (
              <ul className="mb-2 flex flex-wrap gap-1.5">
                {pendingCommentFiles.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[11px]"
                  >
                    <Paperclip size={11} />
                    <span className="max-w-[140px] truncate">{file.name}</span>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={`Remove ${file.name}`}
                      onClick={() =>
                        setPendingCommentFiles((files) => files.filter((_, i) => i !== index))
                      }
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {uploadError && (
              <p className="mb-2 text-[12px] text-destructive">{uploadError}</p>
            )}
            <div className="flex gap-2">
              <Textarea
                rows={2}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment… Use @Name to mention"
                className="min-h-0 flex-1 resize-none"
              />
              <div className="flex flex-col gap-1">
                <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground">
                  <Paperclip size={16} />
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setPendingCommentFiles((prev) => [...prev, file])
                      e.target.value = ''
                    }}
                  />
                </label>
                <Button
                  size="icon"
                  onClick={() => void postComment()}
                  disabled={posting || (!commentText.trim() && pendingCommentFiles.length === 0)}
                  aria-label="Post comment"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  )
}

function ReactionBar({
  summary,
  onPick,
}: {
  summary: ReturnType<typeof summarizeReactions>
  onPick: (emoji: TaskReactionEmoji) => void
}) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-1">
      {summary.map((r) => (
        <button
          key={r.emoji}
          type="button"
          onClick={() => onPick(r.emoji)}
          className={cn(
            'rounded-full border px-1.5 py-0.5 text-[11px]',
            r.includesMe ? 'border-primary/50 bg-primary/10' : 'border-border',
          )}
        >
          {REACTION_LABELS[r.emoji]} {r.count}
        </button>
      ))}
      <details className="relative">
        <summary className="cursor-pointer list-none rounded-full border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground">
          +
        </summary>
        <div className="absolute bottom-full z-10 mb-1 flex gap-0.5 rounded-lg border border-border bg-card p-1 shadow-none">
          {TASK_REACTION_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className="rounded p-1 hover:bg-muted"
              onClick={() => onPick(emoji)}
            >
              {REACTION_LABELS[emoji]}
            </button>
          ))}
        </div>
      </details>
    </div>
  )
}
