'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { OpusUsageSnapshot } from '@/lib/opus/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function Meter({ label, used, quota, pct }: { label: string; used: number; quota: number; pct: number }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-2 font-display text-2xl font-bold">
          {used.toLocaleString()} / {quota.toLocaleString()}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>
        <p className="mt-2 text-[12px] text-muted-foreground">{pct}% used</p>
      </CardContent>
    </Card>
  )
}

export function OpusUsageDashboard() {
  const [usage, setUsage] = useState<OpusUsageSnapshot | null>(null)

  useEffect(() => {
    void fetch('/api/opus/usage')
      .then((r) => r.json())
      .then((json) => {
        if (json.status === 200) setUsage(json.data)
      })
  }, [])

  return (
    <div className="px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">OPUS Billing</p>
            <h1 className="mt-1 font-display text-2xl font-bold">Usage</h1>
            {usage ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {usage.period_start} → {usage.period_end} · Plan: {usage.plan}
              </p>
            ) : null}
          </div>
          <Link href="/opus">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        {usage ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Meter
              label="AI Generations"
              used={usage.ai_generations}
              quota={usage.quotas.ai_generations}
              pct={usage.percent_used.ai_generations}
            />
            <Meter
              label="Campaigns Launched"
              used={usage.campaigns_launched}
              quota={usage.quotas.campaigns_launched}
              pct={usage.percent_used.campaigns_launched}
            />
            <Meter
              label="API Calls"
              used={usage.api_calls}
              quota={usage.quotas.api_calls}
              pct={usage.percent_used.api_calls}
            />
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted-foreground">Loading usage…</p>
        )}
      </div>
    </div>
  )
}
