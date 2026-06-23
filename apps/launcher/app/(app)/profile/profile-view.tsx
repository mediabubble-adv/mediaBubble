'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, LayoutDashboard, Settings } from 'lucide-react'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'
import { ProfileForm, PasswordForm, type ProfileUser } from '@/components/account/profile-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ProfileView({ user }: { user: ProfileUser }) {
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
        kicker="Account"
        title="Your profile"
        description="View and update your account details, or sign out."
      />

      <div className="mt-8 max-w-2xl space-y-6">
        <ProfileForm user={user} />

        <PasswordForm />

        <Card>
          <CardHeader>
            <CardTitle className="text-[14px]">Session</CardTitle>
            <CardDescription>Sign out of MediaBubble Launcher on this device.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={signOut}
              isLoading={pending}
              disabled={pending}
            >
              <LogOut size={15} />
              {pending ? 'Signing out…' : 'Sign out'}
            </Button>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/">
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/settings">
                  <Settings size={14} />
                  Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageFrame>
  )
}
