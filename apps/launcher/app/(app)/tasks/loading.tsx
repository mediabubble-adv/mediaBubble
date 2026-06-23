import { PageFrame } from '@/components/layout/page-frame'
import { SkeletonKanbanColumn, Skeleton } from '@/components/ui'

export default function TasksLoading() {
  return (
    <PageFrame>
      {/* Header */}
      <div className="flex items-start gap-4 border-b border-border pb-6">
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-3 w-10 rounded" />
          <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>

      {/* Kanban board */}
      <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
        {[4, 3, 2, 3].map((cards, i) => (
          <SkeletonKanbanColumn key={i} cards={cards} />
        ))}
      </div>
    </PageFrame>
  )
}
