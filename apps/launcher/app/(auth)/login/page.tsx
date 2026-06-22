import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { SESSION_COOKIE } from '@/lib/auth/cookie'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { LoginForm } from './login-form'

export const metadata: Metadata = { title: 'Sign in' }

export default async function LoginPage() {
  const session = await getServerSession()
  if (session) {
    const record = await prisma.users.findUnique({
      where: { id: session.id },
      select: { id: true },
    })
    if (record) redirect('/profile')
    ;(await cookies()).delete(SESSION_COOKIE)
  }

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
