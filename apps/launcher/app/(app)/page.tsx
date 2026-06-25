import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import {
  computeTodayProgress,
  pickNextStepTasks,
  recentTagsFromTasks,
  type DashboardTaskRow,
} from '@/lib/dashboard/tasks'
import {
  groupDashboardAssignments,
  formatSubtaskGroupLabel,
} from '@/lib/dashboard/assignments'
import { DashboardView } from './dashboard-dashboard'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const userId = session.id

  const [user, assignedParentTasks, assignedSubtasks, notes, members] = await Promise.all([
    prisma.users.findUnique({
      where: { id: userId },
      select: { name: true },
    }),
    prisma.tasks.findMany({
      where: {
        deleted_at: null,
        parent_task_id: null,
        task_assignees: { some: { user_id: userId } },
      },
      orderBy: { updated_at: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        due_date: true,
        tags: true,
        completed_at: true,
        updated_at: true,
        clients: { select: { name: true } },
      },
    }),
    prisma.tasks.findMany({
      where: {
        deleted_at: null,
        parent_task_id: { not: null },
        task_assignees: { some: { user_id: userId } },
      },
      orderBy: { updated_at: 'desc' },
      select: {
        id: true,
        parent_task_id: true,
        status: true,
        tasks: {
          select: {
            id: true,
            title: true,
            clients: { select: { name: true } },
          },
        },
      },
    }),
    prisma.dashboard_notes.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 20,
      select: { id: true, content: true, created_at: true },
    }),
    prisma.users.findMany({
      where: { status: 'active', deleted_at: null, id: { not: userId } },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
      take: 50,
    }),
  ])

  const firstName = user?.name?.split(/\s+/)[0] ?? 'there'

  const allAssignedForProgress = [
    ...assignedParentTasks.map((t) => ({
      status: t.status,
      due_date: t.due_date,
      completed_at: t.completed_at,
      updated_at: t.updated_at,
    })),
    ...assignedSubtasks.map((t) => ({
      status: t.status,
      due_date: null as Date | null,
      completed_at: null as Date | null,
      updated_at: new Date(),
    })),
  ]

  const todayProgress = computeTodayProgress(allAssignedForProgress)

  const grouped = groupDashboardAssignments({
    parents: assignedParentTasks,
    subtasks: assignedSubtasks,
  })

  const nextTasks: DashboardTaskRow[] = pickNextStepTasks(
    grouped
      .filter((row) => row.kind === 'parent')
      .map((row) => ({
        id: row.taskId,
        title: row.title,
        status: row.status,
        priority: row.priority,
        due_date: row.due_date ? new Date(row.due_date) : null,
        tags: assignedParentTasks.find((t) => t.id === row.taskId)?.tags ?? [],
        updated_at:
          assignedParentTasks.find((t) => t.id === row.taskId)?.updated_at ?? new Date(),
      })),
  )

  const subtaskGroups = grouped
    .filter((row) => row.kind === 'subtask_group')
    .map((row) => ({
      parentId: row.parentId,
      label: formatSubtaskGroupLabel(row),
      status: row.status,
      subtaskCount: row.subtaskCount,
    }))

  const recentTags = recentTagsFromTasks(
    assignedParentTasks.map((t) => ({ tags: t.tags, updated_at: t.updated_at })),
  )

  return (
    <DashboardView
      firstName={firstName}
      nextTasks={nextTasks}
      subtaskGroups={subtaskGroups}
      todayProgress={todayProgress}
      recentTags={recentTags}
      notes={notes.map((n) => ({
        id: n.id,
        content: n.content,
        created_at: n.created_at.toISOString(),
      }))}
      members={members}
    />
  )
}
