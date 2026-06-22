'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { OpusUsageSnapshot } from '@/lib/opus/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'

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
    <PageFrame>
      <PageHeader
        kicker="OPUS Billing"
        title="Usage"
        description={
          usage
            ? `${usage.period_start} → ${usage.period_end} · Plan: ${usage.plan}`
            : 'Loading billing period…'
        }
        actions={
          <Link href="/opus">
            <Button variant="outline">Back</Button>
          </Link>
        }
      />

        {usage ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
    </PageFrame>
  )
}
