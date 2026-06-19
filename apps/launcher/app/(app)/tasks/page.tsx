import type { Metadata } from 'next'
import { CheckSquare } from 'lucide-react'
import { ModulePlaceholder } from '../_shell/module-placeholder'

export const metadata: Metadata = { title: 'Tasks' }

export default function TasksPage() {
  return (
    <ModulePlaceholder
      icon={CheckSquare}
      title="Tasks"
      description="Kanban board, inline timers, comments."
      status="Week 3"
    />
  )
}
