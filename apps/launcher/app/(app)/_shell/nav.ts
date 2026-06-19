// Primary navigation, shared by the sidebar and the Cmd+K palette.

import {
  LayoutDashboard,
  CheckSquare,
  Wallet,
  Trophy,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  /** Phase the route ships in; shown as a hint in the palette. */
  status?: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Tasks', href: '/tasks', icon: CheckSquare, status: 'Week 3' },
  { label: 'Finance', href: '/finance', icon: Wallet, status: 'Week 4' },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy, status: 'Week 4' },
]

export const NAV_FOOTER: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
]

/** True when `pathname` is within `href` (handles the `/` root exactly). */
export function isActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}
