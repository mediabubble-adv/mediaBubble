'use client'

import { useState } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'
import type { CurrencyCode } from '@/lib/finance/currency'

export interface BriefSnapshot {
  currency: CurrencyCode
  summary: { inflows: number; outflows: number; net: number }
  burnRate: number
  topCategories: { category: string; total: number; pct: number }[]
  monthly: { month: string; label: string; inflow: number; outflow: number }[]
  recurringCount: number
  totalTransactions: number
}

export function FinanceAiBrief({ snapshot }: { snapshot: BriefSnapshot }) {
  const [brief, setBrief] = useState<string | null>(null)
  const [provider, setProvider] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function generate() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/finance/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snapshot),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.message ?? 'Failed to generate brief')
        return
      }
      setBrief(json.data.brief)
      setProvider(`${json.data.provider} · ${json.data.model}`)
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2.5">
          <Sparkles size={15} className="animate-pulse text-primary" />
          <span className="animate-pulse text-[13px] font-bold text-foreground">
            Analysing ledger…
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-4/6 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-3/4 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    )
  }

  if (!brief) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-foreground">Finance AI Brief</p>
            <p className="text-[12px] text-muted-foreground">
              AI-generated analysis of your current financial position.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {error && <p className="text-[12px] text-destructive">{error}</p>}
          <button
            type="button"
            onClick={generate}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
          >
            <Sparkles size={14} />
            Generate brief
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/[0.04] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles size={14} className="text-primary" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-foreground">Finance AI Brief</p>
            {provider && (
              <p className="text-[11px] text-muted-foreground">{provider}</p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={generate}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          <RefreshCw size={12} />
          Regenerate
        </button>
      </div>

      {error && <p className="mb-3 text-[12px] text-destructive">{error}</p>}

      <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-foreground/90">
        {brief}
      </p>
    </div>
  )
}
