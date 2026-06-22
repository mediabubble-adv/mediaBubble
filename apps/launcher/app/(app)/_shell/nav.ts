// Primary navigation — grouped for ultra-wide sidebar.

import {
  LayoutDashboard,
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
  Settings,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  status?: string
}

export interface NavGroup {
  id: string
  label: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'operations',
    label: 'Operations',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard },
      { label: 'Tasks', href: '/tasks', icon: CheckSquare },
      { label: 'Time', href: '/time', icon: Clock },
    ],
  },
  {
    id: 'clients',
    label: 'Clients & revenue',
    items: [
      { label: 'CRM', href: '/crm', icon: Building2 },
      { label: 'Campaigns', href: '/campaigns', icon: Megaphone },
      { label: 'Finance', href: '/finance', icon: Wallet },
    ],
  },
  {
    id: 'intelligence',
    label: 'Marketing AI',
    items: [
      { label: 'OPUS', href: '/opus', icon: Sparkles, status: 'Command' },
      { label: 'AI Tools', href: '/ai', icon: Bot },
      { label: 'Automation', href: '/automation', icon: Workflow },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    items: [
      { label: 'Chat', href: '/chat', icon: MessageSquare },
      { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    ],
  },
]

/** Flat list for command palette and legacy callers. */
export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items)

export const NAV_FOOTER: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
]

export function isActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}
