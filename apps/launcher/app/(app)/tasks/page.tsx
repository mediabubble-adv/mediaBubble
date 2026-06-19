import type { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { TaskBoard, type BoardTask, type BoardMember } from './task-board'

export const metadata: Metadata = { title: 'Tasks' }
export const dynamic = 'force-dynamic'

export default async function TasksPage() {
  // Select only serializable columns — Prisma `Decimal` (estimated_hours,
  // actual_hours) can't cross the server/client boundary.
  const rows = await prisma.tasks.findMany({
    where: { deleted_at: null },
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
    },
  })

  const tasks: BoardTask[] = rows.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status ?? 'Backlog',
    priority: t.priority ?? 'Medium',
    assigned_to: t.assigned_to,
    tags: t.tags,
    due_date: t.due_date ? t.due_date.toISOString().slice(0, 10) : null,
  }))

  const memberRows = await prisma.users.findMany({
    where: { status: 'active' },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })
  const members: BoardMember[] = memberRows.map((m) => ({ id: m.id, name: m.name }))

  return <TaskBoard initialTasks={tasks} members={members} />
}
