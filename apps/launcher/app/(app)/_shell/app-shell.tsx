'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Rocket,
  Search,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import { NAV_ITEMS, NAV_FOOTER, isActive, type NavItem } from './nav'
import { CommandPalette } from './command-palette'

export interface ShellUser {
  name: string
  email: string
  role: string
  department: string | null
  initials: string
}

const COLLAPSE_KEY = 'mb_sidebar_collapsed'

export function AppShell({ user, children }: { user: ShellUser; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const pathname = usePathname()

  // Restore the persisted collapsed state on mount.
  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === '1')
  }, [])

  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      const next = !c
      localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0')
      return next
    })
  }, [])

  // Global Cmd/Ctrl+K opens the palette.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close the mobile drawer on navigation.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile backdrop */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        pathname={pathname}
        onToggleCollapsed={toggleCollapsed}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          user={user}
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenMobile={() => setMobileOpen(true)}
        />
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}

function Sidebar({
  collapsed,
  mobileOpen,
  pathname,
  onToggleCollapsed,
}: {
  collapsed: boolean
  mobileOpen: boolean
  pathname: string
  onToggleCollapsed: () => void
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card transition-[width,transform] duration-[250ms] ease-[var(--ease-drawer)] lg:static lg:translate-x-0 ${
        collapsed ? 'w-[64px]' : 'w-[240px]'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Brand */}
      <div className="flex h-14 items-center gap-2 px-3.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Rocket size={16} className="text-primary" />
        </div>
        {!collapsed ? (
          <span className="truncate text-[13px] font-bold text-foreground">MediaBubble</span>
        ) : null}
      </div>

      <nav data-tour="sidebar-nav" className="flex-1 space-y-1 px-2.5 py-2">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} collapsed={collapsed} pathname={pathname} />
        ))}
      </nav>

      <div className="space-y-1 border-t border-border px-2.5 py-2">
        {NAV_FOOTER.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            collapsed={collapsed}
            pathname={pathname}
            data-tour={item.href === '/settings' ? 'settings-link' : undefined}
          />
        ))}
        <button
          type="button"
          onClick={onToggleCollapsed}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden w-full items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] text-muted-foreground transition-[background-color,color] hover:bg-secondary hover:text-foreground lg:flex"
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          {!collapsed ? <span>Collapse</span> : null}
        </button>
      </div>
    </aside>
  )
}

function NavLink({
  item,
  collapsed,
  pathname,
  'data-tour': dataTour,
}: {
  item: NavItem
  collapsed: boolean
  pathname: string
  'data-tour'?: string
}) {
  const active = isActive(pathname, item.href)
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      data-tour={dataTour}
      className={`group flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-[transform,background-color,color] duration-150 ease-[var(--ease-out)] active:scale-[0.98] ${
        active
          ? 'bg-primary/10 text-foreground'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <Icon
        size={18}
        className={`shrink-0 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}
      />
      {!collapsed ? <span className="flex-1 truncate">{item.label}</span> : null}
    </Link>
  )
}

function Topbar({
  user,
  onOpenPalette,
  onOpenMobile,
}: {
  user: ShellUser
  onOpenPalette: () => void
  onOpenMobile: () => void
}) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
      <button
        type="button"
        onClick={onOpenMobile}
        className="text-muted-foreground transition-[color] hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Search trigger → opens Cmd+K */}
      <button
        type="button"
        onClick={onOpenPalette}
        data-tour="search-bar"
        className="flex h-9 max-w-sm flex-1 items-center gap-2 rounded-lg border border-input bg-card px-3 text-left text-[13px] text-muted-foreground transition-[border-color,box-shadow] duration-150 hover:border-primary/50 hover:shadow-[0_0_0_3px_hsl(210_88%_54%/0.08)]"
      >
        <Search size={15} className="shrink-0" />
        <span className="flex-1 truncate">Search…</span>
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold text-foreground sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="flex-1" />

      <button
        type="button"
        className="relative text-muted-foreground transition-[color] hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell size={18} />
      </button>

      <UserMenu user={user} />
    </header>
  )
}

function UserMenu({ user }: { user: ShellUser }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [open])

  async function signOut() {
    setPending(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/login')
    router.refresh()
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-[background-color] hover:bg-secondary"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[12px] font-bold text-primary">
          {user.initials}
        </span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Always rendered so CSS transition works; pointer-events gated by open state */}
      <div
        role="menu"
        className={[
          'absolute right-0 top-[calc(100%+6px)] w-56 overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/30',
          'origin-top-right transition-[opacity,transform] duration-150 ease-[var(--ease-out)]',
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none',
        ].join(' ')}
      >
        <div className="border-b border-border px-3.5 py-3">
          <p className="truncate text-[13px] font-bold text-foreground">{user.name}</p>
          <p className="truncate text-[12px] text-muted-foreground">{user.email}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {user.role}
            {user.department ? ` · ${user.department}` : ''}
          </p>
        </div>
        <button
          type="button"
          role="menuitem"
          onClick={signOut}
          disabled={pending}
          className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] text-foreground transition-[background-color] hover:bg-secondary disabled:opacity-60"
        >
          <LogOut size={15} className="text-muted-foreground" />
          {pending ? 'Signing out…' : 'Sign out'}
        </button>
      </div>
    </div>
  )
}
