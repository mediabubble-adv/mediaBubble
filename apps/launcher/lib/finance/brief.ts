// Deterministic finance brief generator — produces a real, data-driven
// narrative from a snapshot without requiring an AI API key.

import { formatMoney, type CurrencyCode } from './currency'

export interface BriefSnapshot {
  currency: CurrencyCode
  summary: { inflows: number; outflows: number; net: number }
  burnRate: number
  topCategories: { category: string; total: number; pct: number }[]
  monthly: { month: string; label: string; inflow: number; outflow: number }[]
  recurringCount: number
  totalTransactions: number
}

export function generateLocalBrief(s: BriefSnapshot): string {
  const cur = s.currency
  const fmt = (n: number) => formatMoney(n, cur)
  const { inflows, outflows, net } = s.summary

  // ── Health ──────────────────────────────────────────────────────────────────
  const margin = inflows > 0 ? (net / inflows) * 100 : 0
  const profitable = net >= 0
  const healthLine = profitable
    ? `The ledger is net-positive at ${fmt(net)} (${margin.toFixed(1)}% margin). `
    : `The ledger is net-negative at ${fmt(net)} — outflows exceed inflows by ${fmt(Math.abs(net))}. Immediate attention to cost control is warranted. `

  // ── Burn rate ────────────────────────────────────────────────────────────────
  const runway =
    s.burnRate > 0 && net > 0
      ? ` At the current burn of ${fmt(s.burnRate)}/mo, reserves cover roughly ${Math.floor(net / s.burnRate)} months.`
      : ''

  const burnLine = s.burnRate > 0
    ? `Average monthly burn is ${fmt(s.burnRate)}.${runway}`
    : ''

  // ── Trend ────────────────────────────────────────────────────────────────────
  const months = s.monthly.filter((m) => m.inflow > 0 || m.outflow > 0)
  let trendLine = ''
  if (months.length >= 2) {
    const first = months[0]!
    const last = months[months.length - 1]!
    const netFirst = first.inflow - first.outflow
    const netLast = last.inflow - last.outflow
    const delta = netLast - netFirst
    const deltaPct = netFirst !== 0 ? Math.abs(delta / netFirst) * 100 : 0
    if (Math.abs(delta) < 1) {
      trendLine = `Net position has held flat over the ${months.length}-month window.`
    } else if (delta > 0) {
      trendLine = `Net position improved by ${fmt(Math.abs(delta))} (${deltaPct.toFixed(0)}%) from ${first.label} to ${last.label}.`
    } else {
      trendLine = `Net position declined by ${fmt(Math.abs(delta))} (${deltaPct.toFixed(0)}%) from ${first.label} to ${last.label} — investigate outflow growth.`
    }
  }

  // ── Top category ─────────────────────────────────────────────────────────────
  const topCat = s.topCategories[0]
  const catLine = topCat
    ? `The largest outflow category is ${topCat.category} at ${fmt(topCat.total)} (${topCat.pct.toFixed(0)}% of total spend).`
    : ''

  const highConcentration =
    topCat && topCat.pct > 60
      ? ` High concentration — consider whether diversification or renegotiation is possible.`
      : ''

  // ── Recurring ────────────────────────────────────────────────────────────────
  const recurringLine =
    s.recurringCount > 0
      ? `${s.recurringCount} of ${s.totalTransactions} transactions are recurring.`
      : ''

  // ── Recommendations ───────────────────────────────────────────────────────────
  const recs: string[] = []

  if (!profitable) {
    recs.push(`Reduce outflows to restore positive net. Target the top category (${topCat?.category ?? 'largest spend'}) first.`)
  } else if (margin < 20) {
    recs.push(`Margin is healthy but thin at ${margin.toFixed(1)}%. Aim for 25%+ by reviewing discretionary spend.`)
  }

  if (topCat && topCat.pct > 50) {
    recs.push(`${topCat.category} accounts for over half of all outflows — audit for redundancy or renegotiate rates.`)
  }

  if (s.burnRate > 0 && inflows > 0 && s.burnRate / inflows > 0.8) {
    recs.push(`Burn rate is ${((s.burnRate / inflows) * 100).toFixed(0)}% of average inflow. Build a buffer by either growing revenue or cutting fixed costs.`)
  }

  if (s.recurringCount > 0) {
    recs.push(`Review the ${s.recurringCount} recurring charge${s.recurringCount > 1 ? 's' : ''} for unused or duplicate subscriptions.`)
  }

  if (recs.length === 0) {
    recs.push('Maintain current discipline and reinvest net surplus into revenue-generating activities.')
  }

  // ── Assemble ─────────────────────────────────────────────────────────────────
  const paragraphs = [
    [healthLine, burnLine].filter(Boolean).join(' '),
    [trendLine, catLine + highConcentration].filter(Boolean).join(' '),
    recurringLine,
    'Recommendations: ' + recs.slice(0, 3).map((r, i) => `(${i + 1}) ${r}`).join(' '),
  ].filter(Boolean)

  return paragraphs.join('\n\n')
}
