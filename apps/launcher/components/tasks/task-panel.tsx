'use client'

import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { TaskWorkspace } from './task-workspace'
import type { BoardMember } from './types'

interface TaskPanelProps {
  taskId: string
  members: BoardMember[]
  currentUserId: string | null
  onClose: () => void
  onTaskUpdated?: () => void
}

export function TaskPanel({
  taskId,
  members,
  currentUserId,
  onClose,
  onTaskUpdated,
}: TaskPanelProps) {
  return (
    <Sheet open onOpenChange={(open) => { if (!open) onClose() }}>
      <SheetContent
        side="right"
        className="flex w-full max-w-none flex-col gap-0 border-s border-border p-0 shadow-none sm:max-w-[52vw]"
      >
        <SheetTitle className="sr-only">Task details</SheetTitle>
        <TaskWorkspace
          taskId={taskId}
          members={members}
          currentUserId={currentUserId}
          variant="panel"
          onClose={onClose}
          onTaskUpdated={onTaskUpdated}
        />
      </SheetContent>
    </Sheet>
  )
}
