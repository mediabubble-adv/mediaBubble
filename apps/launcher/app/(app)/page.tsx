import Link from 'next/link'
import { CheckSquare, Wallet, Trophy, Clock, ShieldCheck, Database, Rocket } from 'lucide-react'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

const foundation = [
  { label: 'Database schema (Prisma, live Postgres)', icon: Database },
  { label: 'Authentication (JWT, RBAC, sessions)', icon: ShieldCheck },
  { label: 'App scaffold + nav shell', icon: Rocket },
]

const modules = [
  { name: 'Tasks', href: '/tasks', description: 'Kanban board, inline timers.', icon: CheckSquare, status: 'Live' },
  { name: 'Time', href: '/time', description: 'Timesheet, weekly totals, billable hours.', icon: Clock, status: 'Phase 2' },
  { name: 'Finance', href: '/finance', description: 'Cash flow, currencies, ledger.', icon: Wallet, status: 'Live' },
  { name: 'Leaderboard', href: '/leaderboard', description: 'XP levels, streaks, podium.', icon: Trophy, status: 'Live' },
]

export default async function DashboardPage() {
  const session = await getServerSession()
  const record = session
    ? await prisma.users.findUnique({ where: { id: session.id }, select: { name: true } })
    : null
  const firstName = record?.name?.split(/\s+/)[0] ?? 'there'

  return (
    <div className="px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">
          Dashboard
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-brand-text">
          Welcome back, {firstName}
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] text-brand-text-muted">
          Phase 1 modules are live. Time Management is in active development — jump
          in below or press <kbd className="rounded border border-brand-whisper-border px-1.5 py-0.5 text-[11px] font-semibold">⌘K</kbd> to search.
        </p>

        <section className="mt-8">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-brand-text-muted">
            Foundation
          </h2>
          <ul className="mt-3 space-y-2">
            {foundation.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-brand-whisper-border bg-brand-surface px-4 py-3"
              >
                <Icon size={16} className="shrink-0 text-brand-blue" />
                <span className="flex-1 text-[14px] text-brand-text">{label}</span>
                <span className="text-[11px] font-bold text-brand-success">Ready</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-brand-text-muted">
            Modules
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {modules.map(({ name, href, description, icon: Icon, status }) => (
              <Link
                key={name}
                href={href}
                className="group rounded-xl border border-brand-whisper-border bg-brand-surface p-5 transition-all duration-200 hover:border-brand-blue/50 active:scale-[0.98]"
              >
                <Icon size={18} className="text-brand-blue" />
                <h3 className="mt-3 text-[15px] font-bold text-brand-text">{name}</h3>
                <p className="mt-1 text-[13px] text-brand-text-muted">{description}</p>
                <span className="mt-3 inline-block rounded-md bg-brand-yellow/[0.14] px-2 py-0.5 text-[11px] font-bold text-brand-text">
                  {status}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
