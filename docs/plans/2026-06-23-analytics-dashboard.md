# Analytics Dashboard Implementation Plan

**Goal:** Build a real-time Analytics page (`/analytics`) with KPI stat cards, a 6-month revenue trend chart, and task/team panels — all wired to live Prisma data.

**Architecture:** A single `GET /api/analytics/overview` endpoint runs all aggregations in parallel via `Promise.all`, returning one payload. The Next.js page is a Server Component that fetches on the server and passes data down to lightweight client components. Charts follow the existing finance-dashboard pattern: pure SVG + math, no chart library needed.

**Tech Stack:** Next.js 15 App Router · Prisma · TypeScript · Tailwind · Lucide icons · Pure SVG charts

---

## Task 1: Analytics overview API route

**Files:**
- Create: `apps/launcher/app/api/analytics/overview/route.ts`

**What it returns:**
```ts
{
  revenue: {
    this_month: number,        // sum invoices.total this calendar month
    last_month: number,        // previous calendar month
    outstanding: number,       // invoices with status='sent'
    trend: { month: string, total: number }[]  // last 6 months, newest last
  },
  clients: {
    active: number,            // clients where status='active', not deleted
    new_this_month: number,    // created this calendar month
  },
  tasks: {
    total_open: number,        // not done, not deleted
    overdue: number,           // due_date < now, not done
    by_status: { status: string, count: number }[]
  },
  time: {
    hours_this_month: number,  // sum(duration_minutes)/60, current month
    hours_last_month: number,
  }
}
```

**Implementation:**

```ts
import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

function monthRange(monthsAgo: number) {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1)
  const end = new Date(now.getFullYear(), now.getMonth() - monthsAgo + 1, 0, 23, 59, 59, 999)
  return { start, end }
}

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const now = new Date()
  const thisMonth = monthRange(0)
  const lastMonth = monthRange(1)

  try {
    const [
      revenueThisMonth,
      revenueLastMonth,
      revenueOutstanding,
      revenueTrend,
      clientsActive,
      clientsNew,
      tasksOpen,
      tasksOverdue,
      tasksByStatus,
      timeThisMonth,
      timeLastMonth,
    ] = await Promise.all([
      // Revenue this month
      prisma.invoices.aggregate({
        where: { deleted_at: null, created_at: { gte: thisMonth.start, lte: thisMonth.end } },
        _sum: { total: true },
      }),
      // Revenue last month
      prisma.invoices.aggregate({
        where: { deleted_at: null, created_at: { gte: lastMonth.start, lte: lastMonth.end } },
        _sum: { total: true },
      }),
      // Outstanding (sent but unpaid)
      prisma.invoices.aggregate({
        where: { deleted_at: null, status: 'sent' },
        _sum: { total: true },
      }),
      // Revenue trend: last 6 months
      prisma.$queryRaw<{ month: string; total: number }[]>`
        SELECT
          TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') AS month,
          COALESCE(SUM(total), 0)::float AS total
        FROM invoices
        WHERE deleted_at IS NULL
          AND created_at >= DATE_TRUNC('month', NOW()) - INTERVAL '5 months'
        GROUP BY 1
        ORDER BY 1 ASC
      `,
      // Active clients
      prisma.clients.count({ where: { deleted_at: null, status: 'active' } }),
      // New clients this month
      prisma.clients.count({
        where: { deleted_at: null, created_at: { gte: thisMonth.start, lte: thisMonth.end } },
      }),
      // Open tasks
      prisma.tasks.count({ where: { deleted_at: null, status: { not: 'done' } } }),
      // Overdue tasks
      prisma.tasks.count({
        where: { deleted_at: null, status: { not: 'done' }, due_date: { lt: now } },
      }),
      // Tasks by status
      prisma.tasks.groupBy({
        by: ['status'],
        where: { deleted_at: null },
        _count: { id: true },
      }),
      // Billable hours this month
      prisma.time_entries.aggregate({
        where: { date: { gte: thisMonth.start, lte: thisMonth.end } },
        _sum: { duration_minutes: true },
      }),
      // Billable hours last month
      prisma.time_entries.aggregate({
        where: { date: { gte: lastMonth.start, lte: lastMonth.end } },
        _sum: { duration_minutes: true },
      }),
    ])

    // Fill in missing months in trend (ensure all 6 months appear)
    const trendMap = new Map(revenueTrend.map((r) => [r.month, Number(r.total)]))
    const trend = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      return { month: key, total: trendMap.get(key) ?? 0 }
    })

    return toResponse(
      ok(
        {
          revenue: {
            this_month: Number(revenueThisMonth._sum.total ?? 0),
            last_month: Number(revenueLastMonth._sum.total ?? 0),
            outstanding: Number(revenueOutstanding._sum.total ?? 0),
            trend,
          },
          clients: {
            active: clientsActive,
            new_this_month: clientsNew,
          },
          tasks: {
            total_open: tasksOpen,
            overdue: tasksOverdue,
            by_status: tasksByStatus.map((r) => ({
              status: r.status ?? 'unknown',
              count: r._count.id,
            })),
          },
          time: {
            hours_this_month: Math.round((timeThisMonth._sum.duration_minutes ?? 0) / 60),
            hours_last_month: Math.round((timeLastMonth._sum.duration_minutes ?? 0) / 60),
          },
        },
        'Analytics overview'
      )
    )
  } catch {
    return toResponse(fail('internal_error', 'Failed to load analytics', 500))
  }
}
```

**Verification:**
```bash
cd "/Users/Dorgham/Documents/Work/Devleopment/mediiabubble Main/apps/launcher" && npx tsc --noEmit 2>&1 | head -20
```

**Commit:**
```bash
git add apps/launcher/app/api/analytics/
git commit -m "feat(analytics): add GET /api/analytics/overview aggregation route"
```

---

## Task 2: Page skeleton, loading state, and nav entry

**Files:**
- Create: `apps/launcher/app/(app)/analytics/page.tsx`
- Create: `apps/launcher/app/(app)/analytics/loading.tsx`
- Modify: `apps/launcher/app/(app)/_shell/nav.ts`

**`page.tsx`** — server component, fetches overview:
```tsx
import { cookies } from 'next/headers'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { AnalyticsDashboard } from './analytics-dashboard'

export const dynamic = 'force-dynamic'

async function fetchOverview() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ')
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/analytics/overview`, {
      headers: { Cookie: cookieHeader },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.data
  } catch {
    return null
  }
}

export default async function AnalyticsPage() {
  const data = await fetchOverview()
  return (
    <PageFrame>
      <PageHeader
        kicker="Intelligence"
        title="Analytics"
        description="Revenue, clients, tasks, and team performance at a glance."
      />
      <div className="mt-8">
        <AnalyticsDashboard data={data} />
      </div>
    </PageFrame>
  )
}
```

**`loading.tsx`** — skeleton:
```tsx
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { Card, CardContent } from '@/components/ui/card'

export default function Loading() {
  return (
    <PageFrame>
      <PageHeader kicker="Intelligence" title="Analytics" description="Loading..." />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="mt-3 h-8 w-32 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    </PageFrame>
  )
}
```

**Nav entry** — add `Analytics` to the `clients` group in `nav.ts`:
```ts
import { BarChart3 } from 'lucide-react'
// In the 'clients' group items array, add after Finance:
{ label: 'Analytics', href: '/analytics', icon: BarChart3 },
```

**Commit:**
```bash
git add apps/launcher/app/(app)/analytics/ apps/launcher/app/(app)/_shell/nav.ts
git commit -m "feat(analytics): page skeleton, loading state, nav entry"
```

---

## Task 3: KPI stat cards + `AnalyticsDashboard` component

**Files:**
- Create: `apps/launcher/app/(app)/analytics/analytics-dashboard.tsx`

**Component structure:**
```tsx
'use client'

import { TrendingUp, TrendingDown, Users, CheckSquare, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface AnalyticsData { /* shape from API */ }

function delta(current: number, previous: number) {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 100)
}

function StatCard({
  label,
  value,
  sub,
  pct,
  icon: Icon,
}: {
  label: string
  value: string
  sub?: string
  pct?: number | null
  icon: React.ElementType
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-[12px] font-medium text-muted-foreground">{label}</p>
          <Icon size={14} className="text-muted-foreground" />
        </div>
        <p className="mt-2 text-[26px] font-bold leading-none tracking-tight">{value}</p>
        {sub && <p className="mt-1 text-[11px] text-muted-foreground">{sub}</p>}
        {pct != null && (
          <p className={`mt-1.5 flex items-center gap-1 text-[11px] font-medium ${pct >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {pct >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(pct)}% vs last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export function AnalyticsDashboard({ data }: { data: AnalyticsData | null }) {
  if (!data) return <p className="text-[13px] text-muted-foreground">Could not load analytics data.</p>

  const revDelta = delta(data.revenue.this_month, data.revenue.last_month)
  const hoursDelta = delta(data.time.hours_this_month, data.time.hours_last_month)

  return (
    <div className="space-y-8">
      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Revenue this month"
          value={`$${(data.revenue.this_month / 100).toLocaleString()}`}
          sub={`$${(data.revenue.outstanding / 100).toLocaleString()} outstanding`}
          pct={revDelta}
          icon={DollarSign}
        />
        <StatCard
          label="Active clients"
          value={String(data.clients.active)}
          sub={`+${data.clients.new_this_month} new this month`}
          icon={Users}
        />
        <StatCard
          label="Open tasks"
          value={String(data.tasks.total_open)}
          sub={data.tasks.overdue > 0 ? `${data.tasks.overdue} overdue` : 'None overdue'}
          icon={CheckSquare}
        />
        <StatCard
          label="Billable hours"
          value={String(data.time.hours_this_month)}
          sub="this month"
          pct={hoursDelta}
          icon={Clock}
        />
      </div>

      {/* Charts row — implemented in Tasks 4 & 5 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* RevenueTrendChart will go here */}
        {/* TaskStatusPanel will go here */}
      </div>
    </div>
  )
}
```

Note: `invoices.total` is stored as a `Decimal` in Prisma. Divide by 100 only if amounts are stored in cents. Check the schema — if it's dollars already, skip the `/100`.

**Verification:** Run `npx tsc --noEmit`, check no errors.

**Commit:**
```bash
git add apps/launcher/app/(app)/analytics/analytics-dashboard.tsx
git commit -m "feat(analytics): KPI stat cards grid"
```

---

## Task 4: Revenue trend SVG bar chart

**Files:**
- Create: `apps/launcher/app/(app)/analytics/revenue-trend-chart.tsx`
- Modify: `apps/launcher/app/(app)/analytics/analytics-dashboard.tsx` (add chart to layout)

**Chart component** — follows the finance-dashboard SVG pattern:
```tsx
'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TrendPoint { month: string; total: number }

function formatMonth(m: string) {
  const [y, mo] = m.split('-')
  return new Date(Number(y), Number(mo) - 1, 1).toLocaleString('default', { month: 'short' })
}

export function RevenueTrendChart({ trend }: { trend: TrendPoint[] }) {
  const { bars, yLabels, maxVal } = useMemo(() => {
    const maxVal = Math.max(...trend.map((t) => t.total), 1)
    const CHART_H = 120
    const bars = trend.map((t, i) => ({
      x: i,
      height: (t.total / maxVal) * CHART_H,
      label: formatMonth(t.month),
      value: t.total,
    }))
    const steps = 4
    const yLabels = Array.from({ length: steps + 1 }, (_, i) =>
      Math.round((maxVal / steps) * i)
    ).reverse()
    return { bars, yLabels, maxVal }
  }, [trend])

  const W = 480
  const H = 160
  const PAD_L = 48
  const PAD_B = 24
  const CHART_H = 120
  const CHART_W = W - PAD_L - 8
  const barW = Math.floor(CHART_W / trend.length) - 4

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-[14px]">Revenue trend</CardTitle>
      </CardHeader>
      <CardContent>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
          {/* Y-axis labels */}
          {yLabels.map((val, i) => {
            const y = PAD_B - 4 + (i / (yLabels.length - 1)) * CHART_H
            return (
              <text key={i} x={PAD_L - 6} y={y} textAnchor="end" className="fill-muted-foreground text-[9px]" fontSize={9}>
                ${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
              </text>
            )
          })}
          {/* Grid lines */}
          {yLabels.map((_, i) => {
            const y = PAD_B - 4 + (i / (yLabels.length - 1)) * CHART_H
            return <line key={i} x1={PAD_L} x2={W - 8} y1={y} y2={y} stroke="currentColor" strokeOpacity={0.08} />
          })}
          {/* Bars */}
          {bars.map((b, i) => {
            const x = PAD_L + i * (CHART_W / trend.length) + 2
            const y = PAD_B - 4 + CHART_H - b.height
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={b.height}
                  rx={3}
                  className="fill-primary/80 transition-all hover:fill-primary"
                />
                <text x={x + barW / 2} y={H - 4} textAnchor="middle" fontSize={9} className="fill-muted-foreground">
                  {b.label}
                </text>
              </g>
            )
          })}
        </svg>
      </CardContent>
    </Card>
  )
}
```

**Wire into `analytics-dashboard.tsx`:**
```tsx
import { RevenueTrendChart } from './revenue-trend-chart'
// Replace the chart placeholder comment:
<RevenueTrendChart trend={data.revenue.trend} />
```

**Commit:**
```bash
git add apps/launcher/app/(app)/analytics/revenue-trend-chart.tsx apps/launcher/app/(app)/analytics/analytics-dashboard.tsx
git commit -m "feat(analytics): revenue trend SVG bar chart"
```

---

## Task 5: Task status panel + billable hours by member table

**Files:**
- Create: `apps/launcher/app/(app)/analytics/task-status-panel.tsx`
- Modify: `apps/launcher/app/(app)/analytics/analytics-dashboard.tsx` (wire panel)

**Task status panel** — donut SVG + legend:
```tsx
'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatusCount { status: string; count: number }

const STATUS_COLORS: Record<string, string> = {
  todo: '#6366f1',
  in_progress: '#f59e0b',
  in_review: '#8b5cf6',
  done: '#22c55e',
  blocked: '#ef4444',
}

function labelFor(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function TaskStatusPanel({ byStatus }: { byStatus: StatusCount[] }) {
  const total = byStatus.reduce((s, r) => s + r.count, 0)
  const R = 44
  const CX = 60
  const CY = 60
  const CIRCUMFERENCE = 2 * Math.PI * R

  const arcs = useMemo(() => {
    let offset = 0
    return byStatus.map((r) => {
      const pct = total > 0 ? r.count / total : 0
      const dash = pct * CIRCUMFERENCE
      const arc = { ...r, pct, dash, offset }
      offset += dash
      return arc
    })
  }, [byStatus, total, CIRCUMFERENCE])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-[14px]">Tasks by status</CardTitle>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <p className="py-4 text-center text-[12px] text-muted-foreground">No tasks yet</p>
        ) : (
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 120 120" className="w-24 shrink-0">
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="currentColor" strokeOpacity={0.08} strokeWidth={16} />
              {arcs.map((a, i) => (
                <circle
                  key={i}
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke={STATUS_COLORS[a.status] ?? '#94a3b8'}
                  strokeWidth={16}
                  strokeDasharray={`${a.dash} ${CIRCUMFERENCE - a.dash}`}
                  strokeDashoffset={-a.offset}
                  transform={`rotate(-90 ${CX} ${CY})`}
                />
              ))}
              <text x={CX} y={CY + 4} textAnchor="middle" fontSize={14} fontWeight="bold" className="fill-foreground">
                {total}
              </text>
            </svg>
            <ul className="space-y-1.5">
              {arcs.map((a) => (
                <li key={a.status} className="flex items-center gap-2 text-[12px]">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: STATUS_COLORS[a.status] ?? '#94a3b8' }}
                  />
                  <span className="text-muted-foreground">{labelFor(a.status)}</span>
                  <span className="ml-auto font-medium">{a.count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
```

**Wire into `analytics-dashboard.tsx`:**
```tsx
import { TaskStatusPanel } from './task-status-panel'
// Replace the panel placeholder comment:
<TaskStatusPanel byStatus={data.tasks.by_status} />
```

**Commit:**
```bash
git add apps/launcher/app/(app)/analytics/task-status-panel.tsx apps/launcher/app/(app)/analytics/analytics-dashboard.tsx
git commit -m "feat(analytics): task status donut chart"
```

---

## Task 6: Final tsc check + push + PR

**Steps:**

1. Full typecheck:
```bash
cd "/Users/Dorgham/Documents/Work/Devleopment/mediiabubble Main/apps/launcher" && npx tsc --noEmit 2>&1
```
Fix any errors, commit the fix.

2. Push:
```bash
cd "/Users/Dorgham/Documents/Work/Devleopment/mediiabubble Main" && git push -u origin feat/analytics-dashboard
```

3. Open PR:
```bash
gh pr create \
  --title "feat(launcher): Analytics Dashboard — revenue trend, KPIs, task breakdown" \
  --body "$(cat <<'EOF'
## Summary

- New `/analytics` page added to nav (Clients & revenue group)
- `GET /api/analytics/overview` — single endpoint aggregating 11 Prisma queries in parallel
- KPI stat cards: Revenue this month (vs last month delta), Active clients, Open tasks, Billable hours
- Revenue trend SVG bar chart (last 6 months)
- Task status donut chart (by status with color coding)
- Server-rendered page with `loading.tsx` skeleton; all data fetched server-side

## Test plan

- [ ] Navigate to /analytics — stat cards load with real data
- [ ] Revenue trend bar chart shows last 6 months (older months show 0 if no data)
- [ ] Task status donut reflects actual task counts by status
- [ ] Delta % shown on revenue and billable hours vs previous month
- [ ] Outstanding invoices shown as sub-label on revenue card

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

4. Report PR URL and confirm clean tsc.

---

## Notes

- **`invoices.total` is a Prisma `Decimal`** — wrap in `Number(...)` before math. The `/100` in the UI is a placeholder; remove it if amounts are stored as full dollars (check schema).
- **`$queryRaw` for the trend** requires PostgreSQL `TO_CHAR` / `DATE_TRUNC` — confirm the DB is Postgres (it is, per schema). The raw query returns `total` as a string from the DB driver; cast with `Number(r.total)`.
- **`force-dynamic`** on the page is correct — analytics must not be cached.
- **Branch**: create `feat/analytics-dashboard` off `master` before starting Task 1.
