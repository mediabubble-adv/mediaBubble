'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { User, Lock, Users, Sliders, CheckCircle2 } from 'lucide-react'
import { ProfileForm, type ProfileUser, UserAvatar } from '@/components/account/profile-form'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CURRENCIES, type CurrencyCode } from '@/lib/finance/currency'
import type { Role } from '@/lib/auth/rbac'

export interface WorkspacePrefs {
  timezone: string
  default_currency: string
  notifications: {
    email_digest: boolean
    task_reminders: boolean
    weekly_report: boolean
  }
}

const TIMEZONES: { value: string; label: string }[] = [
  { value: 'Africa/Cairo', label: 'Cairo (EET/EEST, UTC+2/3)' },
  { value: 'Asia/Riyadh', label: 'Riyadh (AST, UTC+3)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST, UTC+4)' },
  { value: 'Europe/London', label: 'London (GMT/BST, UTC+0/1)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST, UTC+1/2)' },
  { value: 'America/New_York', label: 'New York (ET, UTC-5/4)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PT, UTC-8/7)' },
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
]

export type SettingsUser = ProfileUser

interface TeamMember {
  id: string
  name: string
  email: string
  avatar_url: string | null
  role: string
  department: string | null
}

type Tab = 'profile' | 'security' | 'team' | 'workspace'

const ROLE_TONE: Record<string, 'blue' | 'warning' | 'danger' | 'neutral'> = {
  Admin: 'danger',
  Manager: 'warning',
  Contributor: 'blue',
  Viewer: 'neutral',
}

function SecurityTab() {
  const { toast } = useToast()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saving, setSaving] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const mismatch = next.length > 0 && confirm.length > 0 && next !== confirm
  const tooShort = next.length > 0 && next.length < 8

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (mismatch || tooShort) return
    setSaving(true)
    try {
      const res = await fetch('/api/settings/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: current,
          new_password: next,
          confirm_password: confirm,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        toast('error', json.message ?? 'Failed to change password')
        return
      }
      toast('success', 'Password changed')
      setCurrent('')
      setNext('')
      setConfirm('')
      formRef.current?.reset()
    } catch {
      toast('error', 'Network error — please try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[14px]">Change password</CardTitle>
        <CardDescription>Must be at least 8 characters.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current-pw">Current password</Label>
            <Input
              id="current-pw"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="new-pw">New password</Label>
            <Input
              id="new-pw"
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              autoComplete="new-password"
              required
              aria-invalid={tooShort}
            />
            {tooShort && (
              <p className="text-[11px] text-destructive">Must be at least 8 characters</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm-pw">Confirm new password</Label>
            <Input
              id="confirm-pw"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
              aria-invalid={mismatch}
            />
            {mismatch && (
              <p className="text-[11px] text-destructive">Passwords do not match</p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={saving}
            disabled={!current || !next || !confirm || mismatch || tooShort || saving}
          >
            Update password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function TeamTab({ members, currentUserId }: { members: TeamMember[]; currentUserId: string }) {
  const [q, setQ] = useState('')

  const filtered = members.filter((m) => {
    if (!q) return true
    const needle = q.toLowerCase()
    return (
      m.name.toLowerCase().includes(needle) ||
      m.email.toLowerCase().includes(needle) ||
      (m.department ?? '').toLowerCase().includes(needle) ||
      m.role.toLowerCase().includes(needle)
    )
  })

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name, email, or department…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-[13px] text-muted-foreground">No team members found.</p>
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border">
          {filtered.map((m) => (
            <div key={m.id} className="flex items-center gap-3 px-4 py-3">
              <UserAvatar name={m.name} avatarUrl={m.avatar_url} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[13px] font-medium text-foreground">{m.name}</span>
                  {m.id === currentUserId && (
                    <span className="shrink-0 text-[10px] text-muted-foreground">(you)</span>
                  )}
                </div>
                <p className="truncate text-[11px] text-muted-foreground">{m.email}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge tone={ROLE_TONE[m.role] ?? 'neutral'} className="text-[10px]">
                  {m.role}
                </Badge>
                {m.department && (
                  <span className="text-[10px] text-muted-foreground">{m.department}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          checked ? 'bg-primary' : 'bg-input',
        ].join(' ')}
      >
        <span
          className={[
            'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200',
            checked ? 'translate-x-4' : 'translate-x-0',
          ].join(' ')}
        />
      </button>
    </div>
  )
}

function WorkspaceTab({ initialPrefs }: { initialPrefs: WorkspacePrefs }) {
  const { toast } = useToast()
  const [timezone, setTimezone] = useState(initialPrefs.timezone)
  const [currency, setCurrency] = useState<string>(initialPrefs.default_currency)
  const [notifs, setNotifs] = useState(initialPrefs.notifications)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const isDirty =
    timezone !== initialPrefs.timezone ||
    currency !== initialPrefs.default_currency ||
    notifs.email_digest !== initialPrefs.notifications.email_digest ||
    notifs.task_reminders !== initialPrefs.notifications.task_reminders ||
    notifs.weekly_report !== initialPrefs.notifications.weekly_report

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/settings/workspace', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timezone,
          default_currency: currency,
          notifications: notifs,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        toast('error', json.message ?? 'Failed to save preferences')
        return
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      toast('success', 'Workspace preferences saved')
    } catch {
      toast('error', 'Network error — please try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Regional settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px]">Regional</CardTitle>
          <CardDescription>Timezone and display currency for your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone" className="w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground">
              Used for due dates, timestamps, and scheduled digests.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label>Default currency</Label>
            <div className="flex rounded-lg border border-border bg-card p-1 w-fit">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={[
                    'rounded-md px-3 py-1.5 text-[12px] font-semibold transition-colors',
                    currency === code
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:text-foreground',
                  ].join(' ')}
                >
                  {code} <span className="opacity-70">({CURRENCIES[code].symbol})</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Sets the default display currency on the Finance page.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification toggles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px]">Notifications</CardTitle>
          <CardDescription>Choose which updates you receive by email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Toggle
            checked={notifs.email_digest}
            onChange={(v) => setNotifs((n) => ({ ...n, email_digest: v }))}
            label="Daily email digest"
            description="A morning summary of open tasks and upcoming deadlines."
          />
          <Separator />
          <Toggle
            checked={notifs.task_reminders}
            onChange={(v) => setNotifs((n) => ({ ...n, task_reminders: v }))}
            label="Task reminders"
            description="Notify me 24 hours before a task I own is due."
          />
          <Separator />
          <Toggle
            checked={notifs.weekly_report}
            onChange={(v) => setNotifs((n) => ({ ...n, weekly_report: v }))}
            label="Weekly performance report"
            description="Sunday summary of your points, streaks, and leaderboard rank."
          />
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} isLoading={saving} disabled={!isDirty || saving}>
          {saved ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              Saved
            </span>
          ) : (
            'Save preferences'
          )}
        </Button>
        {isDirty && !saving && (
          <p className="text-[12px] text-muted-foreground">Unsaved changes</p>
        )}
      </div>
    </div>
  )
}

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'workspace', label: 'Workspace', icon: Sliders },
]

export function SettingsDashboard({
  user,
  team,
  workspacePrefs,
}: {
  user: SettingsUser
  team: TeamMember[]
  workspacePrefs: WorkspacePrefs
}) {
  const [tab, setTab] = useState<Tab>('profile')
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement>>>({})
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null)

  // offsetLeft is relative to the tablist's padding-box (our position:relative ancestor),
  // so it stays accurate regardless of page scroll — no getBoundingClientRect needed.
  const updatePill = useCallback(() => {
    const btn = tabRefs.current[tab]
    if (!btn) return
    setPill({ x: btn.offsetLeft, w: btn.offsetWidth })
  }, [tab])

  useEffect(() => {
    updatePill()
  }, [updatePill])

  // Re-measure on resize (flex-1 buttons reflow on window resize)
  useEffect(() => {
    window.addEventListener('resize', updatePill)
    return () => window.removeEventListener('resize', updatePill)
  }, [updatePill])

  return (
    <PageFrame>
      <PageHeader
        kicker="Settings"
        title="Account settings"
        description="Manage your profile, password, and team."
      />

      <div className="mt-8 flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-12">
        {/* Tab bar — horizontal on small screens, vertical on ultra-wide */}
        <div
          role="tablist"
          className="relative flex shrink-0 gap-1 rounded-lg border border-border bg-muted/30 p-1 xl:w-56 xl:flex-col xl:border-0 xl:bg-transparent xl:p-0"
        >
          {/* Sliding pill — hardware-accelerated via transform.
              left-0 anchors it to the padding-box edge; translateX moves it to the active tab. */}
          {pill && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-1 bottom-1 rounded-md bg-card shadow-sm transition-transform duration-200 ease-[var(--ease-out)] xl:hidden"
              style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}
            />
          )}

          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              ref={(el) => { tabRefs.current[id] = el ?? undefined }}
              role="tab"
              type="button"
              onClick={() => setTab(id)}
              aria-selected={tab === id}
              aria-controls={`tabpanel-${id}`}
              className={[
                'relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-150 xl:flex-none xl:justify-start xl:px-4 xl:py-2.5',
                tab === id
                  ? 'text-foreground xl:bg-card xl:shadow-sm xl:ring-1 xl:ring-border'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              <Icon size={14} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div className="min-w-0 flex-1 xl:max-w-3xl">
          <div id="tabpanel-profile" role="tabpanel" hidden={tab !== 'profile'}>
            <ProfileForm user={user} />
          </div>
          <div id="tabpanel-security" role="tabpanel" hidden={tab !== 'security'}>
            <SecurityTab />
          </div>
          <div id="tabpanel-team" role="tabpanel" hidden={tab !== 'team'}>
            <TeamTab members={team} currentUserId={user.id} />
          </div>
          <div id="tabpanel-workspace" role="tabpanel" hidden={tab !== 'workspace'}>
            <WorkspaceTab initialPrefs={workspacePrefs} />
          </div>
        </div>
      </div>
    </PageFrame>
  )
}
