'use client'

import { useState, useRef } from 'react'
import { User, Lock, Users, Camera, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/toast'
import type { Role } from '@/lib/auth/rbac'

export interface SettingsUser {
  id: string
  name: string
  email: string
  avatar_url: string | null
  role: string
  department: string | null
}

interface TeamMember {
  id: string
  name: string
  email: string
  avatar_url: string | null
  role: string
  department: string | null
}

type Tab = 'profile' | 'security' | 'team'

const ROLE_TONE: Record<string, 'blue' | 'warning' | 'danger' | 'neutral'> = {
  Admin: 'danger',
  Manager: 'warning',
  Contributor: 'blue',
  Viewer: 'neutral',
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

function Avatar({
  name,
  avatarUrl,
  size = 'md',
}: {
  name: string
  avatarUrl: string | null
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClass = size === 'lg' ? 'h-16 w-16 text-xl' : size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm'
  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-primary/20 font-bold text-primary`}
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        initials(name)
      )}
    </div>
  )
}

function ProfileTab({ user }: { user: SettingsUser }) {
  const { toast } = useToast()
  const [name, setName] = useState(user.name)
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const isDirty = name !== user.name || (avatarUrl || null) !== user.avatar_url

  async function handleSave() {
    if (!name.trim()) {
      toast('error', 'Name cannot be empty')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/settings/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          avatar_url: avatarUrl.trim() || null,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        toast('error', json.message ?? 'Failed to save profile')
        return
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      toast('success', 'Profile updated')
    } catch {
      toast('error', 'Network error — please try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Avatar + identity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px]">Profile</CardTitle>
          <CardDescription>Your public name and avatar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar name={name || user.name} avatarUrl={avatarUrl || null} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">{name || user.name}</p>
              <p className="truncate text-[12px] text-muted-foreground">{user.email}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <Badge tone={ROLE_TONE[user.role] ?? 'neutral'}>{user.role}</Badge>
                {user.department && <Badge tone="neutral">{user.department}</Badge>}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Display name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                maxLength={255}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="avatar">Avatar URL</Label>
              <div className="relative">
                <Camera
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="avatar"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="pl-8"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">Leave blank to use initials.</p>
            </div>

            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={user.email} disabled className="cursor-not-allowed opacity-60" />
              <p className="text-[11px] text-muted-foreground">
                Email cannot be changed here. Contact an Admin.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <Button onClick={handleSave} isLoading={saving} disabled={!isDirty || saving}>
              {saved ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  Saved
                </span>
              ) : (
                'Save changes'
              )}
            </Button>
            {isDirty && !saving && (
              <p className="text-[12px] text-muted-foreground">Unsaved changes</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
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
              <Avatar name={m.name} avatarUrl={m.avatar_url} size="sm" />
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

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'team', label: 'Team', icon: Users },
]

export function SettingsDashboard({
  user,
  team,
}: {
  user: SettingsUser
  team: TeamMember[]
}) {
  const [tab, setTab] = useState<Tab>('profile')

  return (
    <div className="px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Settings</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
          Account settings
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Manage your profile, password, and team.
        </p>

        {/* Tab bar */}
        <div role="tablist" className="mt-6 flex gap-1 rounded-lg border border-border bg-muted/30 p-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              type="button"
              onClick={() => setTab(id)}
              aria-selected={tab === id}
              aria-controls={`tabpanel-${id}`}
              className={[
                'flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-100',
                tab === id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              <Icon size={14} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <div id="tabpanel-profile" role="tabpanel" hidden={tab !== 'profile'}>
            {tab === 'profile' && <ProfileTab user={user} />}
          </div>
          <div id="tabpanel-security" role="tabpanel" hidden={tab !== 'security'}>
            {tab === 'security' && <SecurityTab />}
          </div>
          <div id="tabpanel-team" role="tabpanel" hidden={tab !== 'team'}>
            {tab === 'team' && <TeamTab members={team} currentUserId={user.id} />}
          </div>
        </div>
      </div>
    </div>
  )
}
