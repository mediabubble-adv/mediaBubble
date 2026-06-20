'use client'

import { useState, type FormEvent } from 'react'
import { CalendarOff, Check, X } from 'lucide-react'
import { LEAVE_TYPES, type LEAVE_STATUSES } from '@/lib/time/leave-schemas'

export interface LeaveRequestRow {
  id: string
  type: string
  start_date: string
  end_date: string
  reason: string | null
  status: string | null
  created_at: string
  employee: { id: string; name: string; email: string }
  approver: { id: string; name: string } | null
}

const STATUS_STYLES: Record<string, string> = {
  Pending: 'bg-brand-warning/15 text-brand-warning',
  Approved: 'bg-brand-success/15 text-brand-success',
  Rejected: 'bg-brand-error/15 text-brand-error',
}

export function LeavePanel({
  initialMine,
  initialPending,
  canReview,
}: {
  initialMine: LeaveRequestRow[]
  initialPending: LeaveRequestRow[]
  canReview: boolean
}) {
  const [mine, setMine] = useState(initialMine)
  const [pending, setPending] = useState(initialPending)
  const [submitting, setSubmitting] = useState(false)
  const [reviewingId, setReviewingId] = useState<string | null>(null)

  async function submitLeave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    const form = e.currentTarget
    const data = new FormData(form)
    const type = String(data.get('type') ?? '')
    const start_date = String(data.get('start_date') ?? '')
    const end_date = String(data.get('end_date') ?? '')
    const reason = String(data.get('reason') ?? '').trim()

    if (!type || !start_date || !end_date) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/time/leave-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          start_date,
          end_date,
          reason: reason || undefined,
        }),
      })
      const json = await res.json()
      if (!res.ok) return
      const row = json.data
      setMine((prev) => [
        {
          id: row.id,
          type: row.type,
          start_date: row.start_date.slice(0, 10),
          end_date: row.end_date.slice(0, 10),
          reason: row.reason,
          status: row.status,
          created_at: row.created_at,
          employee: row.users_leave_requests_user_idTousers,
          approver: row.users_leave_requests_approver_idTousers,
        },
        ...prev,
      ])
      form.reset()
    } finally {
      setSubmitting(false)
    }
  }

  async function cancelLeave(id: string) {
    const prev = mine
    setMine((cur) => cur.filter((r) => r.id !== id))
    try {
      const res = await fetch(`/api/time/leave-requests/${id}`, { method: 'DELETE' })
      if (!res.ok) setMine(prev)
    } catch {
      setMine(prev)
    }
  }

  async function reviewLeave(id: string, status: (typeof LEAVE_STATUSES)[number]) {
    setReviewingId(id)
    try {
      const res = await fetch(`/api/time/leave-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const json = await res.json()
      if (!res.ok) return
      setPending((cur) => cur.filter((r) => r.id !== id))
      setMine((cur) =>
        cur.map((r) =>
          r.id === id
            ? {
                ...r,
                status,
                approver: json.data.users_leave_requests_approver_idTousers,
              }
            : r,
        ),
      )
    } finally {
      setReviewingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {canReview && (
        <section className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-4">
          <div className="flex items-center gap-2">
            <CalendarOff size={16} className="text-brand-warning" />
            <h2 className="text-[14px] font-bold text-brand-text">Pending approvals</h2>
            <span className="rounded-md bg-brand-warning/15 px-2 py-0.5 text-[11px] font-bold text-brand-warning">
              {pending.length}
            </span>
          </div>
          {pending.length === 0 ? (
            <p className="mt-4 text-[13px] text-brand-text-muted">No pending leave requests.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-brand-whisper-border text-[11px] uppercase tracking-wider text-brand-text-muted">
                    <th className="px-3 py-2 font-bold">Employee</th>
                    <th className="px-3 py-2 font-bold">Type</th>
                    <th className="px-3 py-2 font-bold">Dates</th>
                    <th className="px-3 py-2 font-bold">Reason</th>
                    <th className="px-3 py-2 font-bold" />
                  </tr>
                </thead>
                <tbody>
                  {pending.map((row) => (
                    <tr key={row.id} className="border-b border-brand-whisper-border/60 last:border-0">
                      <td className="px-3 py-3 text-brand-text">{row.employee.name}</td>
                      <td className="px-3 py-3 text-brand-text-muted">{row.type}</td>
                      <td className="px-3 py-3 text-brand-text" dir="ltr">
                        {row.start_date} → {row.end_date}
                      </td>
                      <td className="max-w-xs truncate px-3 py-3 text-brand-text-muted">
                        {row.reason ?? '—'}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={reviewingId === row.id}
                            onClick={() => reviewLeave(row.id, 'Approved')}
                            className="inline-flex items-center gap-1 rounded-lg bg-brand-success/15 px-2.5 py-1.5 text-[12px] font-bold text-brand-success transition-all active:scale-[0.98] disabled:opacity-50"
                          >
                            <Check size={12} />
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={reviewingId === row.id}
                            onClick={() => reviewLeave(row.id, 'Rejected')}
                            className="inline-flex items-center gap-1 rounded-lg bg-brand-error/15 px-2.5 py-1.5 text-[12px] font-bold text-brand-error transition-all active:scale-[0.98] disabled:opacity-50"
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
      )}

      <form
        onSubmit={submitLeave}
        className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-4"
      >
        <h2 className="text-[14px] font-bold text-brand-text">Request leave</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="flex flex-col gap-1 text-[12px] font-semibold text-brand-text-muted">
            Type
            <select
              name="type"
              required
              className="rounded-lg border border-brand-whisper-border bg-brand-input px-3 py-2 text-[14px] text-brand-text"
            >
              {LEAVE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[12px] font-semibold text-brand-text-muted">
            From
            <input
              name="start_date"
              type="date"
              required
              className="rounded-lg border border-brand-whisper-border bg-brand-input px-3 py-2 text-[14px] text-brand-text"
            />
          </label>
          <label className="flex flex-col gap-1 text-[12px] font-semibold text-brand-text-muted">
            To
            <input
              name="end_date"
              type="date"
              required
              className="rounded-lg border border-brand-whisper-border bg-brand-input px-3 py-2 text-[14px] text-brand-text"
            />
          </label>
          <label className="flex flex-col gap-1 text-[12px] font-semibold text-brand-text-muted sm:col-span-2">
            Reason
            <input
              name="reason"
              type="text"
              placeholder="Optional note for your manager"
              className="rounded-lg border border-brand-whisper-border bg-brand-input px-3 py-2 text-[14px] text-brand-text"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-lg bg-brand-yellow px-4 py-2 text-[13px] font-bold text-brand-navy transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Submit request'}
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-brand-whisper-border bg-brand-surface">
        <table className="min-w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-brand-whisper-border text-[11px] uppercase tracking-wider text-brand-text-muted">
              <th className="px-4 py-3 font-bold">Type</th>
              <th className="px-4 py-3 font-bold">Dates</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold">Reason</th>
              <th className="px-4 py-3 font-bold">Reviewer</th>
              <th className="px-4 py-3 font-bold" />
            </tr>
          </thead>
          <tbody>
            {mine.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-brand-text-muted">
                  No leave requests yet.
                </td>
              </tr>
            ) : (
              mine.map((row) => (
                <tr key={row.id} className="border-b border-brand-whisper-border/60 last:border-0">
                  <td className="px-4 py-3 text-brand-text">{row.type}</td>
                  <td className="px-4 py-3 text-brand-text" dir="ltr">
                    {row.start_date} → {row.end_date}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                        STATUS_STYLES[row.status ?? 'Pending'] ?? 'bg-brand-text-muted/15 text-brand-text-muted'
                      }`}
                    >
                      {row.status ?? 'Pending'}
                    </span>
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-brand-text-muted">
                    {row.reason ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-brand-text-muted">{row.approver?.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    {row.status === 'Pending' ? (
                      <button
                        type="button"
                        onClick={() => cancelLeave(row.id)}
                        className="text-[12px] font-semibold text-brand-error transition-colors hover:underline"
                      >
                        Cancel
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
