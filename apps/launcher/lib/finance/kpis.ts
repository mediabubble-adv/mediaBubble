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
