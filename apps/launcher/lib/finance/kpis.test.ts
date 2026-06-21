import { summarize, byCategory, monthlySeries, monthlySeriesPadded, type FinanceTxn } from './kpis'

const txns: FinanceTxn[] = [
  { date: '2026-01-15', category: 'AI & Dev', type: 'outflow', amount: 100, currency: 'USD' },
  { date: '2026-01-20', category: 'Hosting', type: 'outflow', amount: 50, currency: 'USD' },
  { date: '2026-02-01', category: 'Revenue', type: 'inflow', amount: 1000, currency: 'USD' },
  { date: '2026-02-10', category: 'AI & Dev', type: 'outflow', amount: 96, currency: 'EGP' }, // 2 USD
]

describe('summarize', () => {
  it('totals inflows and outflows in the display currency', () => {
    const s = summarize(txns, 'USD')
    expect(s.inflows).toBeCloseTo(1000, 6)
    expect(s.outflows).toBeCloseTo(152, 6) // 100 + 50 + (96 EGP -> 2 USD)
  })

  it('computes net as inflows minus outflows', () => {
    const s = summarize(txns, 'USD')
    expect(s.net).toBeCloseTo(848, 6)
  })
})

describe('byCategory', () => {
  it('groups outflow totals by category, largest first', () => {
    const cats = byCategory(txns, 'USD')
    expect(cats).toEqual([
      { category: 'AI & Dev', total: 102 },
      { category: 'Hosting', total: 50 },
    ])
  })
})

describe('monthlySeriesPadded', () => {
  it('returns six trailing months with zero-filled gaps', () => {
    const series = monthlySeriesPadded(txns, 'USD', 6)
    expect(series).toHaveLength(6)
    expect(series.every((row) => row.label.length > 0)).toBe(true)
    const jan = series.find((row) => row.month === '2026-01')
    const feb = series.find((row) => row.month === '2026-02')
    expect(jan?.inflow).toBe(0)
    expect(jan?.outflow).toBe(150)
    expect(feb?.inflow).toBe(1000)
    expect(feb?.outflow).toBe(2)
  })
})
