import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/server-session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { prisma } from '@/lib/db/prisma'
import { SettingsDashboard } from './settings-dashboard'
import type { WorkspacePrefs } from '@/app/api/settings/workspace/route'

export const metadata: Metadata = { title: 'Settings' }
export const dynamic = 'force-dynamic'

const DEFAULT_WORKSPACE_PREFS: WorkspacePrefs = {
  timezone: 'UTC',
  date_format: 'DD/MM/YYYY',
  language: 'en',
  email_notifications: true,
  app_notifications: true,
}

const memberSelect = {
  id: true,
  name: true,
  email: true,
  avatar_url: true,
  role: true,
  status: true,
  departments_users_department_idTodepartments: { select: { name: true } },
} as const

export default async function SettingsPage() {
  const session = await getServerSession()
  const canManage = session ? hasAtLeast(session.role, 'Manager') : false

  const [userRow, teamRows, workspaceRow] = await Promise.all([
    session
      ? prisma.users.findUnique({ where: { id: session.id }, select: memberSelect })
      : null,
    // Include inactive members so they can be reactivated from the Team tab.
    prisma.users.findMany({
      where: { deleted_at: null },
      orderBy: [{ status: 'asc' }, { role: 'asc' }, { name: 'asc' }],
      select: memberSelect,
    }),
    session
      ? prisma.settings.findUnique({
          where: { user_id_key: { user_id: session.id, key: 'workspace_prefs' } },
          select: { value: true },
        })
      : null,
  ])

  const toMember = (r: typeof teamRows[number]) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    avatar_url: r.avatar_url,
    role: r.role,
    status: r.status ?? 'active',
    department: r.departments_users_department_idTodepartments?.name ?? null,
  })

  const user = userRow
    ? toMember(userRow)
    : { id: '', name: 'Unknown', email: '', avatar_url: null, role: 'Viewer', status: 'active', department: null }

  const workspacePrefs: WorkspacePrefs = {
    ...DEFAULT_WORKSPACE_PREFS,
    ...(workspaceRow?.value && typeof workspaceRow.value === 'object' && !Array.isArray(workspaceRow.value)
      ? (workspaceRow.value as Partial<WorkspacePrefs>)
      : {}),
  }

  return (
    <SettingsDashboard
      user={user}
      team={teamRows.map(toMember)}
      workspacePrefs={workspacePrefs}
      canManageTeam={canManage}
      currentUserRole={session?.role ?? 'Viewer'}
    />
  )
}
