'use client'

import { useState } from 'react'
import { Check, Users, X } from 'lucide-react'
import { formatDuration } from '@/lib/time/kpis'
import type { CapacitySnapshot } from '@/lib/time/capacity'

export interface TeamTimeEntry {
  id: string
  date: string
  start_time: string
  end_time: string
  duration_minutes: number | null
  description: string | null
  billable: boolean | null
  status: string | null
  employee: { id: string; name: string; email: string }
  task: { id: string; title: string } | null
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
}

export function TeamPanel({
  initialPending,
  teamCapacity,
}: {
  initialPending: TeamTimeEntry[]
  teamCapacity: CapacitySnapshot[]
}) {
  const [pending, setPending] = useState(initialPending)
  const [reviewingId, setReviewingId] = useState<string | null>(null)

  async function reviewEntry(id: string, status: 'Approved' | 'Rejected') {
    setReviewingId(id)
    try {
      const res = await fetch(`/api/time/entries/${id}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) return
      setPending((cur) => cur.filter((e) => e.id !== id))
    } finally {
      setReviewingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-[#CA8A04]" />
          <h2 className="text-[14px] font-bold text-foreground">Pending timesheet approvals</h2>
          <span className="rounded-md bg-[#CA8A04]/15 px-2 py-0.5 text-[11px] font-bold text-[#CA8A04]">
            {pending.length}
          </span>
        </div>
        {pending.length === 0 ? (
          <p className="mt-4 text-[13px] text-muted-foreground">No submitted time entries awaiting review.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-3 py-2 font-bold">Employee</th>
                  <th className="px-3 py-2 font-bold">Date</th>
                  <th className="px-3 py-2 font-bold">Duration</th>
                  <th className="px-3 py-2 font-bold">Task</th>
                  <th className="px-3 py-2 font-bold">Note</th>
                  <th className="px-3 py-2 font-bold" />
                </tr>
              </thead>
              <tbody>
                {pending.map((row) => (
                  <tr key={row.id} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-3 text-foreground">{row.employee.name}</td>
                    <td className="px-3 py-3 text-foreground" dir="ltr">
                      {row.date}
                    </td>
                    <td className="px-3 py-3 text-foreground" dir="ltr">
                      {formatDuration(row.duration_minutes ?? 0)} ({formatTime(row.start_time)}–
                      {formatTime(row.end_time)})
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{row.task?.title ?? '—'}</td>
                    <td className="max-w-xs truncate px-3 py-3 text-muted-foreground">
                      {row.description ?? '—'}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={reviewingId === row.id}
                          onClick={() => reviewEntry(row.id, 'Approved')}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#16A34A]/15 px-2.5 py-1.5 text-[12px] font-bold text-[#16A34A] active:scale-[0.98] disabled:opacity-50"
                        >
                          <Check size={12} />
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={reviewingId === row.id}
                          onClick={() => reviewEntry(row.id, 'Rejected')}
                          className="inline-flex items-center gap-1 rounded-lg bg-destructive/15 px-2.5 py-1.5 text-[12px] font-bold text-destructive active:scale-[0.98] disabled:opacity-50"
                        >
                          <X size={12} />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="overflow-x-auto rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-[14px] font-bold text-foreground">Team capacity snapshot</h2>
        </div>
        <table className="min-w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-bold">Member</th>
              <th className="px-4 py-3 font-bold">Logged</th>
              <th className="px-4 py-3 font-bold">Utilization</th>
            </tr>
          </thead>
          <tbody>
            {teamCapacity.map((row) => (
              <tr key={row.user_id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 text-foreground">{row.user_name}</td>
                <td className="px-4 py-3 text-foreground" dir="ltr">
                  {row.logged_hours}h
                </td>
                <td className="px-4 py-3 font-semibold text-foreground" dir="ltr">
                  {row.utilization_percent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
