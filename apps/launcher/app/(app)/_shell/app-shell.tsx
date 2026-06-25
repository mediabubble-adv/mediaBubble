'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Search,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  LogOut,
  ChevronDown,
  User,
} from 'lucide-react'
import { NAV_GROUPS, NAV_FOOTER, isActive, type NavItem } from './nav'
import { CommandPalette } from './command-palette'
import { MeetBubble } from '@/components/meet/meet-bubble'
import { MeetRail } from '@/components/meet/meet-rail'
import { moduleIdFromPathname } from '@/lib/dashboard/modules'

interface Notification {
  id: string
  type: string
  title: string
  body: string | null
  href: string | null
  read: boolean
  created_at: string
}

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

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const lastVisitRef = useRef<string | null>(null)
  useEffect(() => {
    const moduleId = moduleIdFromPathname(pathname)
    if (!moduleId || lastVisitRef.current === moduleId) return
    lastVisitRef.current = moduleId
    void fetch('/api/dashboard/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId }),
    })
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-background">
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
        <main className="flex min-h-0 min-w-0 flex-1 bg-gradient-to-b from-background via-background to-muted/20">
          <div className="min-w-0 flex-1 overflow-auto">{children}</div>
          <MeetRail />
        </main>
      </div>

      <MeetBubble />
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
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card/95 backdrop-blur-sm transition-[width,transform] duration-[250ms] ease-[var(--ease-drawer)] lg:static lg:translate-x-0 ${
        collapsed ? 'w-[68px]' : 'w-[260px]'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div
        className={`flex h-14 items-center border-b border-border/60 px-3.5 ${collapsed ? 'justify-center' : 'gap-2.5'}`}
      >
        <Link href="/" className="flex shrink-0 items-center" title="MediaBubble Launcher">
          <Image
            src="/assets/logo.svg"
            alt="MediaBubble"
            width={32}
            height={32}
            className="h-8 w-8 shrink-0"
          />
        </Link>
        {!collapsed ? (
          <div className="min-w-0">
            <span className="block truncate text-[13px] font-bold text-foreground">MediaBubble</span>
            <span className="block truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Launcher
            </span>
          </div>
        ) : null}
      </div>

      <nav data-tour="sidebar-nav" className="flex-1 overflow-y-auto px-2.5 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.id} className={collapsed ? 'mb-1' : 'mb-4'}>
            {!collapsed ? (
              <p className="launcher-section-label mb-1.5 px-2.5 text-[10px]">
                {group.label}
              </p>
            ) : null}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} collapsed={collapsed} pathname={pathname} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-0.5 border-t border-border px-2.5 py-2.5">
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
          ? 'bg-primary/12 text-foreground shadow-[inset_2px_0_0_0_hsl(var(--primary))]'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <Icon
        size={18}
        className={`shrink-0 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}
      />
      {!collapsed ? (
        <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
          <span className="truncate">{item.label}</span>
          {item.status ? (
            <span className="ml-auto shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
              {item.status}
            </span>
          ) : null}
        </span>
      ) : null}
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
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md lg:px-6 xl:px-8">
      <button
        type="button"
        onClick={onOpenMobile}
        className="text-muted-foreground transition-[color] hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <button
        type="button"
        onClick={onOpenPalette}
        data-tour="search-bar"
        className="flex h-9 w-full max-w-md flex-1 items-center gap-2 rounded-lg border border-input bg-card px-3 text-left text-[13px] text-muted-foreground transition-[border-color,box-shadow] duration-150 hover:border-primary/50 hover:shadow-[0_0_0_3px_hsl(210_88%_54%/0.08)] xl:max-w-xl"
      >
        <Search size={15} className="shrink-0" />
        <span className="flex-1 truncate">Search modules, tasks, clients…</span>
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold text-foreground sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="hidden flex-1 xl:block" />

      <NotificationBell />

      <UserMenu user={user} />
    </header>
  )
}

function UserMenu({ user }: { user: ShellUser }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

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
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[12px] font-bold text-primary ring-1 ring-primary/20">
          {user.initials}
        </span>
        <span className="hidden max-w-[120px] truncate text-left text-[12px] font-medium text-foreground lg:block">
          {user.name.split(/\s+/)[0]}
        </span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      <div
        role="menu"
        className={[
          'absolute right-0 top-[calc(100%+6px)] w-56 overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/30',
          'origin-top-right transition-[opacity,transform] duration-150 ease-[var(--ease-out)]',
          open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
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
        <Link
          href="/profile"
          role="menuitem"
          onClick={() => setOpen(false)}
          className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] text-foreground transition-[background-color] hover:bg-secondary"
        >
          <User size={15} className="text-muted-foreground" />
          Profile
        </Link>
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

function NotificationBell() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Notification[]>([])
  const [unread, setUnread] = useState(0)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/notifications')
      if (res.ok) {
        const json = await res.json()
        setItems(json.data.items)
        setUnread(json.data.unread_count)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [open])

  async function markAllRead() {
    const res = await fetch('/api/notifications/read-all', { method: 'POST' })
    if (!res.ok) return
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnread(0)
  }

  async function markRead(id: string, href: string | null) {
    const res = await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' })
    if (res.ok) {
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      setUnread((c) => Math.max(0, c - 1))
    }
    setOpen(false)
    if (href) router.push(href)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          const opening = !open
          setOpen(opening)
          if (opening) load()
        }}
        className="relative rounded-lg p-2 text-muted-foreground transition-[color,background-color] hover:bg-secondary hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unread > 0 ? (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            {unread > 9 ? '9+' : unread}
          </span>
        ) : null}
      </button>

      <div
        className={[
          'absolute right-0 top-[calc(100%+6px)] w-80 overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/30',
          'origin-top-right transition-[opacity,transform] duration-150 ease-[var(--ease-out)]',
          open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
          <span className="text-[13px] font-semibold text-foreground">Notifications</span>
          {unread > 0 ? (
            <button
              type="button"
              onClick={markAllRead}
              className="text-[11px] text-primary hover:underline"
            >
              Mark all read
            </button>
          ) : null}
        </div>

        <ul className="max-h-80 overflow-y-auto">
          {loading && items.length === 0 ? (
            <li className="px-3.5 py-6 text-center text-[12px] text-muted-foreground">Loading…</li>
          ) : items.length === 0 ? (
            <li className="px-3.5 py-6 text-center text-[12px] text-muted-foreground">
              No notifications yet.
            </li>
          ) : (
            items.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => markRead(n.id, n.href)}
                  className={`flex w-full gap-3 px-3.5 py-3 text-left transition-colors hover:bg-secondary ${!n.read ? 'bg-primary/5' : ''}`}
                >
                  {!n.read ? (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  ) : (
                    <span className="mt-1.5 h-2 w-2 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-foreground">{n.title}</p>
                    {n.body ? (
                      <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">{n.body}</p>
                    ) : null}
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {new Date(n.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
