import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { SettingsDashboard } from './settings-dashboard'

export const metadata: Metadata = { title: 'Settings' }
export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const session = await getServerSession()

  const [userRow, teamRows] = await Promise.all([
    session
      ? prisma.users.findUnique({
          where: { id: session.id },
          select: {
            id: true,
            name: true,
            email: true,
            avatar_url: true,
            role: true,
            departments_users_department_idTodepartments: {
              select: { name: true },
            },
          },
        })
      : null,
    prisma.users.findMany({
      where: { deleted_at: null, status: 'active' },
      orderBy: [{ role: 'asc' }, { name: 'asc' }],
      select: {
        id: true,
        name: true,
        email: true,
        avatar_url: true,
        role: true,
        departments_users_department_idTodepartments: {
          select: { name: true },
        },
      },
    }),
  ])

  const toMember = (r: typeof teamRows[number]) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    avatar_url: r.avatar_url,
    role: r.role,
    department: r.departments_users_department_idTodepartments?.name ?? null,
  })

  const user = userRow
    ? toMember(userRow)
    : { id: '', name: 'Unknown', email: '', avatar_url: null, role: 'Viewer', department: null }

  return <SettingsDashboard user={user} team={teamRows.map(toMember)} />
}
