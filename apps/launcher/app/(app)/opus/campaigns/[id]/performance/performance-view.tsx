'use client'

import Link from 'next/link'
import type { OpusCampaignPerformance } from '@/lib/opus/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'

export function OpusPerformanceView({ data }: { data: OpusCampaignPerformance }) {
  return (
    <PageFrame>
      <PageHeader
        kicker="OPUS Performance"
        title={data.campaign_name}
        description={`${data.period_start} – ${data.period_end} · Spend $${data.spend.toLocaleString()}${data.budget ? ` / $${data.budget.toLocaleString()}` : ''}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Badge tone={data.status === 'Active' ? 'success' : 'blue'}>{data.status}</Badge>
            {data.roas ? <Badge tone="warning">ROAS {data.roas}x</Badge> : null}
            <Link href="/opus">
              <Button variant="outline">Back</Button>
            </Link>
          </div>
        }
      />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
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

        <div className="mt-8 grid gap-4 lg:grid-cols-2 2xl:gap-6">
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
    </PageFrame>
  )
}
