import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { computeUserGamificationStats } from '@/lib/gamification/user-stats'
import {
  PROFILE_DETAIL_SELECT,
  gamificationInputFromProfileRow,
  toProfileUser,
} from '@/lib/profile/teammate'
import { TeammateProfileView } from '../teammate-profile-view'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ userId: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { userId } = await params
  const row = await prisma.users.findFirst({
    where: { id: userId, status: 'active', deleted_at: null },
    select: { name: true },
  })
  return { title: row ? `${row.name} · Profile` : 'Teammate profile' }
}

export default async function TeammateProfilePage({ params }: PageProps) {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const { userId } = await params
  if (userId === session.id) redirect('/profile')

  const row = await prisma.users.findFirst({
    where: { id: userId, status: 'active', deleted_at: null },
    select: PROFILE_DETAIL_SELECT,
  })
  if (!row) notFound()

  const user = toProfileUser(row)
  const stats = computeUserGamificationStats(gamificationInputFromProfileRow(row))

  return <TeammateProfileView user={user} stats={stats} />
}
