'use client'

import type { CapacitySnapshot } from '@/lib/time/capacity'
import { utilizationTone } from '@/lib/time/capacity'
import { formatDuration } from '@/lib/time/kpis'
import { BarChart3 } from 'lucide-react'

const TONE_CLASS: Record<ReturnType<typeof utilizationTone>, string> = {
  low: 'bg-brand-text-muted',
  ok: 'bg-brand-success',
  high: 'bg-brand-warning',
  over: 'bg-brand-error',
}

function UtilBar({ percent }: { percent: number }) {
  const tone = utilizationTone(percent)
  const width = Math.min(percent, 120)
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-brand-whisper-border/60">
      <div className={`h-full rounded-full ${TONE_CLASS[tone]}`} style={{ width: `${width}%` }} />
    </div>
  )
}

export function CapacityPanel({
  self,
  team,
  canViewTeam,
}: {
  self: CapacitySnapshot
  team: CapacitySnapshot[]
  canViewTeam: boolean
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-4">
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-brand-blue" />
          <h2 className="text-[14px] font-bold text-brand-text">Your week</h2>
          <span className="text-[12px] text-brand-text-muted" dir="ltr">
            {self.week_start} → {self.week_end}
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {[
            { label: 'Logged', value: `${self.logged_hours}h` },
            { label: 'Allocated', value: `${self.allocated_hours}h` },
            { label: 'Utilization', value: `${self.utilization_percent}%` },
            { label: 'Entries', value: String(self.entry_count) },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-brand-whisper-border px-3 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
                {label}
              </p>
              <p className="mt-1 font-display text-xl font-bold text-brand-text" dir="ltr">
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <UtilBar percent={self.utilization_percent} />
        </div>
        <p className="mt-2 text-[12px] text-brand-text-muted">
          Billable logged time: {formatDuration(Math.round(self.logged_hours * 60))} this week
          (default allocation {self.allocated_hours}h).
        </p>
      </section>

      {canViewTeam && (
        <section className="overflow-x-auto rounded-2xl border border-brand-whisper-border bg-brand-surface">
          <div className="border-b border-brand-whisper-border px-4 py-3">
            <h2 className="text-[14px] font-bold text-brand-text">Team utilization</h2>
          </div>
          <table className="min-w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-brand-whisper-border text-[11px] uppercase tracking-wider text-brand-text-muted">
                <th className="px-4 py-3 font-bold">Member</th>
                <th className="px-4 py-3 font-bold">Logged</th>
                <th className="px-4 py-3 font-bold">Allocated</th>
                <th className="px-4 py-3 font-bold">Utilization</th>
                <th className="px-4 py-3 font-bold">Entries</th>
              </tr>
            </thead>
            <tbody>
              {team.map((row) => (
                <tr key={row.user_id} className="border-b border-brand-whisper-border/60 last:border-0">
                  <td className="px-4 py-3 text-brand-text">{row.user_name}</td>
                  <td className="px-4 py-3 text-brand-text" dir="ltr">
                    {row.logged_hours}h
                  </td>
                  <td className="px-4 py-3 text-brand-text-muted" dir="ltr">
                    {row.allocated_hours}h
                  </td>
                  <td className="px-4 py-3">
                    <div className="min-w-[120px]">
                      <div className="mb-1 font-semibold text-brand-text" dir="ltr">
                        {row.utilization_percent}%
                      </div>
                      <UtilBar percent={row.utilization_percent} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-brand-text-muted">{row.entry_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  )
}
