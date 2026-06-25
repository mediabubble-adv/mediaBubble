'use client'

import Link from 'next/link'
import { ArrowLeft, MessageSquare, User } from 'lucide-react'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { ProfileSocialLinks, UserAvatar, type ProfileUser } from '@/components/account/profile-form'
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

export function TeammateProfileView({
  user,
  stats,
}: {
  user: ProfileUser
  stats: UserGamificationStats | null
}) {
  const hasBio = Boolean(user.bio?.trim())
  const hasLinks = Boolean(
    user.linkedin_url || user.instagram_url || user.behance_url || user.website_url,
  )

  return (
    <PageFrame>
      <PageHeader
        icon={User}
        kicker="Team"
        title={user.name}
        description="Teammate profile — internal to MediaBubble Launcher."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/meet">
              <MessageSquare size={14} />
              Message in Meet
            </Link>
          </Button>
        }
      />

      <div className="mt-10 space-y-8">
        <p>
          <Link
            href="/settings?tab=team"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to team
          </Link>
        </p>

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

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="launcher-surface">
            <CardHeader className="border-b border-border px-6 py-5">
              <CardTitle className="text-[15px] font-semibold">About</CardTitle>
              <CardDescription className="mt-1">Shared with teammates only.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {hasBio ? (
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-foreground">
                  {user.bio}
                </p>
              ) : (
                <p className="text-[13px] text-muted-foreground">No bio yet.</p>
              )}
            </CardContent>
          </Card>

          <Card className="launcher-surface">
            <CardHeader className="border-b border-border px-6 py-5">
              <CardTitle className="text-[15px] font-semibold">Links</CardTitle>
              <CardDescription className="mt-1">Professional profiles.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {hasLinks ? (
                <ProfileSocialLinks
                  linkedin_url={user.linkedin_url}
                  instagram_url={user.instagram_url}
                  behance_url={user.behance_url}
                  website_url={user.website_url}
                />
              ) : (
                <p className="text-[13px] text-muted-foreground">No links added.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageFrame>
  )
}
