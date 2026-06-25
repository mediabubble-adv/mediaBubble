'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Settings2, Users } from 'lucide-react'
import { hasAtLeast } from '@/lib/auth/rbac'
import type { Role } from '@/lib/auth/rbac'

export type SettingsTab = 'security' | 'workspace' | 'team'

const TAB_IDS: SettingsTab[] = ['security', 'workspace', 'team']

function parseTab(value: string | null): SettingsTab {
  if (value && TAB_IDS.includes(value as SettingsTab)) return value as SettingsTab
  return 'security'
}

interface NavItem {
  id: SettingsTab
  label: string
  icon: React.ElementType
}

interface NavGroup {
  label: string
  items: NavItem[]
  adminOnly?: boolean
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Account',
    items: [{ id: 'security', label: 'Security', icon: Lock }],
  },
  {
    label: 'Workspace',
    items: [{ id: 'workspace', label: 'Preferences', icon: Settings2 }],
  },
  {
    label: 'Admin',
    adminOnly: true,
    items: [{ id: 'team', label: 'Team', icon: Users }],
  },
]

export function SettingsShell({
  role,
  activeTab,
  children,
}: {
  role: Role
  activeTab: SettingsTab
  children: React.ReactNode
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isAdmin = hasAtLeast(role, 'Manager')

  function selectTab(tab: SettingsTab) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tab)
    router.replace(`/settings?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <nav className="shrink-0 lg:w-52" aria-label="Settings">
        <div className="space-y-6">
          {NAV_GROUPS.filter((g) => !g.adminOnly || isAdmin).map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => selectTab(id)}
                      aria-current={activeTab === id ? 'page' : undefined}
                      className={[
                        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors',
                        activeTab === id
                          ? 'bg-primary/10 text-foreground'
                          : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground',
                      ].join(' ')}
                    >
                      <Icon size={15} aria-hidden="true" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

export function SettingsTabFromUrl() {
  const searchParams = useSearchParams()
  return parseTab(searchParams.get('tab'))
}

export function SecurityProfileLink() {
  return (
    <p className="mb-5 text-[13px] text-muted-foreground">
      Update your{' '}
      <Link href="/profile" className="font-medium text-primary hover:underline">
        profile
      </Link>{' '}
      for display name, avatar, bio, and social links.
    </p>
  )
}
