'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { User, Lock, Users, CheckCircle2, Settings2, UserMinus, UserCheck } from 'lucide-react'
import { ProfileForm, type ProfileUser, UserAvatar } from '@/components/account/profile-form'
import { ROLES, isAdmin, type Role } from '@/lib/auth/rbac'
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
import type { WorkspacePrefs } from '@/app/api/settings/workspace/route'

export type SettingsUser = ProfileUser

interface TeamMember {
  id: string
  name: string
  email: string
  avatar_url: string | null
  role: string
  status: string
  department: string | null
}

type Tab = 'profile' | 'security' | 'team' | 'workspace'

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

function TeamTab({
  members,
  currentUserId,
  currentUserRole,
  canManage,
}: {
  members: TeamMember[]
  currentUserId: string
  currentUserRole: Role
  canManage: boolean
}) {
  const { toast } = useToast()
  const [rows, setRows] = useState<TeamMember[]>(members)
  const [q, setQ] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const meIsAdmin = isAdmin(currentUserRole)
  // Managers can assign up to their own rank; only Admins can mint Admins.
  const assignableRoles = (meIsAdmin ? ROLES : ROLES.filter((r) => r !== 'Admin')) as readonly Role[]

  const filtered = rows.filter((m) => {
    if (!q) return true
    const needle = q.toLowerCase()
    return (
      m.name.toLowerCase().includes(needle) ||
      m.email.toLowerCase().includes(needle) ||
      (m.department ?? '').toLowerCase().includes(needle) ||
      m.role.toLowerCase().includes(needle)
    )
  })

  // Mirror the server's RBAC: not yourself, and only Admins may touch Admins.
  const canEdit = (m: TeamMember) =>
    canManage && m.id !== currentUserId && (meIsAdmin || !isAdmin(m.role as Role))

  async function patchMember(m: TeamMember, body: { role?: string; status?: string }): Promise<void> {
    setBusyId(m.id)
    const prev = rows
    setRows((rs) => rs.map((r) => (r.id === m.id ? { ...r, ...body } : r)))
    try {
      const res = await fetch(`/api/settings/team/${m.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.status !== 200) {
        setRows(prev)
        toast('error', json.message ?? 'Could not update team member')
        return
      }
      toast('success', body.role ? `${m.name} is now ${body.role}` : `${m.name} ${body.status === 'inactive' ? 'deactivated' : 'reactivated'}`)
    } catch {
      setRows(prev)
      toast('error', 'Network error — please try again')
    } finally {
      setBusyId(null)
    }
  }

  function toggleStatus(m: TeamMember): void {
    const next = m.status === 'active' ? 'inactive' : 'active'
    if (next === 'inactive' && !confirm(`Deactivate ${m.name}? They will lose access until reactivated.`)) return
    void patchMember(m, { status: next })
  }

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
          {filtered.map((m) => {
            const inactive = m.status !== 'active'
            const editable = canEdit(m)
            return (
              <div
                key={m.id}
                className={`flex items-center gap-3 px-4 py-3 ${inactive ? 'opacity-60' : ''}`}
              >
                <UserAvatar name={m.name} avatarUrl={m.avatar_url} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[13px] font-medium text-foreground">{m.name}</span>
                    {m.id === currentUserId && (
                      <span className="shrink-0 text-[10px] text-muted-foreground">(you)</span>
                    )}
                    {inactive && (
                      <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="truncate text-[11px] text-muted-foreground">{m.email}</p>
                </div>

                {editable ? (
                  <div className="flex shrink-0 items-center gap-2">
                    <Select
                      value={m.role}
                      onValueChange={(v) => patchMember(m, { role: v })}
                      disabled={busyId === m.id}
                    >
                      <SelectTrigger className="h-8 w-[130px] text-[12px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {assignableRoles.map((r) => (
                          <SelectItem key={r} value={r} className="text-[12px]">
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <button
                      type="button"
                      onClick={() => toggleStatus(m)}
                      disabled={busyId === m.id}
                      title={inactive ? 'Reactivate member' : 'Deactivate member'}
                      aria-label={inactive ? `Reactivate ${m.name}` : `Deactivate ${m.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                    >
                      {inactive ? <UserCheck size={14} /> : <UserMinus size={14} />}
                    </button>
                  </div>
                ) : (
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge tone={ROLE_TONE[m.role] ?? 'neutral'} className="text-[10px]">
                      {m.role}
                    </Badge>
                    {m.department && (
                      <span className="text-[10px] text-muted-foreground">{m.department}</span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {canManage && (
        <p className="text-[11px] text-muted-foreground">
          {meIsAdmin
            ? 'You can change any member’s role and deactivate accounts. Admin accounts are managed by Admins only.'
            : 'You can manage member roles below Admin and deactivate non-Admin accounts.'}
        </p>
      )}
    </div>
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

function WorkspaceTab({ prefs }: { prefs: WorkspacePrefs }) {
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
      {/* Regional */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px]">Regional</CardTitle>
          <CardDescription>Timezone, date format, and display language.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px]">Notifications</CardTitle>
          <CardDescription>Choose how you want to be notified.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'workspace', label: 'Workspace', icon: Settings2 },
]

export function SettingsDashboard({
  user,
  team,
  workspacePrefs,
  canManageTeam,
  currentUserRole,
}: {
  user: SettingsUser
  team: TeamMember[]
  workspacePrefs: WorkspacePrefs
  canManageTeam: boolean
  currentUserRole: Role
}) {
  const [tab, setTab] = useState<Tab>('profile')
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement>>>({})
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null)

  const updatePill = useCallback(() => {
    const btn = tabRefs.current[tab]
    if (!btn) return
    setPill({ x: btn.offsetLeft, w: btn.offsetWidth })
  }, [tab])

  useEffect(() => {
    updatePill()
  }, [updatePill])

  useEffect(() => {
    window.addEventListener('resize', updatePill)
    return () => window.removeEventListener('resize', updatePill)
  }, [updatePill])

  return (
    <div className="px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Settings</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
          Account settings
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Manage your profile, password, team, and workspace preferences.
        </p>

        {/* Tab bar */}
        <div
          role="tablist"
          className="relative mt-6 flex gap-1 rounded-lg border border-border bg-muted/30 p-1"
        >
          {pill && (
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-1 left-0 top-1 rounded-md bg-card shadow-sm transition-transform duration-200"
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
                'relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-150',
                tab === id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              <Icon size={14} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div className="mt-6">
          <div id="tabpanel-profile" role="tabpanel" hidden={tab !== 'profile'}>
            <ProfileForm user={user} />
          </div>
          <div id="tabpanel-security" role="tabpanel" hidden={tab !== 'security'}>
            <SecurityTab />
          </div>
          <div id="tabpanel-team" role="tabpanel" hidden={tab !== 'team'}>
            <TeamTab
              members={team}
              currentUserId={user.id}
              currentUserRole={currentUserRole}
              canManage={canManageTeam}
            />
          </div>
          <div id="tabpanel-workspace" role="tabpanel" hidden={tab !== 'workspace'}>
            <WorkspaceTab prefs={workspacePrefs} />
          </div>
        </div>
      </div>
    </div>
  )
}
