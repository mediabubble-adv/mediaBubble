import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SESSION_COOKIE } from '@/lib/auth/cookie'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { AppShell, type ShellUser } from './_shell/app-shell'
import { ToastProvider } from '@/components/ui/toast'
import { OnboardingTour } from '@/components/onboarding/tour'

export const dynamic = 'force-dynamic'

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const letters = (parts[0]?.[0] ?? '') + (parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '')
  return letters.toUpperCase() || '?'
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // The proxy gate is presence-only; verify the session for real here.
  const session = await getServerSession()
  if (!session) redirect('/login')

  const record = await prisma.users.findUnique({
    where: { id: session.id },
    select: {
      name: true,
      email: true,
      role: true,
      departments_users_department_idTodepartments: { select: { name: true } },
    },
  })
  // Session valid but user row gone (deleted/rotated) → clear stale cookie so
  // proxy stops bouncing /login ↔ / and the sign-in form can render.
  if (!record) {
    ;(await cookies()).delete(SESSION_COOKIE)
    redirect('/login')
  }

  const user: ShellUser = {
    name: record.name,
    email: record.email,
    role: record.role,
    department: record.departments_users_department_idTodepartments?.name ?? null,
    initials: initials(record.name),
  }

  return (
    <ToastProvider>
      <AppShell user={user}>{children}</AppShell>
      <OnboardingTour />
    </ToastProvider>
  )
}
