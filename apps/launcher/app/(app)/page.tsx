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
  TrendingUp,
  Users,
} from 'lucide-react'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PageFrame, PageHeader, PageSection } from '@/components/layout/page-frame'
import { DashboardMyTasks } from './dashboard-my-tasks'
import { DashboardActivityFeed } from './dashboard-activity-feed'

export const dynamic = 'force-dynamic'

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

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M EGP`
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K EGP`
  return `${amount.toLocaleString()} EGP`
}

export default async function DashboardPage() {
  const session = await getServerSession()
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    userRecord,
    openTasksCount,
    overdueTasksCount,
    myTasks,
    activeClientsCount,
    activeCampaignsCount,
    revenueResult,
    recentActivity,
  ] = await Promise.all([
    session
      ? prisma.users.findUnique({ where: { id: session.id }, select: { name: true } })
      : Promise.resolve(null),

    prisma.tasks.count({
      where: { deleted_at: null, status: { notIn: ['Done', 'Cancelled'] } },
    }),

    prisma.tasks.count({
      where: {
        deleted_at: null,
        status: { notIn: ['Done', 'Cancelled'] },
        due_date: { lt: now },
      },
    }),

    session
      ? prisma.tasks.findMany({
          where: {
            assigned_to: session.id,
            deleted_at: null,
            status: { notIn: ['Done', 'Cancelled'] },
          },
          select: { id: true, title: true, status: true, priority: true, due_date: true },
          orderBy: [{ due_date: 'asc' }, { updated_at: 'desc' }],
          take: 8,
        })
      : Promise.resolve([]),

    prisma.clients.count({ where: { status: 'active' } }),

    prisma.campaigns.count({ where: { status: { in: ['Active', 'In Progress'] } } }),

    prisma.invoices.aggregate({
      where: { status: 'Paid', paid_at: { gte: monthStart } },
      _sum: { total: true },
    }),

    prisma.activity_logs.findMany({
      orderBy: { created_at: 'desc' },
      take: 12,
      select: {
        id: true,
        action: true,
        entity_type: true,
        details: true,
        created_at: true,
        users: { select: { name: true } },
      },
    }),
  ])

  const firstName = userRecord?.name?.split(/\s+/)[0] ?? 'there'
  const revenueThisMonth = Number(revenueResult._sum.total ?? 0)

  const statCards = [
    {
      label: 'Open tasks',
      value: openTasksCount.toString(),
      hint: overdueTasksCount > 0 ? `${overdueTasksCount} overdue` : 'All on track',
      icon: CheckSquare,
      href: '/tasks',
      warn: overdueTasksCount > 0,
    },
    {
      label: 'Active clients',
      value: activeClientsCount.toString(),
      hint: 'On retainer or active contracts',
      icon: Users,
      href: '/crm',
      warn: false,
    },
    {
      label: 'Revenue this month',
      value: revenueThisMonth > 0 ? formatCurrency(revenueThisMonth) : '—',
      hint: revenueThisMonth > 0 ? 'Paid invoices' : 'No paid invoices yet',
      icon: TrendingUp,
      href: '/finance',
      warn: false,
    },
    {
      label: 'Active campaigns',
      value: activeCampaignsCount.toString(),
      hint: 'Running across all clients',
      icon: Megaphone,
      href: '/campaigns',
      warn: false,
    },
  ]

  const myTasksSerialized = myTasks.map((t) => ({
    id: t.id,
    title: t.title,
    status: t.status ?? 'Backlog',
    priority: t.priority ?? 'Medium',
    due_date: t.due_date ? t.due_date.toISOString().slice(0, 10) : null,
  }))

  const activitySerialized = recentActivity.map((a) => ({
    id: a.id,
    action: a.action,
    entity_type: a.entity_type,
    details: a.details as Record<string, unknown> | null,
    created_at: a.created_at.toISOString(),
    user_name: a.users?.name ?? null,
  }))

  return (
    <PageFrame>
      <PageHeader
        kicker="Dashboard"
        title={`Welcome back, ${firstName}`}
        description="Your command center. Press ⌘K to jump anywhere."
        icon={Zap}
      />

      {/* Live stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card
              className={`group h-full border-border/80 bg-card/80 transition-[border-color,transform] duration-150 hover:border-primary/40 active:scale-[0.99] ${
                stat.warn ? 'border-yellow-500/30 bg-yellow-500/[0.03]' : ''
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <stat.icon
                    size={15}
                    className={`transition-colors group-hover:text-primary ${
                      stat.warn ? 'text-yellow-500/70' : 'text-muted-foreground/50'
                    }`}
                  />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p
                  className={`mt-1 text-[12px] ${stat.warn ? 'text-yellow-500/80' : 'text-muted-foreground'}`}
                >
                  {stat.hint}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* My tasks + Activity feed */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">
        <DashboardMyTasks tasks={myTasksSerialized} />
        <DashboardActivityFeed items={activitySerialized} />
      </div>

      {/* Module quick-nav */}
      <div className="mt-10">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Quick navigation
        </p>
        <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-4">
          {moduleGroups.map((group) => (
            <PageSection key={group.title} title={group.title}>
              <div data-stagger className="grid gap-2.5">
                {group.items.map(({ name, href, description, icon: Icon, highlight }, i) => (
                  <Link key={name} href={href} style={{ '--i': i } as CSSProperties}>
                    <Card
                      className={`group h-full transition-[transform,border-color] duration-150 hover:border-primary/40 active:scale-[0.99] ${
                        highlight ? 'border-primary/30 bg-primary/[0.03]' : ''
                      }`}
                    >
                      <CardContent className="flex items-center gap-3 p-3.5">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            highlight ? 'bg-primary/15' : 'bg-primary/10'
                          }`}
                        >
                          <Icon size={15} className="text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-display text-[13px] font-bold text-foreground">
                              {name}
                            </h3>
                            {highlight ? (
                              <Badge tone="blue" className="text-[9px]">AI</Badge>
                            ) : (
                              <Badge tone="success" className="text-[9px]">Live</Badge>
                            )}
                          </div>
                          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                            {description}
                          </p>
                        </div>
                        <ArrowRight
                          size={13}
                          className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </PageSection>
          ))}
        </div>
      </div>
    </PageFrame>
  )
}
