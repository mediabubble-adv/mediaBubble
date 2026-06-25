'use client'

import { Suspense, useState, useRef } from 'react'
import Link from 'next/link'
import { CheckCircle2, Settings2 } from 'lucide-react'
import { UserAvatar } from '@/components/account/profile-form'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import {
  SettingsShell,
  SettingsTabFromUrl,
  SecurityProfileLink,
  type SettingsTab,
} from '@/components/settings/settings-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import { hasAtLeast } from '@/lib/auth/rbac'
import type { Role } from '@/lib/auth/rbac'
import type { WorkspacePrefs } from '@/app/api/settings/workspace/route'

interface TeamMember {
  id: string
  name: string
  email: string
  avatar_url: string | null
  role: string
  department: string | null
}

const ROLE_TONE: Record<string, 'blue' | 'warning' | 'danger' | 'neutral'> = {
  Admin: 'danger',
  Manager: 'warning',
  Contributor: 'blue',
  Viewer: 'neutral',
}

const TIMEZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'Africa/Cairo', label: 'Cairo (UTC+2)' },
  { value: 'Asia/Dubai', label: 'Dubai (UTC+4)' },
  { value: 'Asia/Riyadh', label: 'Riyadh (UTC+3)' },
  { value: 'Europe/London', label: 'London (UTC+0/+1)' },
  { value: 'Europe/Paris', label: 'Paris (UTC+1/+2)' },
  { value: 'America/New_York', label: 'New York (UTC−5/−4)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (UTC−8/−7)' },
]

const DATE_FORMATS: { value: WorkspacePrefs['date_format']; label: string }[] = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
]

const LANGUAGES: { value: WorkspacePrefs['language']; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
]

function SecurityPanel() {
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
    <div>
      <SecurityProfileLink />
      <Card className="launcher-surface">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="text-[15px] font-semibold">Change password</CardTitle>
          <CardDescription className="mt-1">Must be at least 8 characters.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
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
    </div>
  )
}

function TeamPanel({ members, currentUserId }: { members: TeamMember[]; currentUserId: string }) {
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
    <Card className="launcher-surface">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="text-[15px] font-semibold">Team directory</CardTitle>
        <CardDescription className="mt-1">Active teammates in MediaBubble Launcher.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
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
                <Link href={`/profile/${m.id}`} className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <UserAvatar name={m.name} avatarUrl={m.avatar_url} size="sm" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/profile/${m.id}`}
                      className="truncate text-[13px] font-medium text-foreground hover:text-primary hover:underline"
                    >
                      {m.name}
                    </Link>
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
      </CardContent>
    </Card>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        checked ? 'bg-primary' : 'bg-input',
      ].join(' ')}
    >
      <span
        className={[
          'pointer-events-none inline-block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform duration-150',
          checked ? 'translate-x-4' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  )
}

function WorkspacePanel({ prefs }: { prefs: WorkspacePrefs }) {
  const { toast } = useToast()
  const [form, setForm] = useState<WorkspacePrefs>({ ...prefs })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const isDirty = JSON.stringify(form) !== JSON.stringify(prefs)

  function set<K extends keyof WorkspacePrefs>(key: K, value: WorkspacePrefs[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/settings/workspace', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    <div className="space-y-5">
      <Card className="launcher-surface">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="text-[15px] font-semibold">Regional</CardTitle>
          <CardDescription className="mt-1">Timezone, date format, and display language.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-1.5">
            <Label htmlFor="tz">Timezone</Label>
            <Select value={form.timezone} onValueChange={(v) => set('timezone', v)}>
              <SelectTrigger id="tz">
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
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="date-fmt">Date format</Label>
            <Select
              value={form.date_format}
              onValueChange={(v) => set('date_format', v as WorkspacePrefs['date_format'])}
            >
              <SelectTrigger id="date-fmt">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {DATE_FORMATS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lang">Language</Label>
            <Select
              value={form.language}
              onValueChange={(v) => set('language', v as WorkspacePrefs['language'])}
            >
              <SelectTrigger id="lang">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="launcher-surface">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="text-[15px] font-semibold">Notifications</CardTitle>
          <CardDescription className="mt-1">Choose how you want to be notified.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-[13px] font-medium text-foreground">Email notifications</p>
              <p className="text-[11px] text-muted-foreground">
                Receive updates and alerts via email.
              </p>
            </div>
            <Toggle
              checked={form.email_notifications}
              onChange={(v) => set('email_notifications', v)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-[13px] font-medium text-foreground">In-app notifications</p>
              <p className="text-[11px] text-muted-foreground">
                Show notifications inside the platform.
              </p>
            </div>
            <Toggle
              checked={form.app_notifications}
              onChange={(v) => set('app_notifications', v)}
            />
          </div>
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

function SettingsContent({
  userId,
  role,
  team,
  workspacePrefs,
  activeTab,
}: {
  userId: string
  role: Role
  team: TeamMember[]
  workspacePrefs: WorkspacePrefs
  activeTab: SettingsTab
}) {
  if (activeTab === 'team' && !hasAtLeast(role, 'Manager')) {
    return (
      <p className="text-[13px] text-muted-foreground">
        Team settings require Manager access.{' '}
        <Link href="/settings?tab=security" className="text-primary hover:underline">
          Go to Security
        </Link>
      </p>
    )
  }

  switch (activeTab) {
    case 'security':
      return <SecurityPanel />
    case 'workspace':
      return <WorkspacePanel prefs={workspacePrefs} />
    case 'team':
      return <TeamPanel members={team} currentUserId={userId} />
    default: {
      const _exhaustive: never = activeTab
      void _exhaustive
      return null
    }
  }
}

function SettingsDashboardInner({
  userId,
  role,
  team,
  workspacePrefs,
}: {
  userId: string
  role: Role
  team: TeamMember[]
  workspacePrefs: WorkspacePrefs
}) {
  const activeTab = SettingsTabFromUrl()

  return (
    <PageFrame width="full">
      <PageHeader
        icon={Settings2}
        kicker="Account"
        title="Settings"
        description="Password, workspace preferences, and team administration."
      />

      <div className="mt-10">
        <SettingsShell role={role} activeTab={activeTab}>
          <SettingsContent
            userId={userId}
            role={role}
            team={team}
            workspacePrefs={workspacePrefs}
            activeTab={activeTab}
          />
        </SettingsShell>
      </div>
    </PageFrame>
  )
}

export function SettingsDashboard({
  user,
  team,
  workspacePrefs,
}: {
  user: { id: string; role: Role }
  team: TeamMember[]
  workspacePrefs: WorkspacePrefs
}) {
  return (
    <Suspense fallback={null}>
      <SettingsDashboardInner
        userId={user.id}
        role={user.role}
        team={team}
        workspacePrefs={workspacePrefs}
      />
    </Suspense>
  )
}
