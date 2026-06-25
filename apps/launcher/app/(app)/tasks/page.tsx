import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { subtaskCounts } from '@/lib/tasks/progress'
import { assigneeUserSelect } from '@/lib/tasks/assignees'
import { TaskBoard, type BoardTask, type BoardMember, type BoardClient } from './task-board'

export const metadata: Metadata = { title: 'Tasks' }
export const dynamic = 'force-dynamic'

export default async function TasksPage() {
  const session = await getServerSession()
  const rows = await prisma.tasks.findMany({
    where: { deleted_at: null, parent_task_id: null },
    orderBy: { updated_at: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      assigned_to: true,
      tags: true,
      due_date: true,
      client_id: true,
      clients: { select: { id: true, name: true } },
      other_tasks: {
        where: { deleted_at: null },
        select: { status: true },
      },
      task_assignees: {
        include: { users: { select: assigneeUserSelect } },
        orderBy: { created_at: 'asc' },
      },
    },
  })

  const tasks: BoardTask[] = rows.map((t) => {
    const counts = subtaskCounts(t.other_tasks.map((s) => ({ status: s.status })))
    return {
      id: t.id,
      title: t.title,
      description: t.description,
      status: t.status ?? 'Backlog',
      priority: t.priority ?? 'Medium',
      assigned_to: t.assigned_to,
      assignees: t.task_assignees.map((row) => row.users),
      tags: t.tags,
      due_date: t.due_date ? t.due_date.toISOString().slice(0, 10) : null,
      client_id: t.client_id,
      client_name: t.clients?.name ?? null,
      subtask_done: counts.done,
      subtask_total: counts.total,
    }
  })

  const memberRows = await prisma.users.findMany({
    where: { status: 'active' },
    select: { id: true, name: true, avatar_url: true },
    orderBy: { name: 'asc' },
  })
  const members: BoardMember[] = memberRows.map((m) => ({
    id: m.id,
    name: m.name,
    avatar_url: m.avatar_url,
  }))

  const clientRows = await prisma.clients.findMany({
    where: { deleted_at: null },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })
  const clients: BoardClient[] = clientRows.map((c) => ({ id: c.id, name: c.name }))

  return (
    <Suspense fallback={null}>
      <TaskBoard
        initialTasks={tasks}
        members={members}
        clients={clients}
        currentUserId={session?.id ?? null}
      />
    </Suspense>
  )
}
