'use client'

import { Play, Square } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { BoardTask, BoardMember } from './types'

const PRIORITY_TONES = {
  Low: 'neutral',
  Medium: 'blue',
  High: 'warning',
  Urgent: 'danger',
} as const satisfies Record<string, 'neutral' | 'blue' | 'warning' | 'danger'>

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

function formatElapsed(ms: number) {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

interface TaskCardProps {
  task: BoardTask
  memberName: (id: string | null) => string | null
  timerStart: number | undefined
  isDragging: boolean
  onOpen: () => void
  onDragStart: () => void
  onDragEnd: () => void
  onTimerToggle: () => void
}

export function TaskCard({
  task,
  memberName,
  timerStart,
  isDragging,
  onOpen,
  onDragStart,
  onDragEnd,
  onTimerToggle,
}: TaskCardProps) {
  const assignee = memberName(task.assigned_to)
  const tone = PRIORITY_TONES[task.priority as keyof typeof PRIORITY_TONES] ?? 'neutral'

  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onOpen}
      className={cn(
        'cursor-pointer rounded-xl border border-brand-whisper-border bg-brand-canvas p-3',
        'transition-[transform,border-color,opacity] duration-150 ease-[var(--ease-out)]',
        'hover:border-brand-blue/40 hover:-translate-y-px',
        'active:cursor-grabbing active:scale-[0.98]',
        isDragging && 'opacity-50',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-semibold leading-snug text-brand-text">{task.title}</p>
        <Badge tone={tone} className="shrink-0">
          {task.priority}
        </Badge>
      </div>

      {task.description && (
        <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-brand-text-muted">
          {task.description}
        </p>
      )}

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
          onClick={(e) => {
            e.stopPropagation()
            onTimerToggle()
          }}
          aria-label={timerStart ? 'Stop timer' : 'Start timer'}
          className={cn(
            'flex items-center gap-1 rounded-lg px-1.5 py-1 text-[11px] font-semibold',
            'transition-[background-color,color,transform] duration-150 ease-[var(--ease-out)]',
            'active:scale-[0.95]',
            timerStart
              ? 'bg-brand-error/15 text-brand-error'
              : 'text-brand-text-muted hover:text-brand-blue',
          )}
        >
          {timerStart ? (
            <>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-error" />
              <span className="tabular-nums" dir="ltr">
                {formatElapsed(Date.now() - timerStart)}
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
}
