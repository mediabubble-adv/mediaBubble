import { summarize, byCategory, monthlySeries, type FinanceTxn } from './kpis'

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

describe('monthlySeries', () => {
  it('buckets inflow/outflow by month', () => {
    const series = monthlySeries(txns, 'USD')
    expect(series).toEqual([
      { month: '2026-01', inflow: 0, outflow: 150 },
      { month: '2026-02', inflow: 1000, outflow: 2 },
    ])
  })
})
