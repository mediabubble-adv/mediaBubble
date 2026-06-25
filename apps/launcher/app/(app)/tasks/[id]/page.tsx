import type { Metadata } from 'next'
import Link from 'next/link'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'
import { TaskWorkspace } from '@/components/tasks/task-workspace'
import { ChevronLeft } from 'lucide-react'

export const metadata: Metadata = { title: 'Task' }
export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params
  const session = await getServerSession()

  const task = await prisma.tasks.findFirst({
    where: { id, deleted_at: null },
    select: { id: true, title: true },
  })

  const memberRows = await prisma.users.findMany({
    where: { status: 'active' },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  if (!task) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Task not found.</p>
        <Link href="/tasks" className="mt-2 inline-flex text-sm text-primary">
          Back to tasks
        </Link>
      </div>
    )
  }

  return (
    <div className="launcher-surface mx-auto max-w-6xl rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft size={16} />
          Tasks
        </Link>
        <span className="text-muted-foreground/50">/</span>
        <span className="truncate text-[13px] font-semibold text-foreground">{task.title}</span>
      </div>
      <TaskWorkspace
        taskId={id}
        members={memberRows}
        currentUserId={session?.id ?? null}
        variant="page"
      />
    </div>
  )
}
