'use client'

import { useMemo, useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
  Search,
  ArrowUpDown,
  DollarSign,
  Info,
} from 'lucide-react'
import { CURRENCIES, formatMoney, convert, type CurrencyCode } from '@/lib/finance/currency'
import { summarize, byCategory, monthlySeriesPadded, trailingMonthKeys, formatMonthLabel, type FinanceTxn } from '@/lib/finance/kpis'

interface DashboardTxn extends FinanceTxn {
  id: string
  description: string | null
  payment_method: string | null
  recurring: boolean
}

type CashFlowPoint = {
  x: number
  yInflow: number
  yOutflow: number
  label: string
  month: string
  inflow: number
  outflow: number
}

export function FinanceDashboard({ initialTxns }: { initialTxns: DashboardTxn[] }) {
  const [displayCurrency, setDisplayCurrency] = useState<CurrencyCode>('USD')
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'inflow' | 'outflow'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Sorting state
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category' | 'type'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Get unique categories for the filter dropdown
  const categories = useMemo(() => {
    const set = new Set(initialTxns.map((t) => t.category))
    return ['all', ...Array.from(set).sort()]
  }, [initialTxns])

  // Filtered transactions
  const filteredTxns = useMemo(() => {
    return initialTxns
      .filter((t) => {
        const matchesSearch =
          t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.payment_method && t.payment_method.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesType = typeFilter === 'all' || t.type === typeFilter
        const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter

        return matchesSearch && matchesType && matchesCategory
      })
      .sort((a, b) => {
        let valA: any = a[sortBy]
        let valB: any = b[sortBy]

        if (sortBy === 'amount') {
          // Convert to display currency for fair amount sorting
          valA = convert(a.amount, a.currency, displayCurrency)
          valB = convert(b.amount, b.currency, displayCurrency)
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
  }, [initialTxns, searchQuery, typeFilter, categoryFilter, sortBy, sortOrder, displayCurrency])

  // Summaries & KPIs
  const summary = useMemo(() => {
    return summarize(filteredTxns, displayCurrency)
  }, [filteredTxns, displayCurrency])

  // Operating Burn Rate calculation: average monthly outflow of the last 6 months
  const burnRate = useMemo(() => {
    const monthlyData = monthlySeriesPadded(initialTxns, displayCurrency)
    if (monthlyData.length === 0) return 0
    const totalOutflow = monthlyData.reduce((sum, m) => sum + m.outflow, 0)
    return totalOutflow / monthlyData.length
  }, [initialTxns, displayCurrency])

  // Expense Donut Chart calculation
  const categoryData = useMemo(() => {
    return byCategory(filteredTxns, displayCurrency)
  }, [filteredTxns, displayCurrency])

  // SVG Donut Calculations
  const donutSegments = useMemo(() => {
    const total = categoryData.reduce((sum, c) => sum + c.total, 0)
    if (total === 0) return []

    let accumulatedPercentage = 0
    const colors = [
      'stroke-brand-blue',
      'stroke-brand-warning',
      'stroke-brand-error',
      'stroke-brand-info',
      'stroke-brand-text-muted',
    ]

    return categoryData.map((c, i) => {
      const percentage = (c.total / total) * 100
      const strokeDasharray = `${percentage.toFixed(2)} ${(100 - percentage).toFixed(2)}`
      const strokeDashoffset = Number((100 - accumulatedPercentage + 25).toFixed(2))
      accumulatedPercentage += percentage

      return {
        ...c,
        percentage,
        strokeDasharray,
        strokeDashoffset,
        colorClass: colors[i % colors.length],
        bgClass: colors[i % colors.length].replace('stroke-', 'bg-'),
      }
    })
  }, [categoryData])

  // Cash-flow chart uses full ledger (filters apply to the table only).
  const usingDemoChart = initialTxns.length === 0
  const monthlyData = useMemo(() => {
    if (usingDemoChart) {
      const demoInflowUsd = 120_000 / CURRENCIES.EGP.perUsd
      const demoOutflowUsd = 25 + 20 + 10 + 25 + 20 + 20 + 12 + 20 + 1.5
      const scale = displayCurrency === 'USD' ? 1 : convert(1, 'USD', displayCurrency)
      return trailingMonthKeys(6).map((month) => ({
        month,
        label: formatMonthLabel(month),
        inflow: demoInflowUsd * scale,
        outflow: demoOutflowUsd * scale,
      }))
    }
    return monthlySeriesPadded(initialTxns, displayCurrency)
  }, [initialTxns, displayCurrency, usingDemoChart])

  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null)

  const chartPaths = useMemo(() => {
    if (monthlyData.length === 0) {
      return {
        inflowLine: '',
        inflowArea: '',
        outflowLine: '',
        outflowArea: '',
        points: [] as CashFlowPoint[],
        yTicks: [] as { y: number; label: string }[],
        maxVal: 0,
      }
    }

    const width = 600
    const height = 180
    const paddingLeft = 72
    const paddingRight = 16
    const paddingTop = 12
    const paddingBottom = 28
    const chartW = width - paddingLeft - paddingRight
    const chartH = height - paddingTop - paddingBottom

    const maxVal = Math.max(
      ...monthlyData.map((m) => Math.max(m.inflow, m.outflow)),
      1,
    )

    const points: CashFlowPoint[] = monthlyData.map((m, i) => {
      const x = paddingLeft + (i / Math.max(monthlyData.length - 1, 1)) * chartW
      const yInflow = paddingTop + chartH - (m.inflow / maxVal) * chartH
      const yOutflow = paddingTop + chartH - (m.outflow / maxVal) * chartH
      return {
        x,
        yInflow,
        yOutflow,
        label: m.label,
        month: m.month,
        inflow: m.inflow,
        outflow: m.outflow,
      }
    })

    const getLinePath = (yKey: 'yInflow' | 'yOutflow') =>
      points.reduce((path, p, i) => path + `${i === 0 ? 'M' : 'L'} ${p.x} ${p[yKey]}`, '')

    const getAreaPath = (linePath: string) => {
      if (!linePath) return ''
      const baseline = paddingTop + chartH
      return `${linePath} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`
    }

    const yTicks = [0, maxVal / 2, maxVal].map((val) => ({
      y: paddingTop + chartH - (val / maxVal) * chartH,
      label: formatMoney(val, displayCurrency),
    }))

    return {
      inflowLine: getLinePath('yInflow'),
      inflowArea: getAreaPath(getLinePath('yInflow')),
      outflowLine: getLinePath('yOutflow'),
      outflowArea: getAreaPath(getLinePath('yOutflow')),
      points,
      yTicks,
      maxVal,
    }
  }, [monthlyData, displayCurrency])

  // AI Optimization Brief Check: Look for duplicate Hosting (Hostinger) charges
  const optimizationIssues = useMemo(() => {
    const issues: { title: string; desc: string; savings: string }[] = []

    const hostingOutflows = initialTxns.filter(
      (t) =>
        t.type === 'outflow' &&
        t.category === 'Hosting & Servers' &&
        t.description?.toLowerCase().includes('hostinger')
    )

    if (hostingOutflows.length > 1) {
      // Find the ones that overlap in the same month or look duplicate
      const monthsSeen = new Set<string>()
      let duplicateTotal = 0
      hostingOutflows.forEach((h) => {
        const month = h.date.slice(0, 7)
        if (monthsSeen.has(month)) {
          duplicateTotal += convert(h.amount, h.currency, displayCurrency)
        } else {
          monthsSeen.add(month)
        }
      })

      if (duplicateTotal > 0) {
        issues.push({
          title: 'Duplicate hosting services detected',
          desc: 'Identified parallel billing for Hostinger (including "openclaw"). Consolidating legacy tiers onto a single server recovers operations budget.',
          savings: `${formatMoney(duplicateTotal / monthsSeen.size, displayCurrency)}/mo`,
        })
      }
    }

    return issues
  }, [initialTxns, displayCurrency])

  const toggleSort = (field: 'date' | 'amount' | 'category' | 'type') => {
    if (sortBy === field) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <div className="px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header with Currency Switcher */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/[0.16]">
              <Wallet size={20} className="text-brand-blue" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-brand-text">Finance Ledger</h1>
              <p className="text-[13px] text-brand-text-muted">
                Audit transactions, track cash flow, and optimize infrastructure spend.
              </p>
            </div>
          </div>

          {/* Currency Switcher */}
          <div className="flex rounded-lg border border-brand-whisper-border bg-brand-surface p-1">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setDisplayCurrency(code)}
                className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition-all ${
                  displayCurrency === code
                    ? 'bg-brand-blue text-white'
                    : 'text-brand-text-muted hover:text-brand-text'
                }`}
              >
                {code} ({CURRENCIES[code].symbol})
              </button>
            ))}
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-brand-text-muted">Total Inflows</span>
              <TrendingUp size={16} className="text-brand-blue" />
            </div>
            <p className="mt-2 text-2xl font-bold text-brand-text tabular-nums" dir="ltr">
              {formatMoney(summary.inflows, displayCurrency)}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-brand-text-muted">Total Outflows</span>
              <TrendingDown size={16} className="text-brand-error" />
            </div>
            <p className="mt-2 text-2xl font-bold text-brand-text tabular-nums" dir="ltr">
              {formatMoney(summary.outflows, displayCurrency)}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-brand-text-muted">Net Profit</span>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  summary.net >= 0 ? 'bg-brand-blue/15 text-brand-blue' : 'bg-brand-error/15 text-brand-error'
                }`}
              >
                <DollarSign size={12} />
              </div>
            </div>
            <p
              className={`mt-2 text-2xl font-bold tabular-nums ${
                summary.net >= 0 ? 'text-brand-blue' : 'text-brand-error'
              }`}
              dir="ltr"
            >
              {formatMoney(summary.net, displayCurrency)}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-brand-text-muted">Operating Burn Rate</span>
              <Info size={16} className="text-brand-text-muted" />
            </div>
            <p className="mt-2 text-2xl font-bold text-brand-text tabular-nums" dir="ltr">
              {formatMoney(burnRate, displayCurrency)}
              <span className="text-[11px] font-normal text-brand-text-muted"> / mo</span>
            </p>
          </div>
        </div>

        {/* Charts & AI Optimization Brief */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cash Flow Area Chart */}
          <div className="lg:col-span-2 rounded-2xl border border-brand-whisper-border bg-brand-surface p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-[15px] font-bold text-brand-text">Cash Flow History</h2>
              {usingDemoChart ? (
                <span className="rounded-md bg-brand-yellow/[0.14] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-text">
                  Example data — run npm run db:seed for live ledger
                </span>
              ) : null}
            </div>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[500px]">
                <svg className="w-full" viewBox="0 0 600 200" role="img" aria-label="Cash flow area chart">
                  <defs>
                    <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-blue, #3B82F6)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--brand-blue, #3B82F6)" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-error, #EF4444)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--brand-error, #EF4444)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Y-axis labels */}
                  {chartPaths.yTicks.map((tick, idx) => (
                    <g key={idx}>
                      <line
                        x1="72"
                        y1={tick.y}
                        x2="584"
                        y2={tick.y}
                        stroke="#1F2128"
                        strokeWidth="1"
                      />
                      <text
                        x="68"
                        y={tick.y + 3}
                        textAnchor="end"
                        className="fill-brand-text-muted text-[9px] font-semibold tabular-nums"
                      >
                        {tick.label}
                      </text>
                    </g>
                  ))}

                  {chartPaths.points.length > 0 && (
                    <>
                      <path d={chartPaths.inflowArea} fill="url(#inflowGrad)" />
                      <path d={chartPaths.outflowArea} fill="url(#outflowGrad)" />

                      <path
                        d={chartPaths.inflowLine}
                        fill="none"
                        className="stroke-brand-blue"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d={chartPaths.outflowLine}
                        fill="none"
                        className="stroke-brand-error"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />

                      {chartPaths.points.map((p) => {
                        const active = hoveredMonth === p.month
                        return (
                          <g
                            key={p.month}
                            onMouseEnter={() => setHoveredMonth(p.month)}
                            onMouseLeave={() => setHoveredMonth(null)}
                            className="cursor-pointer"
                          >
                            {active ? (
                              <line
                                x1={p.x}
                                y1="12"
                                x2={p.x}
                                y2="172"
                                stroke="#358DCC"
                                strokeWidth="1"
                                strokeDasharray="3 3"
                                opacity="0.55"
                              />
                            ) : null}
                            <circle
                              cx={p.x}
                              cy={p.yInflow}
                              r={active ? 5 : 4}
                              className="fill-brand-blue stroke-brand-surface"
                              strokeWidth="2"
                            />
                            <circle
                              cx={p.x}
                              cy={p.yOutflow}
                              r={active ? 5 : 4}
                              className="fill-brand-error stroke-brand-surface"
                              strokeWidth="2"
                            />
                            <text
                              x={p.x}
                              y="190"
                              textAnchor="middle"
                              className={`text-[10px] font-semibold ${
                                active ? 'fill-brand-text' : 'fill-brand-text-muted'
                              }`}
                            >
                              {p.label}
                            </text>
                          </g>
                        )
                      })}
                    </>
                  )}
                </svg>

                {hoveredMonth && chartPaths.points.length > 0 ? (
                  (() => {
                    const p = chartPaths.points.find((pt) => pt.month === hoveredMonth)
                    if (!p) return null
                    return (
                      <div className="mt-2 flex flex-wrap gap-3 rounded-lg border border-brand-whisper-border bg-brand-canvas px-3 py-2 text-[12px]">
                        <span className="font-bold text-brand-text">{p.label}</span>
                        <span className="text-brand-blue tabular-nums" dir="ltr">
                          Inflow {formatMoney(p.inflow, displayCurrency)}
                        </span>
                        <span className="text-brand-error tabular-nums" dir="ltr">
                          Outflow {formatMoney(p.outflow, displayCurrency)}
                        </span>
                        <span
                          className={`font-semibold tabular-nums ${
                            p.inflow - p.outflow >= 0 ? 'text-brand-blue' : 'text-brand-error'
                          }`}
                          dir="ltr"
                        >
                          Net {formatMoney(p.inflow - p.outflow, displayCurrency)}
                        </span>
                      </div>
                    )
                  })()
                ) : (
                  <p className="mt-2 text-[11px] text-brand-text-muted">
                    Hover a month for inflow / outflow breakdown. Values convert to {displayCurrency}.
                  </p>
                )}
              </div>
            </div>
            {/* Chart Legend */}
            <div className="flex gap-4 mt-2 justify-end text-[11px] font-bold">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-blue" />
                <span className="text-brand-text-muted">Inflows</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-error" />
                <span className="text-brand-text-muted">Outflows</span>
              </div>
            </div>
          </div>

          {/* Expense Donut Chart */}
          <div className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-5">
            <h2 className="font-display text-[15px] font-bold text-brand-text mb-4">Outflows by Category</h2>
            {donutSegments.length > 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:flex-col xl:flex-row">
                <div className="relative h-28 w-28 shrink-0">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    {/* Background Circle */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1F2128" strokeWidth="3" />
                    {/* Arc Segments */}
                    {donutSegments.map((seg, idx) => (
                      <circle
                        key={idx}
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        className={seg.colorClass}
                        strokeWidth="3.5"
                        strokeDasharray={seg.strokeDasharray}
                        strokeDashoffset={seg.strokeDashoffset}
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">Total</span>
                    <span className="text-[13px] font-extrabold text-brand-text">
                      {formatMoney(
                        categoryData.reduce((sum, c) => sum + c.total, 0),
                        displayCurrency
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  {donutSegments.map((seg, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${seg.bgClass}`} />
                        <span className="font-medium text-brand-text-muted truncate max-w-[100px] xl:max-w-[120px]">
                          {seg.category}
                        </span>
                      </div>
                      <span className="font-bold text-brand-text tabular-nums">
                        {seg.percentage.toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-brand-text-muted text-[13px] py-10">No outflows logged</p>
            )}
          </div>
        </div>

        {/* AI Optimization Brief Callout */}
        {optimizationIssues.length > 0 && (
          <div className="rounded-2xl border border-brand-warning/30 bg-brand-warning/5 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-warning/10 text-brand-warning">
                <AlertTriangle size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-[14px] font-bold text-brand-warning">
                  AI Spending Optimization Opportunity
                </h3>
                {optimizationIssues.map((issue, idx) => (
                  <div key={idx} className="mt-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="text-[13px] text-brand-text-muted leading-relaxed max-w-2xl">
                      {issue.desc}
                    </p>
                    <div className="shrink-0 flex items-center gap-2 rounded-lg bg-brand-warning/10 px-3 py-1.5 text-brand-warning">
                      <span className="text-[11px] font-bold uppercase tracking-wider">Potential Savings</span>
                      <span className="font-mono text-sm font-bold tabular-nums" dir="ltr">
                        {issue.savings}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ledger Table Section */}
        <div className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-4">
            <h2 className="font-display text-[15px] font-bold text-brand-text">Ledger List</h2>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search box */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted" />
                <input
                  type="text"
                  placeholder="Search ledger…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg border border-brand-input-border bg-brand-canvas pl-9 pr-3 py-1.5 text-[13px] text-brand-text placeholder:text-brand-text-muted outline-none focus:border-brand-blue/60 w-full sm:w-44"
                />
              </div>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e: any) => setTypeFilter(e.target.value)}
                className="rounded-lg border border-brand-input-border bg-brand-canvas px-3 py-1.5 text-[13px] text-brand-text outline-none focus:border-brand-blue/60"
              >
                <option value="all">All Types</option>
                <option value="inflow">Inflow</option>
                <option value="outflow">Outflow</option>
              </select>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-brand-input-border bg-brand-canvas px-3 py-1.5 text-[13px] text-brand-text outline-none focus:border-brand-blue/60"
              >
                <option value="all">All Categories</option>
                {categories.filter((c) => c !== 'all').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-brand-whisper-border text-brand-text-muted">
                  <th
                    onClick={() => toggleSort('date')}
                    className="cursor-pointer py-3 pr-4 font-bold select-none hover:text-brand-text"
                  >
                    <div className="flex items-center gap-1.5">
                      Date
                      <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th
                    onClick={() => toggleSort('category')}
                    className="cursor-pointer px-4 py-3 font-bold select-none hover:text-brand-text"
                  >
                    <div className="flex items-center gap-1.5">
                      Category
                      <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold">Description</th>
                  <th
                    onClick={() => toggleSort('type')}
                    className="cursor-pointer px-4 py-3 font-bold select-none hover:text-brand-text"
                  >
                    <div className="flex items-center gap-1.5">
                      Type
                      <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th
                    onClick={() => toggleSort('amount')}
                    className="cursor-pointer py-3 pl-4 font-bold select-none hover:text-brand-text text-right"
                  >
                    <div className="flex items-center gap-1.5 justify-end">
                      Amount
                      <ArrowUpDown size={12} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-whisper-border">
                {filteredTxns.map((t) => {
                  const displayAmt = convert(t.amount, t.currency, displayCurrency)
                  const isMultiCurrency = t.currency !== displayCurrency

                  return (
                    <tr key={t.id} className="hover:bg-brand-whisper-border/20">
                      <td className="py-3 pr-4 font-medium text-brand-text tabular-nums" dir="ltr">
                        {t.date}
                      </td>
                      <td className="px-4 py-3 text-brand-text-muted">
                        <span className="rounded bg-brand-whisper-border/30 px-2 py-0.5 text-[11px] font-semibold text-brand-text-muted">
                          {t.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-brand-text">{t.description || '—'}</span>
                          {t.recurring && (
                            <span className="text-[10px] text-brand-blue font-bold uppercase tracking-wider mt-0.5">
                              Monthly Recurring
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${
                            t.type === 'inflow'
                              ? 'bg-brand-blue/10 text-brand-blue'
                              : 'bg-brand-error/10 text-brand-error'
                          }`}
                        >
                          {t.type === 'inflow' ? 'Inflow' : 'Outflow'}
                        </span>
                      </td>
                      <td className="py-3 pl-4 text-right">
                        <div className="flex flex-col items-end">
                          <span
                            className={`font-bold tabular-nums ${
                              t.type === 'inflow' ? 'text-brand-blue' : 'text-brand-text'
                            }`}
                            dir="ltr"
                          >
                            {formatMoney(displayAmt, displayCurrency)}
                          </span>
                          {isMultiCurrency && (
                            <span className="text-[10px] text-brand-text-muted tabular-nums" dir="ltr">
                              ({formatMoney(t.amount, t.currency)} local)
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}

                {filteredTxns.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-brand-text-muted">
                      No matching transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
