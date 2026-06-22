'use client'

import Link from 'next/link'
import type { OpusCampaignPerformance } from '@/lib/opus/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function OpusPerformanceView({ data }: { data: OpusCampaignPerformance }) {
  return (
    <div className="px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">OPUS Performance</p>
            <h1 className="mt-1 font-display text-2xl font-bold">{data.campaign_name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {data.period_start} – {data.period_end} · Spend ${data.spend.toLocaleString()}
              {data.budget ? ` / $${data.budget.toLocaleString()}` : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge tone={data.status === 'Active' ? 'success' : 'blue'}>{data.status}</Badge>
            {data.roas ? <Badge tone="warning">ROAS {data.roas}x</Badge> : null}
            <Link href="/opus">
              <Button variant="outline">Back</Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ['Impressions', data.impressions.toLocaleString()],
            ['Clicks', data.clicks.toLocaleString()],
            ['CTR', `${data.ctr.toFixed(2)}%`],
            ['Conversions', data.conversions.toLocaleString()],
            ['CPA', data.cpa ? `$${data.cpa.toFixed(2)}` : '—'],
            ['ROAS', data.roas ? `${data.roas}x` : '—'],
          ].map(([label, value]) => (
            <Card key={label}>
              <CardContent className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="mt-2 font-display text-xl font-bold">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-5">
              <h2 className="font-display font-bold">Meta Ads</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {data.meta.impressions.toLocaleString()} impr · {data.meta.clicks.toLocaleString()} clicks · CTR{' '}
                {data.meta.ctr.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <h2 className="font-display font-bold">Google Ads</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {data.google.impressions.toLocaleString()} impr · {data.google.clicks.toLocaleString()} clicks · CTR{' '}
                {data.google.ctr.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-5">
            <h2 className="font-display font-bold">AI Insights</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {data.insights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
