import Link from 'next/link'
import { CheckSquare, Clock, MessageSquare, Trophy, Flame } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { UserGamificationStats } from '@/lib/gamification/user-stats'

export function ProfileStats({ stats }: { stats: UserGamificationStats }) {
  const items = [
    { label: 'Level', value: String(stats.level), hint: `${stats.xp.toLocaleString()} XP`, icon: Trophy, href: undefined },
    {
      label: 'Tasks done',
      value: String(stats.completedTasks),
      hint: 'Assigned and completed',
      icon: CheckSquare,
      href: '/tasks',
    },
    {
      label: 'Hours logged',
      value: String(stats.hoursLogged),
      hint: 'All time entries',
      icon: Clock,
      href: '/time',
    },
    {
      label: 'Comments',
      value: String(stats.comments),
      hint: stats.streak > 0 ? `${stats.streak}-day streak` : 'On tasks',
      icon: stats.streak > 0 ? Flame : MessageSquare,
      href: '/leaderboard',
    },
  ] as const

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value, hint, icon: Icon, href }) => {
        const inner = (
          <Card className="launcher-surface launcher-surface-interactive h-full">
            <CardContent className="flex items-start gap-3.5 p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/10">
                <Icon size={16} className="text-primary" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1 font-display text-xl font-bold tabular-nums text-foreground">{value}</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{hint}</p>
              </div>
            </CardContent>
          </Card>
        )

        return href ? (
          <Link key={label} href={href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            {inner}
          </Link>
        ) : (
          <div key={label}>{inner}</div>
        )
      })}
    </div>
  )
}
