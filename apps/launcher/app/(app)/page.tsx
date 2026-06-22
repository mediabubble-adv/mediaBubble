import type { CSSProperties } from 'react'
import Link from 'next/link'
import {
  CheckSquare,
  Wallet,
  Trophy,
  Clock,
  Building2,
  Bot,
  MessageSquare,
  Workflow,
  Megaphone,
  ShieldCheck,
  Database,
  Rocket,
  ArrowRight,
} from 'lucide-react'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const dynamic = 'force-dynamic'

const foundation = [
  { label: 'Database schema (Prisma, live Postgres)', icon: Database },
  { label: 'Authentication (JWT, RBAC, sessions)', icon: ShieldCheck },
  { label: 'App scaffold + nav shell', icon: Rocket },
]

const modules = [
  { name: 'Tasks', href: '/tasks', description: 'Kanban board, inline timers.', icon: CheckSquare },
  { name: 'Time', href: '/time', description: 'Timesheet, leave, capacity, approvals.', icon: Clock },
  { name: 'CRM', href: '/crm', description: 'Clients, invoices, quotations.', icon: Building2 },
  { name: 'Finance', href: '/finance', description: 'Cash flow, currencies, ledger.', icon: Wallet },
  { name: 'Leaderboard', href: '/leaderboard', description: 'XP levels, streaks, podium.', icon: Trophy },
  { name: 'AI Tools', href: '/ai', description: 'Prompt Studio, variable templates.', icon: Bot },
  { name: 'Chat', href: '/chat', description: 'Channels, realtime (Redis + WS).', icon: MessageSquare },
  { name: 'Automation', href: '/automation', description: 'Workflow triggers and test runs.', icon: Workflow },
  { name: 'Campaigns', href: '/campaigns', description: 'Proposals and live campaigns.', icon: Megaphone },
]

export default async function DashboardPage() {
  const session = await getServerSession()
  const record = session
    ? await prisma.users.findUnique({ where: { id: session.id }, select: { name: true } })
    : null
  const firstName = record?.name?.split(/\s+/)[0] ?? 'there'

  return (
    <div className="px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          Dashboard
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {firstName}
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
          All core modules are live. Jump in below or press{' '}
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[11px] font-semibold text-foreground">
            ⌘K
          </kbd>{' '}
          to search.
        </p>

        <Separator className="my-8" />

        {/* Foundation */}
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Foundation
          </h2>
          <ul className="mt-3 space-y-2">
            {foundation.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Card>
                  <CardContent className="flex items-center gap-3 px-4 py-3">
                    <Icon size={15} className="shrink-0 text-primary" />
                    <span className="flex-1 text-[13px] text-foreground">{label}</span>
                    <Badge tone="success" className="text-[10px]">Ready</Badge>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        {/* Modules */}
        <section className="mt-8">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Modules
          </h2>
          <div data-tour="modules-grid" data-stagger className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map(({ name, href, description, icon: Icon }, i) => (
              <Link
                key={name}
                href={href}
                style={{ '--i': i } as CSSProperties}
              >
                <Card className="group h-full transition-[transform,border-color,background-color] duration-150 ease-[var(--ease-out)] hover:border-primary/40 hover:bg-card/80 active:scale-[0.98]">
                  <CardContent className="flex flex-col p-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <h3 className="mt-3 font-display text-[15px] font-bold text-foreground">
                      {name}
                    </h3>
                    <p className="mt-1 flex-1 text-[12px] leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge tone="success">Live</Badge>
                      <ArrowRight
                        size={14}
                        className="text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
