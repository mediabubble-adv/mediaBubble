// Finance aggregations. Every transaction is converted to the chosen display
// currency before summing, so mixed-currency ledgers roll up correctly.

import { convert, type CurrencyCode } from './currency'

export interface FinanceTxn {
  date: string // ISO date (YYYY-MM-DD…)
  category: string
  type: 'inflow' | 'outflow'
  amount: number
  currency: CurrencyCode
}

export interface Summary {
  inflows: number
  outflows: number
  net: number
}

const toDisplay = (t: FinanceTxn, display: CurrencyCode) =>
  convert(t.amount, t.currency, display)

export function summarize(txns: FinanceTxn[], display: CurrencyCode): Summary {
  let inflows = 0
  let outflows = 0
  for (const t of txns) {
    const amt = toDisplay(t, display)
    if (t.type === 'inflow') inflows += amt
    else outflows += amt
  }
  return { inflows, outflows, net: inflows - outflows }
}

/** Outflow totals per category, largest first — feeds the expense donut. */
export function byCategory(
  txns: FinanceTxn[],
  display: CurrencyCode,
): { category: string; total: number }[] {
  const totals = new Map<string, number>()
  for (const t of txns) {
    if (t.type !== 'outflow') continue
    totals.set(t.category, (totals.get(t.category) ?? 0) + toDisplay(t, display))
  }
  return [...totals.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}

/** Inflow/outflow bucketed by YYYY-MM, chronological — feeds the area chart. */
export function monthlySeries(
  txns: FinanceTxn[],
  display: CurrencyCode,
): { month: string; inflow: number; outflow: number }[] {
  const buckets = new Map<string, { inflow: number; outflow: number }>()
  for (const t of txns) {
    const month = t.date.slice(0, 7)
    const bucket = buckets.get(month) ?? { inflow: 0, outflow: 0 }
    const amt = toDisplay(t, display)
    if (t.type === 'inflow') bucket.inflow += amt
    else bucket.outflow += amt
    buckets.set(month, bucket)
  }
  return [...buckets.entries()]
    .map(([month, v]) => ({ month, ...v }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

const MONTH_LABEL = new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' })

/** Stable YYYY-MM label (UTC) for chart axes. */
export function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-').map(Number)
  if (!year || !month) return monthKey
  return MONTH_LABEL.format(new Date(Date.UTC(year, month - 1, 1)))
}

/** Trailing calendar month keys ending at `asOf` (UTC), oldest first. */
export function trailingMonthKeys(count = 6, asOf = new Date()): string[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(Date.UTC(asOf.getUTCFullYear(), asOf.getUTCMonth() - (count - 1 - i), 1))
    return d.toISOString().slice(0, 7)
  })
}

/** Pad to the trailing N calendar months (zeros for gaps) — stable chart axis. */
export function monthlySeriesPadded(
  txns: FinanceTxn[],
  display: CurrencyCode,
  monthCount = 6,
): { month: string; label: string; inflow: number; outflow: number }[] {
  const byMonth = new Map(monthlySeries(txns, display).map((row) => [row.month, row]))
  const now = new Date()
  const rows: { month: string; label: string; inflow: number; outflow: number }[] = []

  for (let i = monthCount - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))
    const month = d.toISOString().slice(0, 7)
    const hit = byMonth.get(month)
    rows.push({
      month,
      label: formatMonthLabel(month),
      inflow: hit?.inflow ?? 0,
      outflow: hit?.outflow ?? 0,
    })
  }

  return rows
}
