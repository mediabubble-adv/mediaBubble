'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Camera, CheckCircle2, Globe, Instagram, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'

export interface ProfileUser {
  id: string
  name: string
  email: string
  avatar_url: string | null
  role: string
  department: string | null
  bio: string | null
  linkedin_url: string | null
  instagram_url: string | null
  behance_url: string | null
  website_url: string | null
}

function BehanceIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-2.297-5.564-5.625 0-3.328 2.297-5.67 5.328-5.67 3.016 0 4.971 1.92 5.328 4.688h-3.047c-.229-1.125-1.125-1.844-2.281-1.844-1.406 0-2.344 1.125-2.344 2.719 0 1.594.938 2.719 2.344 2.719 1.313 0 2.063-.844 2.297-1.969h3.047zm-11.726 1.125v-7.5H5.016v7.5H3.703v-7.5H0V9.375h3.703V7.078c0-2.25 1.313-3.516 3.656-3.516.938 0 1.922.188 2.578.469v1.313c-.563-.188-1.313-.281-1.922-.281-1.125 0-1.688.563-1.688 1.688v1.125h3.469v1.125H6.328v7.5H4.016z" />
    </svg>
  )
}

export function ProfileSocialLinks({
  linkedin_url,
  instagram_url,
  behance_url,
  website_url,
  variant = 'labeled',
}: Pick<ProfileUser, 'linkedin_url' | 'instagram_url' | 'behance_url' | 'website_url'> & {
  variant?: 'labeled' | 'icons'
}) {
  const links = [
    { url: linkedin_url, label: 'LinkedIn', icon: Linkedin },
    { url: instagram_url, label: 'Instagram', icon: Instagram },
    { url: behance_url, label: 'Behance', icon: BehanceIcon },
    { url: website_url, label: 'Website', icon: Globe },
  ].filter((l) => l.url)

  if (links.length === 0) return null

  if (variant === 'icons') {
    return (
      <div className="flex flex-wrap gap-0.5">
        {links.map(({ url, label, icon: Icon }) => (
          <a
            key={label}
            href={url!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            aria-label={label}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {links.map(({ url, label, icon: Icon }) => (
        <a
          key={label}
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-muted/60"
          aria-label={label}
        >
          <Icon size={13} />
          {label}
        </a>
      ))}
    </div>
  )
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

function sanitizeAvatarUrl(url: string | null): string | null {
  if (!url) return null
  const trimmed = url.trim()
  if (!trimmed) return null

  // Allow server-relative paths (e.g. uploaded avatars at /uploads/avatars/…)
  if (trimmed.startsWith('/')) return trimmed

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString()
    }
  } catch {
    return null
  }

  return null
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
  const safeAvatarUrl = sanitizeAvatarUrl(avatarUrl)

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-primary/20 font-bold text-primary`}
    >
      {safeAvatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={safeAvatarUrl} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        initials(name)
      )}
    </div>
  )
}

export function PasswordForm() {
  const { toast } = useToast()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword.length < 8) {
      toast('error', 'New password must be at least 8 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      toast('error', 'New passwords do not match')
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch('/api/settings/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      })
      const json = await res.json()
      if (!res.ok) {
        toast('error', json.message ?? 'Failed to update password')
        return
      }
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      toast('success', 'Password updated')
    } catch {
      toast('error', 'Network error — please try again')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="launcher-surface">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="text-[15px] font-semibold">Change password</CardTitle>
        <CardDescription className="mt-1">Use at least 8 characters.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current-password">Current password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
            />
          </div>

          <Separator />

          <div className="space-y-1.5">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
            />
          </div>

          <div className="pt-1">
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              Update password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export function ProfileForm({
  user,
  hideIdentitySummary = false,
}: {
  user: ProfileUser
  hideIdentitySummary?: boolean
}) {
  const { toast } = useToast()
  const [name, setName] = useState(user.name)
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url ?? '')
  const [bio, setBio] = useState(user.bio ?? '')
  const [linkedinUrl, setLinkedinUrl] = useState(user.linkedin_url ?? '')
  const [instagramUrl, setInstagramUrl] = useState(user.instagram_url ?? '')
  const [behanceUrl, setBehanceUrl] = useState(user.behance_url ?? '')
  const [websiteUrl, setWebsiteUrl] = useState(user.website_url ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isDirty =
    name !== user.name ||
    bio !== (user.bio ?? '') ||
    linkedinUrl !== (user.linkedin_url ?? '') ||
    instagramUrl !== (user.instagram_url ?? '') ||
    behanceUrl !== (user.behance_url ?? '') ||
    websiteUrl !== (user.website_url ?? '')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('avatar', file)
      const res = await fetch('/api/profile/avatar', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) {
        toast('error', json.message ?? 'Upload failed')
        return
      }
      setAvatarUrl(json.data.avatar_url)
      toast('success', 'Avatar updated')
    } catch {
      toast('error', 'Network error — please try again')
    } finally {
      setUploading(false)
      // reset so the same file can be re-selected
      e.target.value = ''
    }
  }

  async function handleSave() {
    if (!name.trim()) {
      toast('error', 'Name cannot be empty')
      return
    }
    setSaving(true)
    try {
      const payload: Record<string, string | null> = {}
      if (name !== user.name) payload['name'] = name.trim()
      if (bio !== (user.bio ?? '')) payload['bio'] = bio.trim() || null
      if (linkedinUrl !== (user.linkedin_url ?? '')) payload['linkedin_url'] = linkedinUrl.trim() || null
      if (instagramUrl !== (user.instagram_url ?? '')) payload['instagram_url'] = instagramUrl.trim() || null
      if (behanceUrl !== (user.behance_url ?? '')) payload['behance_url'] = behanceUrl.trim() || null
      if (websiteUrl !== (user.website_url ?? '')) payload['website_url'] = websiteUrl.trim() || null

      const res = await fetch('/api/settings/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <div className="space-y-8">
      <Card className="launcher-surface">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="text-[15px] font-semibold">Identity</CardTitle>
          <CardDescription className="mt-1">Display name and avatar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          {!hideIdentitySummary ? (
            <>
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
            </>
          ) : null}

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
              <Label>Avatar</Label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="relative shrink-0 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="Upload avatar"
                >
                  <UserAvatar name={name || user.name} avatarUrl={avatarUrl || null} size="lg" />
                  <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                    {uploading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Camera size={16} className="text-white" />
                    )}
                  </span>
                </button>
                <p className="text-[12px] text-muted-foreground">
                  Click to upload a photo. JPEG, PNG, WebP or GIF, max 2 MB.
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={user.email} disabled className="cursor-not-allowed opacity-60" />
              <p className="text-[11px] text-muted-foreground">
                Email cannot be changed here. Contact an Admin.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="launcher-surface">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="text-[15px] font-semibold">About you</CardTitle>
          <CardDescription className="mt-1">Visible to teammates inside MediaBubble Launcher.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-1.5">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short intro for your teammates…"
              maxLength={500}
              rows={4}
            />
            <p className="text-[11px] text-muted-foreground tabular-nums">{bio.length}/500</p>
          </div>
        </CardContent>
      </Card>

      <Card className="launcher-surface">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="text-[15px] font-semibold">Links</CardTitle>
          <CardDescription className="mt-1">Professional profiles — https URLs only.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-1.5">
            <Label htmlFor="profile-linkedin" className="flex items-center gap-1.5">
              <Linkedin size={14} />
              LinkedIn
            </Label>
            <Input
              id="profile-linkedin"
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/…"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-instagram" className="flex items-center gap-1.5">
              <Instagram size={14} />
              Instagram
            </Label>
            <Input
              id="profile-instagram"
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/…"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-behance" className="flex items-center gap-1.5">
              <BehanceIcon size={14} />
              Behance
            </Label>
            <Input
              id="profile-behance"
              type="url"
              value={behanceUrl}
              onChange={(e) => setBehanceUrl(e.target.value)}
              placeholder="https://behance.net/…"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-website" className="flex items-center gap-1.5">
              <Globe size={14} />
              Website
            </Label>
            <Input
              id="profile-website"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://…"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
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

      <p className="text-[12px] text-muted-foreground">
        <Link href="/settings" className="font-medium text-primary hover:underline">
          Password &amp; workspace → Settings
        </Link>
      </p>
    </div>
  )
}
