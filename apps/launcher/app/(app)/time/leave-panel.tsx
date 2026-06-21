'use client'

import { useState, type FormEvent } from 'react'
import { CalendarOff, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Pending: 'bg-[#CA8A04]/15 text-[#CA8A04]',
  Approved: 'bg-[#16A34A]/15 text-[#16A34A]',
  Rejected: 'bg-destructive/15 text-destructive',
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
        <section className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <CalendarOff size={16} className="text-[#CA8A04]" />
            <h2 className="text-[14px] font-bold text-foreground">Pending approvals</h2>
            <span className="rounded-md bg-[#CA8A04]/15 px-2 py-0.5 text-[11px] font-bold text-[#CA8A04]">
              {pending.length}
            </span>
          </div>
          {pending.length === 0 ? (
            <p className="mt-4 text-[13px] text-muted-foreground">No pending leave requests.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-3 py-2 font-bold">Employee</th>
                    <th className="px-3 py-2 font-bold">Type</th>
                    <th className="px-3 py-2 font-bold">Dates</th>
                    <th className="px-3 py-2 font-bold">Reason</th>
                    <th className="px-3 py-2 font-bold" />
                  </tr>
                </thead>
                <tbody>
                  {pending.map((row) => (
                    <tr key={row.id} className="border-b border-border/60 last:border-0">
                      <td className="px-3 py-3 text-foreground">{row.employee.name}</td>
                      <td className="px-3 py-3 text-muted-foreground">{row.type}</td>
                      <td className="px-3 py-3 text-foreground" dir="ltr">
                        {row.start_date} → {row.end_date}
                      </td>
                      <td className="max-w-xs truncate px-3 py-3 text-muted-foreground">
                        {row.reason ?? '—'}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={reviewingId === row.id}
                            onClick={() => reviewLeave(row.id, 'Approved')}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#16A34A]/15 px-2.5 py-1.5 text-[12px] font-bold text-[#16A34A] transition-[transform,background-color,color,border-color,opacity] active:scale-[0.98] disabled:opacity-50"
                          >
                            <Check size={12} />
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={reviewingId === row.id}
                            onClick={() => reviewLeave(row.id, 'Rejected')}
                            className="inline-flex items-center gap-1 rounded-lg bg-destructive/15 px-2.5 py-1.5 text-[12px] font-bold text-destructive transition-[transform,background-color,color,border-color,opacity] active:scale-[0.98] disabled:opacity-50"
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
        className="rounded-2xl border border-border bg-card p-4"
      >
        <h2 className="text-[14px] font-bold text-foreground">Request leave</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
            Type
            <select
              name="type"
              required
              className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
            >
              {LEAVE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
            From
            <Input
              name="start_date"
              type="date"
              required
              className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
            To
            <Input
              name="end_date"
              type="date"
              required
              className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground sm:col-span-2">
            Reason
            <Input
              name="reason"
              type="text"
              placeholder="Optional note for your manager"
              className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
            />
          </label>
        </div>
        <Button type="submit" variant="accent" size="sm" isLoading={submitting} loadingText="Submitting…" className="mt-4 w-full">
          Submit request
        </Button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="min-w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
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
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  No leave requests yet.
                </td>
              </tr>
            ) : (
              mine.map((row) => (
                <tr key={row.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 text-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-foreground" dir="ltr">
                    {row.start_date} → {row.end_date}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                        STATUS_STYLES[row.status ?? 'Pending'] ?? 'bg-muted-foreground/15 text-muted-foreground'
                      }`}
                    >
                      {row.status ?? 'Pending'}
                    </span>
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                    {row.reason ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.approver?.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    {row.status === 'Pending' ? (
                      <button
                        type="button"
                        onClick={() => cancelLeave(row.id)}
                        className="text-[12px] font-semibold text-destructive transition-colors hover:underline"
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
