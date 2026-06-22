import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { SettingsDashboard } from './settings-dashboard'
import type { WorkspacePrefs } from './settings-dashboard'

export const metadata: Metadata = { title: 'Settings' }
export const dynamic = 'force-dynamic'

const DEFAULT_PREFS: WorkspacePrefs = {
  timezone: 'Africa/Cairo',
  default_currency: 'EGP',
  notifications: { email_digest: true, task_reminders: true, weekly_report: false },
}

export default async function SettingsPage() {
  const session = await getServerSession()

  const [userRow, teamRows, prefRows] = await Promise.all([
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
    session
      ? prisma.settings.findMany({
          where: {
            user_id: session.id,
            key: { in: ['ui.timezone', 'ui.default_currency', 'ui.notifications'] },
          },
          select: { key: true, value: true },
        })
      : [],
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

  const prefMap = Object.fromEntries(prefRows.map((r) => [r.key, r.value]))
  const workspacePrefs: WorkspacePrefs = {
    timezone: (prefMap['ui.timezone'] as string) ?? DEFAULT_PREFS.timezone,
    default_currency: (prefMap['ui.default_currency'] as string) ?? DEFAULT_PREFS.default_currency,
    notifications:
      (prefMap['ui.notifications'] as WorkspacePrefs['notifications']) ??
      DEFAULT_PREFS.notifications,
  }

  return (
    <SettingsDashboard
      user={user}
      team={teamRows.map(toMember)}
      workspacePrefs={workspacePrefs}
    />
  )
}
