'use client'

import Link from 'next/link'
import { CheckSquare, AlertCircle, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export interface MyTask {
  id: string
  title: string
  status: string
  priority: string
  due_date: string | null
}

const PRIORITY_STYLES: Record<string, string> = {
  Critical: 'bg-destructive/15 text-destructive',
  High: 'bg-orange-500/15 text-orange-500',
  Medium: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
  Low: 'bg-muted-foreground/15 text-muted-foreground',
}

const STATUS_STYLES: Record<string, string> = {
  'In Progress': 'bg-accent/15 text-accent',
  'In Review': 'bg-purple-500/15 text-purple-500',
  Backlog: 'bg-muted-foreground/15 text-muted-foreground',
  Todo: 'bg-primary/15 text-primary',
}

function isOverdue(due_date: string | null): boolean {
  if (!due_date) return false
  return new Date(due_date) < new Date(new Date().toDateString())
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  if (iso === today.toISOString().slice(0, 10)) return 'Today'
  if (iso === tomorrow.toISOString().slice(0, 10)) return 'Tomorrow'
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function DashboardMyTasks({ tasks }: { tasks: MyTask[] }) {
  return (
    <Card className="border-border/80">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <CheckSquare size={15} className="text-primary" />
            <h2 className="font-display text-[14px] font-bold text-foreground">My tasks</h2>
            {tasks.length > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                {tasks.length}
              </span>
            )}
          </div>
          <Link
            href="/tasks"
            className="flex items-center gap-1 text-[12px] text-muted-foreground transition-colors hover:text-primary"
          >
            All tasks
            <ArrowRight size={12} />
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <CheckSquare size={28} className="text-muted-foreground/30" />
            <p className="text-[13px] text-muted-foreground">No open tasks assigned to you</p>
            <Link
              href="/tasks"
              className="mt-1 text-[12px] font-medium text-primary hover:underline"
            >
              Go to task board
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {tasks.map((task) => {
              const overdue = isOverdue(task.due_date)
              return (
                <li key={task.id}>
                  <Link
                    href="/tasks"
                    className="group flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-muted/40"
                  >
                    <div
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        overdue
                          ? 'border-destructive/50 bg-destructive/10'
                          : 'border-border bg-transparent'
                      }`}
                    >
                      {overdue && <AlertCircle size={9} className="text-destructive" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-foreground group-hover:text-primary">
                        {task.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                            STATUS_STYLES[task.status] ?? 'bg-muted-foreground/15 text-muted-foreground'
                          }`}
                        >
                          {task.status}
                        </span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                            PRIORITY_STYLES[task.priority] ?? 'bg-muted-foreground/15 text-muted-foreground'
                          }`}
                        >
                          {task.priority}
                        </span>
                        {task.due_date && (
                          <span
                            className={`flex items-center gap-1 text-[11px] ${
                              overdue ? 'text-destructive' : 'text-muted-foreground'
                            }`}
                          >
                            <Calendar size={10} />
                            {formatDate(task.due_date)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
