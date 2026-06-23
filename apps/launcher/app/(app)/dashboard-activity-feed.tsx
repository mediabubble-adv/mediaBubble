'use client'

import {
  CheckSquare,
  Building2,
  Wallet,
  Megaphone,
  MessageSquare,
  Bot,
  Workflow,
  Clock,
  Trophy,
  Sparkles,
  User,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export interface ActivityItem {
  id: string
  action: string
  entity_type: string
  details: Record<string, unknown> | null
  created_at: string
  user_name: string | null
}

const ENTITY_ICONS: Record<string, LucideIcon> = {
  task: CheckSquare,
  tasks: CheckSquare,
  client: Building2,
  clients: Building2,
  invoice: Wallet,
  invoices: Wallet,
  campaign: Megaphone,
  campaigns: Megaphone,
  message: MessageSquare,
  messages: MessageSquare,
  prompt: Bot,
  prompts: Bot,
  workflow: Workflow,
  workflows: Workflow,
  leave_request: Clock,
  kpi: Trophy,
  opus: Sparkles,
}

const ENTITY_COLORS: Record<string, string> = {
  task: 'bg-primary/10 text-primary',
  tasks: 'bg-primary/10 text-primary',
  client: 'bg-blue-500/10 text-blue-500',
  clients: 'bg-blue-500/10 text-blue-500',
  invoice: 'bg-green-500/10 text-green-600 dark:text-green-400',
  invoices: 'bg-green-500/10 text-green-600 dark:text-green-400',
  campaign: 'bg-orange-500/10 text-orange-500',
  campaigns: 'bg-orange-500/10 text-orange-500',
  workflow: 'bg-purple-500/10 text-purple-500',
  workflows: 'bg-purple-500/10 text-purple-500',
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function humanizeAction(action: string, entity_type: string): string {
  const entity = entity_type.replace(/_/g, ' ').replace(/s$/, '')
  const verb = action.replace(/_/g, ' ')
  return `${verb} a ${entity}`
}

export function DashboardActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="border-border/80">
      <CardContent className="p-0">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Clock size={15} className="text-primary" />
          <h2 className="font-display text-[14px] font-bold text-foreground">Recent activity</h2>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <Clock size={28} className="text-muted-foreground/30" />
            <p className="text-[13px] text-muted-foreground">No activity yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {items.map((item) => {
              const key = item.entity_type.toLowerCase()
              const Icon = ENTITY_ICONS[key] ?? User
              const colorClass = ENTITY_COLORS[key] ?? 'bg-muted-foreground/10 text-muted-foreground'
              const detailTitle = item.details?.['title']
              const detailName = item.details?.['name']
              const label =
                typeof detailTitle === 'string'
                  ? detailTitle
                  : typeof detailName === 'string'
                    ? detailName
                    : humanizeAction(item.action, item.entity_type)

              return (
                <li key={item.id} className="flex items-start gap-3 px-5 py-3.5">
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${colorClass}`}
                  >
                    <Icon size={13} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-foreground">{label}</p>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      {item.user_name && (
                        <>
                          <span className="truncate font-medium">{item.user_name.split(' ')[0]}</span>
                          <span>·</span>
                        </>
                      )}
                      <span className="shrink-0">{item.action.replace(/_/g, ' ')}</span>
                      <span>·</span>
                      <span className="shrink-0">{formatRelative(item.created_at)}</span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
