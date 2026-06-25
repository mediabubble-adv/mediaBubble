'use client'

import { useCallback, useState, type CSSProperties, type FormEvent } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckSquare,
  Hash,
  Pin,
  StickyNote,
  Trash2,
  Zap,
} from 'lucide-react'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { segmentNoteContent } from '@/lib/dashboard/mentions'
import type { DashboardTaskRow, TodayTaskProgress } from '@/lib/dashboard/tasks'
import { useToast } from '@/components/ui/toast'

export interface DashboardNote {
  id: string
  content: string
  created_at: string
}

export interface TeamMember {
  id: string
  name: string
}

export interface DashboardSubtaskGroup {
  parentId: string
  label: string
  status: string
  subtaskCount: number
}

export interface DashboardViewProps {
  firstName: string
  nextTasks: DashboardTaskRow[]
  subtaskGroups: DashboardSubtaskGroup[]
  todayProgress: TodayTaskProgress
  recentTags: string[]
  notes: DashboardNote[]
  members: TeamMember[]
}

const PRIORITY_TONE: Record<string, 'neutral' | 'blue' | 'warning' | 'danger'> = {
  Low: 'neutral',
  Medium: 'blue',
  High: 'warning',
  Urgent: 'danger',
}

const STATUS_TONE: Record<string, 'neutral' | 'blue' | 'warning' | 'success'> = {
  Backlog: 'neutral',
  'In Progress': 'blue',
  Review: 'warning',
  Done: 'success',
}

function ProgressRing({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : value > 0 ? 100 : 0
  const r = 30
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c

  return (
    <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center">
      <svg className="-rotate-90" width="72" height="72" viewBox="0 0 72 72" aria-hidden>
        <circle cx="36" cy="36" r={r} fill="none" stroke="currentColor" className="text-border" strokeWidth="5" />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-primary transition-[stroke-dashoffset] duration-500 ease-[var(--ease-out)]"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute font-mono text-[13px] font-semibold tabular-nums text-foreground">{pct}%</span>
    </div>
  )
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return <p className="launcher-section-label">{children}</p>
}

function formatNoteTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function DashboardView({
  firstName,
  nextTasks,
  subtaskGroups,
  todayProgress,
  recentTags,
  notes: initialNotes,
  members,
}: DashboardViewProps) {
  const { toast } = useToast()
  const [notes, setNotes] = useState(initialNotes)
  const [noteDraft, setNoteDraft] = useState('')
  const [notePending, setNotePending] = useState(false)

  const todayLabel =
    todayProgress.dueTodayTotal > 0
      ? `${todayProgress.dueTodayDone} of ${todayProgress.dueTodayTotal} due today`
      : `${todayProgress.completedToday} completed today`

  async function submitNote(e: FormEvent) {
    e.preventDefault()
    const content = noteDraft.trim()
    if (!content || notePending) return
    setNotePending(true)
    try {
      const res = await fetch('/api/dashboard/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      const json = await res.json()
      if (res.ok && json.data) {
        setNotes((prev) => [json.data, ...prev])
        setNoteDraft('')
      } else {
        toast('error', json.message ?? 'Could not save note')
      }
    } catch {
      toast('error', 'Network error. Try again.')
    } finally {
      setNotePending(false)
    }
  }

  async function deleteNote(id: string) {
    const res = await fetch(`/api/dashboard/notes/${id}`, { method: 'DELETE' })
    if (res.ok) setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const insertMention = useCallback((name: string) => {
    setNoteDraft((d) => (d.endsWith(' ') || d.length === 0 ? `${d}@${name} ` : `${d} @${name} `))
  }, [])

  const hasTags = recentTags.length > 0

  return (
    <PageFrame>
      <PageHeader
        kicker="Your workspace"
        title={`Good to see you, ${firstName}`}
        description="Tasks and notes for today."
        icon={Zap}
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/tasks">
              <CheckSquare size={14} />
              Open tasks
            </Link>
          </Button>
        }
      />

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link href="/tasks" className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <Card className="launcher-surface launcher-surface-interactive h-full">
            <CardContent className="flex items-center gap-6 p-7">
            <ProgressRing
              value={todayProgress.dueTodayDone}
              max={todayProgress.dueTodayTotal || todayProgress.completedToday || 1}
            />
            <div className="min-w-0">
              <PanelLabel>Today&apos;s progress</PanelLabel>
              <p className="mt-1.5 font-display text-xl font-bold tracking-tight text-foreground">{todayLabel}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                <span className="font-tabular font-medium text-foreground">{todayProgress.activeAssigned}</span>{' '}
                active assigned
              </p>
            </div>
          </CardContent>
          </Card>
        </Link>

        <Card className="launcher-surface h-full">
          <CardContent className="flex h-full flex-col justify-center p-7">
            <PanelLabel>Recent tags</PanelLabel>
            {hasTags ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {recentTags.map((tag) => (
                  <Link key={tag} href="/tasks">
                    <Badge
                      tone="neutral"
                      className="gap-1 transition-[border-color,color] duration-150 hover:border-primary/40 hover:text-primary"
                    >
                      <Hash size={10} />
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                Tags from your assigned tasks show up here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_min(360px,32%)]">
        <Card className="launcher-surface overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border px-7 py-5">
            <div>
              <CardTitle className="flex items-center gap-2 text-[15px] font-semibold">
                <Pin size={15} className="text-primary" aria-hidden />
                Next steps
              </CardTitle>
            </div>
            <Link
              href="/tasks"
              className="rounded-md text-[12px] font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {nextTasks.length > 0 || subtaskGroups.length > 0 ? (
              <ul data-stagger>
                {subtaskGroups.map((group, i) => (
                  <li
                    key={group.parentId}
                    style={{ '--i': i } as CSSProperties}
                    className="border-b border-border/60 last:border-0"
                  >
                    <Link
                      href={`/tasks?task=${group.parentId}`}
                      className="group flex items-start gap-3 px-7 py-4 transition-[background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:outline-none active:scale-[0.995]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-foreground group-hover:text-primary">
                          {group.label}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <Badge tone={STATUS_TONE[group.status] ?? 'neutral'}>{group.status}</Badge>
                          <Badge tone="neutral">{group.subtaskCount} open</Badge>
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        className="mt-1 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </Link>
                  </li>
                ))}
                {nextTasks.map((task, i) => (
                  <li
                    key={task.id}
                    style={{ '--i': i + subtaskGroups.length } as CSSProperties}
                    className="border-b border-border/60 last:border-0"
                  >
                    <Link
                      href={`/tasks?task=${task.id}`}
                      className="group flex items-start gap-3 px-7 py-4 transition-[background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:outline-none active:scale-[0.995]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-foreground group-hover:text-primary">
                          {task.title}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <Badge tone={STATUS_TONE[task.status] ?? 'neutral'}>{task.status}</Badge>
                          <Badge tone={PRIORITY_TONE[task.priority] ?? 'neutral'}>{task.priority}</Badge>
                          {task.due_date ? (
                            <span className="font-mono text-[11px] tabular-nums text-muted-foreground" dir="ltr">
                              Due {task.due_date}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        className="mt-1 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8">
                <EmptyState
                  icon={CheckSquare}
                  title="No open tasks"
                  description="When something is assigned to you, it lands here first."
                  href={{ label: 'Go to task board', href: '/tasks' }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="launcher-surface flex flex-col">
          <CardHeader className="border-b border-border px-7 py-5">
            <CardTitle className="flex items-center gap-2 text-[15px] font-semibold">
              <StickyNote size={15} className="text-primary" aria-hidden />
              Notes
            </CardTitle>
            <CardDescription className="mt-1">Mention teammates with @Name.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-5 p-7">
            <form onSubmit={submitNote} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dashboard-note">New note</Label>
                <Textarea
                  id="dashboard-note"
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Standup reminder, link, or handoff…"
                  rows={3}
                />
              </div>
              {members.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {members.slice(0, 6).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => insertMention(m.name)}
                      className="min-h-8 rounded-md border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-[border-color,color,transform] duration-150 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.97]"
                    >
                      @{m.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              ) : null}
              <Button type="submit" size="sm" isLoading={notePending} disabled={!noteDraft.trim()}>
                Save note
              </Button>
            </form>

            {notes.length > 0 ? (
              <ul className="max-h-[320px] flex-1 space-y-3 overflow-y-auto pe-1">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="group rounded-lg border border-border bg-muted/15 p-3.5 transition-[border-color] duration-150 hover:border-primary/25 focus-within:border-primary/25"
                  >
                    <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-foreground">
                      {segmentNoteContent(note.content, members).map((seg, i) =>
                        seg.type === 'mention' ? (
                          <span key={i} className="font-semibold text-primary">
                            @{seg.value}
                          </span>
                        ) : (
                          <span key={i}>{seg.value}</span>
                        ),
                      )}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <time
                        className="font-mono text-[11px] tabular-nums text-muted-foreground"
                        dateTime={note.created_at}
                      >
                        {formatNoteTime(note.created_at)}
                      </time>
                      <button
                        type="button"
                        onClick={() => deleteNote(note.id)}
                        className="min-h-8 min-w-8 rounded p-1.5 text-muted-foreground opacity-100 transition-[color,transform] duration-150 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 active:scale-95"
                        aria-label="Delete note"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={StickyNote}
                title="No notes yet"
                description="Jot standup reminders, links, or handoffs. They stay private to you."
                className="py-8"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </PageFrame>
  )
}
