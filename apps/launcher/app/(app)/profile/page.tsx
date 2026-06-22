import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { ProfileView } from './profile-view'
import type { ProfileUser } from '@/components/account/profile-form'

export const metadata: Metadata = { title: 'Profile' }
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await getServerSession()
  const row = session
    ? await prisma.users.findUnique({
        where: { id: session.id },
        select: {
          id: true,
          name: true,
          email: true,
          avatar_url: true,
          role: true,
          departments_users_department_idTodepartments: { select: { name: true } },
        },
      })
    : null

  const user: ProfileUser = row
    ? {
        id: row.id,
        name: row.name,
        email: row.email,
        avatar_url: row.avatar_url,
        role: row.role,
        department: row.departments_users_department_idTodepartments?.name ?? null,
      }
    : {
        id: '',
        name: 'Unknown',
        email: '',
        avatar_url: null,
        role: 'Viewer',
        department: null,
      }

  return <ProfileView user={user} />
}
