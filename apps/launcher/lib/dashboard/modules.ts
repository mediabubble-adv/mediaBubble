export type ModuleIconId =
  | 'check-square'
  | 'clock'
  | 'building-2'
  | 'megaphone'
  | 'wallet'
  | 'sparkles'
  | 'bot'
  | 'workflow'
  | 'message-square'
  | 'trophy'

/** Serializable module definition — safe to pass from Server to Client Components. */
export interface DashboardModule {
  id: string
  name: string
  href: string
  description: string
  iconId: ModuleIconId
  group: string
  highlight?: boolean
}

export const DASHBOARD_MODULES: DashboardModule[] = [
  { id: 'tasks', name: 'Tasks', href: '/tasks', description: 'Kanban, timers, drag-and-drop.', iconId: 'check-square', group: 'Operations' },
  { id: 'time', name: 'Time', href: '/time', description: 'Timesheets, leave, capacity.', iconId: 'clock', group: 'Operations' },
  { id: 'crm', name: 'CRM', href: '/crm', description: 'Clients, invoices, quotations.', iconId: 'building-2', group: 'Clients & revenue' },
  { id: 'campaigns', name: 'Campaigns', href: '/campaigns', description: 'Proposals and live campaigns.', iconId: 'megaphone', group: 'Clients & revenue' },
  { id: 'finance', name: 'Finance', href: '/finance', description: 'Cash flow, currencies, ledger.', iconId: 'wallet', group: 'Clients & revenue' },
  { id: 'opus', name: 'OPUS', href: '/opus', description: 'Brief → campaign → performance.', iconId: 'sparkles', group: 'Marketing AI', highlight: true },
  { id: 'ai', name: 'AI Tools', href: '/ai', description: 'Prompt studio and templates.', iconId: 'bot', group: 'Marketing AI' },
  { id: 'automation', name: 'Automation', href: '/automation', description: 'Workflow triggers and runs.', iconId: 'workflow', group: 'Marketing AI' },
  { id: 'meet', name: 'Meet', href: '/meet', description: 'Channels, DMs & live studio feed.', iconId: 'message-square', group: 'Team' },
  { id: 'leaderboard', name: 'Leaderboard', href: '/leaderboard', description: 'XP, streaks, podium.', iconId: 'trophy', group: 'Team' },
]

const MODULE_BY_HREF = new Map(DASHBOARD_MODULES.map((m) => [m.href, m]))
const MODULE_BY_ID = new Map(DASHBOARD_MODULES.map((m) => [m.id, m]))

export function moduleIdFromPathname(pathname: string): string | null {
  if (pathname === '/') return null
  const exact = MODULE_BY_HREF.get(pathname)
  if (exact) return exact.id
  const prefix = DASHBOARD_MODULES.find(
    (m) => m.href !== '/' && pathname.startsWith(`${m.href}/`),
  )
  return prefix?.id ?? null
}

export function sortModulesByOrder(
  order: string[] | null | undefined,
  usage: Record<string, number> | null | undefined,
): DashboardModule[] {
  const modules = [...DASHBOARD_MODULES]
  const usageMap = usage ?? {}

  if (order?.length) {
    const rank = new Map(order.map((id, i) => [id === 'chat' ? 'meet' : id, i]))
    modules.sort((a, b) => {
      const ra = rank.get(a.id) ?? 999
      const rb = rank.get(b.id) ?? 999
      if (ra !== rb) return ra - rb
      return (usageMap[b.id] ?? 0) - (usageMap[a.id] ?? 0)
    })
    return modules
  }

  modules.sort((a, b) => (usageMap[b.id] ?? 0) - (usageMap[a.id] ?? 0))
  return modules
}

export function getModuleById(id: string): DashboardModule | undefined {
  return MODULE_BY_ID.get(id)
}
