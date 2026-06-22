'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Bot, Megaphone, Workflow, Gauge, FilePlus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { OpusUsageSnapshot } from '@/lib/opus/types'

interface OpusSummary {
  usage: OpusUsageSnapshot
  campaigns: Array<{ id: string; name: string; status: string; budget: number | null }>
  triggers: Array<{ id: string; name: string; slug: string; type: string }>
  recent_events: Array<{ type: string; occurredAt?: string }>
}

export function OpusHub() {
  const [summary, setSummary] = useState<OpusSummary | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void fetch('/api/opus/summary')
      .then((r) => r.json())
      .then((json) => {
        if (json.status === 200) setSummary(json.data)
        else setError(json.message ?? 'Failed to load OPUS summary')
      })
      .catch(() => setError('Failed to load OPUS summary'))
  }, [])

  const usage = summary?.usage

  return (
    <div className="px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">OPUS</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
          Command Center
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
          Autonomous marketing orchestration — brief to campaign to optimization in one workflow.
        </p>

        {error ? (
          <p className="mt-6 text-sm text-destructive">{error}</p>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                AI Generations
              </p>
              <p className="mt-2 font-display text-2xl font-bold">
                {usage ? `${usage.ai_generations}/${usage.quotas.ai_generations}` : '—'}
              </p>
              <p className="mt-1 text-[12px] text-muted-foreground">
                {usage ? `${usage.percent_used.ai_generations}% of plan` : 'Loading…'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Active Campaigns
              </p>
              <p className="mt-2 font-display text-2xl font-bold">
                {summary?.campaigns.length ?? '—'}
              </p>
              <p className="mt-1 text-[12px] text-muted-foreground">Planning + live</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Automation Triggers
              </p>
              <p className="mt-2 font-display text-2xl font-bold">
                {summary?.triggers.length ?? '—'}
              </p>
              <p className="mt-1 text-[12px] text-muted-foreground">Enabled schedules</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            { href: '/opus/briefs/new', label: 'New Brief', icon: FilePlus, desc: 'Brief → campaign flow' },
            { href: '/opus/triggers', label: 'Triggers', icon: Workflow, desc: 'Weekly social planning + more' },
            { href: '/opus/usage', label: 'Usage', icon: Gauge, desc: 'Quotas and metering' },
            { href: '/campaigns', label: 'Campaigns', icon: Megaphone, desc: 'Proposals and live campaigns' },
          ].map(({ href, label, icon: Icon, desc }) => (
            <Link key={href} href={href}>
              <Card className="group h-full transition-colors hover:border-primary/40">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-[15px] font-bold">{label}</h2>
                    <p className="text-[12px] text-muted-foreground">{desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {summary?.campaigns[0] ? (
          <Card className="mt-8">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Performance Review
                </p>
                <p className="mt-1 font-display text-[15px] font-bold">{summary.campaigns[0].name}</p>
              </div>
              <Link href={`/opus/campaigns/${summary.campaigns[0].id}/performance`}>
                <Badge tone="blue" className="cursor-pointer">
                  View metrics
                </Badge>
              </Link>
            </CardContent>
          </Card>
        ) : null}

        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="flex items-start gap-3 p-5">
            <Bot size={18} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-[13px] text-muted-foreground">
              OPUS closes the loop from strategic brief to executed campaigns with usage tracking,
              automation triggers, and performance insights — built for MediaBubble teams in EN + Arabic.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
