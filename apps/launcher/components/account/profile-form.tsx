'use client'

import { useState } from 'react'
import { Camera, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/toast'

export interface ProfileUser {
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

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export function UserAvatar({
  name,
  avatarUrl,
  size = 'md',
}: {
  name: string
  avatarUrl: string | null
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClass =
    size === 'lg' ? 'h-16 w-16 text-xl' : size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm'
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

export function ProfileForm({ user }: { user: ProfileUser }) {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-[14px]">Profile</CardTitle>
        <CardDescription>Your public name and avatar.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-4">
          <UserAvatar name={name || user.name} avatarUrl={avatarUrl || null} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-foreground">{name || user.name}</p>
            <p className="truncate text-[12px] text-muted-foreground">{user.email}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <Badge tone={ROLE_TONE[user.role] ?? 'neutral'}>{user.role}</Badge>
              {user.department ? <Badge tone="neutral">{user.department}</Badge> : null}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="profile-name">Display name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              maxLength={255}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-avatar">Avatar URL</Label>
            <div className="relative">
              <Camera
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="profile-avatar"
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
          {isDirty && !saving ? (
            <p className="text-[12px] text-muted-foreground">Unsaved changes</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
