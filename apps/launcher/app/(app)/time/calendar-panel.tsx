'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Link2 } from 'lucide-react'
import { buildWeekColumns, shiftWeek } from '@/lib/time/calendar'
import { weekStart, weekEnd } from '@/lib/time/kpis'
import type { DashboardTimeEntry } from './time-dashboard'
import type { AvailabilityRow } from './schedule-panel'

const BLOCK_CLASS: Record<string, string> = {
  entry: 'border-brand-blue/40 bg-brand-blue/10 text-brand-text',
  available: 'border-brand-success/40 bg-brand-success/10 text-brand-success',
  busy: 'border-brand-warning/40 bg-brand-warning/10 text-brand-warning',
  leave: 'border-brand-error/40 bg-brand-error/10 text-brand-error',
}

export function CalendarPanel({
  entries,
  availability,
  googleConfigured,
}: {
  entries: DashboardTimeEntry[]
  availability: AvailabilityRow[]
  googleConfigured: boolean
}) {
  const [weekAnchor, setWeekAnchor] = useState(() => new Date())

  const columns = useMemo(
    () =>
      buildWeekColumns(
        weekAnchor,
        entries.map((e) => ({
          id: e.id,
          date: e.date,
          start_time: e.start_time,
          end_time: e.end_time,
          description: e.description,
          taskTitle: e.task?.title ?? null,
        })),
        availability,
      ),
    [weekAnchor, entries, availability],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWeekAnchor(new Date(`${shiftWeek(weekAnchor, -1)}T00:00:00.000Z`))}
            className="rounded-lg border border-brand-whisper-border p-2 text-brand-text-muted hover:text-brand-text active:scale-[0.98]"
            aria-label="Previous week"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[13px] font-bold text-brand-text" dir="ltr">
            {weekStart(weekAnchor)} → {weekEnd(weekAnchor)}
          </span>
          <button
            type="button"
            onClick={() => setWeekAnchor(new Date(`${shiftWeek(weekAnchor, 1)}T00:00:00.000Z`))}
            className="rounded-lg border border-brand-whisper-border p-2 text-brand-text-muted hover:text-brand-text active:scale-[0.98]"
            aria-label="Next week"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <button
          type="button"
          disabled={!googleConfigured}
          title={
            googleConfigured
              ? 'Google Calendar sync (Phase 2 placeholder)'
              : 'Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in apps/launcher/.env.local'
          }
          className="inline-flex items-center gap-2 rounded-lg border border-brand-whisper-border px-3 py-2 text-[12px] font-bold text-brand-text-muted transition-all disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
        >
          <Link2 size={14} />
          Sync Google Calendar
        </button>
      </div>

      {!googleConfigured && (
        <p className="rounded-xl border border-dashed border-brand-whisper-border bg-brand-surface px-4 py-3 text-[12px] text-brand-text-muted">
          Google Calendar sync is a Phase 2 placeholder. Add{' '}
          <code className="text-[11px]">GOOGLE_CLIENT_ID</code> and{' '}
          <code className="text-[11px]">GOOGLE_CLIENT_SECRET</code> to enable the OAuth flow later.
        </p>
      )}

      <div className="grid gap-3 lg:grid-cols-7">
        {columns.map((col) => (
          <div
            key={col.date}
            className="min-h-[220px] rounded-2xl border border-brand-whisper-border bg-brand-surface p-3"
          >
            <div className="mb-3 border-b border-brand-whisper-border pb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
                {col.weekday}
              </p>
              <p className="text-[13px] font-bold text-brand-text" dir="ltr">
                {col.date.slice(5)}
              </p>
            </div>
            <div className="space-y-2">
              {col.blocks.length === 0 ? (
                <p className="text-[11px] text-brand-text-muted">No blocks</p>
              ) : (
                col.blocks.map((block) => (
                  <div
                    key={`${block.kind}-${block.id}`}
                    className={`rounded-lg border px-2 py-1.5 text-[11px] ${BLOCK_CLASS[block.tone] ?? BLOCK_CLASS['entry']}`}
                  >
                    <p className="font-bold" dir="ltr">
                      {block.start}–{block.end}
                    </p>
                    <p className="mt-0.5 truncate">{block.label}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
