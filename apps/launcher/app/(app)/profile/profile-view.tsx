'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Settings, Trophy, User } from 'lucide-react'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { ProfileForm, ProfileSocialLinks, UserAvatar, type ProfileUser } from '@/components/account/profile-form'
import { PresenceStatusPicker } from '@/components/presence/presence-status-picker'
import { ProfileStats } from '@/components/account/profile-stats'
import type { UserGamificationStats } from '@/lib/gamification/user-stats'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const ROLE_TONE: Record<string, 'blue' | 'warning' | 'danger' | 'neutral'> = {
  Admin: 'danger',
  Manager: 'warning',
  Contributor: 'blue',
  Viewer: 'neutral',
}

export function ProfileView({
  user,
  stats,
}: {
  user: ProfileUser
  stats: UserGamificationStats | null
}) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function signOut() {
    setPending(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/login')
    router.refresh()
  }

  return (
    <PageFrame>
      <PageHeader
        icon={User}
        kicker="Account"
        title="Your profile"
        description="Identity, bio, and contribution stats — visible to teammates."
        actions={
          stats ? (
            <Button asChild variant="outline" size="sm">
              <Link href="/leaderboard">
                <Trophy size={14} />
                Leaderboard
              </Link>
            </Button>
          ) : null
        }
      />

      <div className="mt-10 space-y-8">
        <Card className="launcher-surface overflow-hidden">
          <CardContent className="flex flex-col gap-5 p-7 sm:flex-row sm:items-center">
            <UserAvatar name={user.name} avatarUrl={user.avatar_url} size="lg" />
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-display text-xl font-bold tracking-tight text-foreground">
                {user.name}
              </h2>
              <p className="mt-0.5 truncate text-[13px] text-muted-foreground">{user.email}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                <Badge tone={ROLE_TONE[user.role] ?? 'neutral'}>{user.role}</Badge>
                {user.department ? <Badge tone="neutral">{user.department}</Badge> : null}
                {stats ? <Badge tone="blue">Level {stats.level}</Badge> : null}
              </div>
              <ProfileSocialLinks
                linkedin_url={user.linkedin_url}
                instagram_url={user.instagram_url}
                behance_url={user.behance_url}
                website_url={user.website_url}
              />
            </div>
          </CardContent>
        </Card>

        {stats ? <ProfileStats stats={stats} /> : null}

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_min(320px,30%)]">
          <div className="space-y-8">
            <ProfileForm user={user} hideIdentitySummary />
          </div>

          <div className="space-y-8">
            <PresenceStatusPicker />
            <Card className="launcher-surface h-fit">
              <CardHeader className="border-b border-border px-6 py-5">
                <CardTitle className="text-[15px] font-semibold">Session</CardTitle>
                <CardDescription className="mt-1">Sign out on this device.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full sm:w-auto"
                  onClick={signOut}
                  isLoading={pending}
                  disabled={pending}
                >
                  <LogOut size={15} />
                  {pending ? 'Signing out…' : 'Sign out'}
                </Button>
                <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                  <Link href="/settings">
                    <Settings size={14} />
                    Password &amp; workspace
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageFrame>
  )
}
