'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { CalendarDays, Trash2 } from 'lucide-react'
import {
  AVAILABILITY_STATUSES,
  HOLIDAY_COUNTRIES,
} from '@/lib/time/availability-schemas'

export interface AvailabilityRow {
  id: string
  date: string
  start_time: string
  end_time: string
  status: string | null
}

export interface HolidayRow {
  id: string
  date: string
  name: string
  country: string
  is_working_day: boolean | null
}

const STATUS_STYLES: Record<string, string> = {
  Available: 'bg-[#16A34A]/15 text-[#16A34A]',
  Busy: 'bg-[#CA8A04]/15 text-[#CA8A04]',
  'On Leave': 'bg-destructive/15 text-destructive',
}

export function SchedulePanel({
  initialAvailability,
  initialHolidaysEgypt,
  initialHolidaysUae,
}: {
  initialAvailability: AvailabilityRow[]
  initialHolidaysEgypt: HolidayRow[]
  initialHolidaysUae: HolidayRow[]
}) {
  const [slots, setSlots] = useState(initialAvailability)
  const [country, setCountry] = useState<(typeof HOLIDAY_COUNTRIES)[number]>('Egypt')
  const [submitting, setSubmitting] = useState(false)

  const holidays = useMemo(
    () => (country === 'Egypt' ? initialHolidaysEgypt : initialHolidaysUae),
    [country, initialHolidaysEgypt, initialHolidaysUae],
  )

  const upcomingSlots = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return slots.filter((s) => s.date >= today).sort((a, b) => a.date.localeCompare(b.date))
  }, [slots])

  async function addSlot(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    const form = e.currentTarget
    const data = new FormData(form)
    const date = String(data.get('date') ?? '')
    const start_time = String(data.get('start_time') ?? '')
    const end_time = String(data.get('end_time') ?? '')
    const status = String(data.get('status') ?? 'Available')

    if (!date || !start_time || !end_time) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/time/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, start_time, end_time, status }),
      })
      const json = await res.json()
      if (!res.ok) return
      const row = json.data
      setSlots((prev) =>
        [
          ...prev,
          {
            id: row.id,
            date: String(row.date).slice(0, 10),
            start_time: String(row.start_time),
            end_time: String(row.end_time),
            status: row.status,
          },
        ].sort((a, b) => a.date.localeCompare(b.date)),
      )
      form.reset()
      const dateInput = form.elements.namedItem('date') as HTMLInputElement | null
      if (dateInput) dateInput.value = date
    } finally {
      setSubmitting(false)
    }
  }

  async function removeSlot(id: string) {
    const prev = slots
    setSlots((cur) => cur.filter((s) => s.id !== id))
    try {
      const res = await fetch(`/api/time/availability/${id}`, { method: 'DELETE' })
      if (!res.ok) setSlots(prev)
    } catch {
      setSlots(prev)
    }
  }

  function formatSlotTime(isoOrTime: string): string {
    if (isoOrTime.includes('T')) {
      const d = new Date(isoOrTime)
      return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
    }
    return isoOrTime.slice(0, 5)
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-primary" />
          <h2 className="text-[14px] font-bold text-foreground">Your availability</h2>
        </div>

        <form
          onSubmit={addSlot}
          className="rounded-2xl border border-border bg-card p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
              Date
              <input
                name="date"
                type="date"
                defaultValue={today}
                required
                className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
              From
              <input
                name="start_time"
                type="time"
                defaultValue="09:00"
                required
                className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
                dir="ltr"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
              To
              <input
                name="end_time"
                type="time"
                defaultValue="17:00"
                required
                className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
                dir="ltr"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-semibold text-muted-foreground">
              Status
              <select
                name="status"
                className="rounded-lg border border-border bg-input px-3 py-2 text-[14px] text-foreground"
              >
                {AVAILABILITY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-4 rounded-lg bg-accent px-4 py-2 text-[13px] font-bold text-accent-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? 'Saving…' : 'Add slot'}
          </button>
        </form>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="min-w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-bold">Date</th>
                <th className="px-4 py-3 font-bold">Hours</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold" />
              </tr>
            </thead>
            <tbody>
              {upcomingSlots.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                    No upcoming availability slots.
                  </td>
                </tr>
              ) : (
                upcomingSlots.map((slot) => (
                  <tr key={slot.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-foreground" dir="ltr">
                      {slot.date}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground" dir="ltr">
                      {formatSlotTime(slot.start_time)} – {formatSlotTime(slot.end_time)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                          STATUS_STYLES[slot.status ?? 'Available'] ??
                          'bg-muted-foreground/15 text-muted-foreground'
                        }`}
                      >
                        {slot.status ?? 'Available'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => removeSlot(slot.id)}
                        aria-label="Delete slot"
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive active:scale-[0.98]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[14px] font-bold text-foreground">Holiday calendar</h2>
          <div className="flex rounded-lg border border-border p-0.5">
            {HOLIDAY_COUNTRIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCountry(c)}
                className={`rounded-md px-3 py-1.5 text-[12px] font-bold transition-colors ${
                  country === c
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {c === 'Egypt' ? 'Egypt (EG)' : 'UAE (AE)'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="min-w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-bold">Date</th>
                <th className="px-4 py-3 font-bold">Holiday</th>
                <th className="px-4 py-3 font-bold">Office</th>
              </tr>
            </thead>
            <tbody>
              {holidays.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-muted-foreground">
                    No holidays loaded — run <code className="text-[12px]">pnpm run db:seed</code>.
                  </td>
                </tr>
              ) : (
                holidays.map((h) => (
                  <tr key={h.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-foreground" dir="ltr">
                      {h.date}
                    </td>
                    <td className="px-4 py-3 text-foreground">{h.name}</td>
                    <td className="px-4 py-3">
                      {h.is_working_day ? (
                        <span className="text-muted-foreground">Working day</span>
                      ) : (
                        <span className="rounded-md bg-destructive/15 px-2 py-0.5 text-[11px] font-bold text-destructive">
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="text-[12px] text-muted-foreground">
          Islamic holiday dates are approximate for 2026 planning. Confirm official UAE/EG gazette
          announcements before scheduling client work.
        </p>
      </section>
    </div>
  )
}
