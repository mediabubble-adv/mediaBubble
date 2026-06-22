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
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PageFrame, PageHeader, PageSection } from '@/components/layout/page-frame'

export const dynamic = 'force-dynamic'

const quickStats = [
  { label: 'Modules live', value: '11', hint: 'Full ops stack' },
  { label: 'Markets', value: 'EG + AE', hint: 'Bilingual ready' },
  { label: 'OPUS', value: 'Active', hint: 'Marketing AI layer' },
]

const moduleGroups = [
  {
    title: 'Operations',
    items: [
      { name: 'Tasks', href: '/tasks', description: 'Kanban, timers, drag-and-drop.', icon: CheckSquare },
      { name: 'Time', href: '/time', description: 'Timesheets, leave, capacity.', icon: Clock },
    ],
  },
  {
    title: 'Clients & revenue',
    items: [
      { name: 'CRM', href: '/crm', description: 'Clients, invoices, quotations.', icon: Building2 },
      { name: 'Campaigns', href: '/campaigns', description: 'Proposals and live campaigns.', icon: Megaphone },
      { name: 'Finance', href: '/finance', description: 'Cash flow, currencies, ledger.', icon: Wallet },
    ],
  },
  {
    title: 'Marketing AI',
    items: [
      { name: 'OPUS', href: '/opus', description: 'Brief → campaign → performance.', icon: Sparkles, highlight: true },
      { name: 'AI Tools', href: '/ai', description: 'Prompt studio and templates.', icon: Bot },
      { name: 'Automation', href: '/automation', description: 'Workflow triggers and runs.', icon: Workflow },
    ],
  },
  {
    title: 'Team',
    items: [
      { name: 'Chat', href: '/chat', description: 'Channels and realtime comms.', icon: MessageSquare },
      { name: 'Leaderboard', href: '/leaderboard', description: 'XP, streaks, podium.', icon: Trophy },
    ],
  },
]

export default async function DashboardPage() {
  const session = await getServerSession()
  const record = session
    ? await prisma.users.findUnique({ where: { id: session.id }, select: { name: true } })
    : null
  const firstName = record?.name?.split(/\s+/)[0] ?? 'there'

  return (
    <PageFrame>
      <PageHeader
        kicker="Dashboard"
        title={`Welcome back, ${firstName}`}
        description="Your command center for operations, clients, and marketing AI. Press ⌘K to jump anywhere."
        icon={Zap}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3 2xl:grid-cols-3">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="border-border/80 bg-card/80">
            <CardContent className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-2 2xl:grid-cols-4">
        {moduleGroups.map((group) => (
          <PageSection key={group.title} title={group.title}>
            <div data-stagger className="grid gap-3">
              {group.items.map(({ name, href, description, icon: Icon, highlight }, i) => (
                <Link
                  key={name}
                  href={href}
                  style={{ '--i': i } as CSSProperties}
                >
                  <Card
                    className={`group h-full transition-[transform,border-color,background-color] duration-150 ease-[var(--ease-out)] hover:border-primary/40 active:scale-[0.99] ${
                      highlight ? 'border-primary/30 bg-primary/[0.03]' : ''
                    }`}
                  >
                    <CardContent className="flex items-start gap-4 p-4">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          highlight ? 'bg-primary/15' : 'bg-primary/10'
                        }`}
                      >
                        <Icon size={17} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-[14px] font-bold text-foreground">{name}</h3>
                          {highlight ? (
                            <Badge tone="blue" className="text-[9px]">
                              AI
                            </Badge>
                          ) : (
                            <Badge tone="success" className="text-[9px]">
                              Live
                            </Badge>
                          )}
                        </div>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
                          {description}
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </PageSection>
        ))}
      </div>

      <Card className="mt-10 border-primary/25 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold text-foreground">OPUS Command Center</p>
            <p className="mt-1 max-w-xl text-[13px] text-muted-foreground">
              Autonomous marketing orchestration — briefs, triggers, usage, and campaign performance in one flow.
            </p>
          </div>
          <Link
            href="/opus"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Open OPUS
            <ArrowRight size={15} />
          </Link>
        </CardContent>
      </Card>
    </PageFrame>
  )
}
