import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { computeUserGamificationStats } from '@/lib/gamification/user-stats'
import {
  PROFILE_DETAIL_SELECT,
  gamificationInputFromProfileRow,
  toProfileUser,
} from '@/lib/profile/teammate'
import { ProfileView } from './profile-view'

export const metadata: Metadata = { title: 'Profile' }
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await getServerSession()
  const row = session
    ? await prisma.users.findUnique({
        where: { id: session.id },
        select: PROFILE_DETAIL_SELECT,
      })
    : null

  const user = row ? toProfileUser(row) : toProfileUser({
    id: '',
    name: 'Unknown',
    email: '',
    avatar_url: null,
    role: 'Viewer',
    bio: null,
    linkedin_url: null,
    instagram_url: null,
    behance_url: null,
    website_url: null,
    last_login_at: null,
    departments_users_department_idTodepartments: null,
    _count: { tasks_tasks_assigned_toTousers: 0, task_comments: 0 },
    time_entries: [],
  })

  const stats = row ? computeUserGamificationStats(gamificationInputFromProfileRow(row)) : null

  return <ProfileView user={user} stats={stats} />
}
