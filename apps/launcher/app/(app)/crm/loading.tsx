import { PageFrame } from '@/components/layout/page-frame'
import { SkeletonListRow, Skeleton } from '@/components/ui'

export default function CrmLoading() {
  return (
    <PageFrame>
      {/* Header */}
      <div className="flex items-start gap-4 border-b border-border pb-6">
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-3 w-10 rounded" />
          <Skeleton className="mt-2 h-8 w-16 rounded-lg" />
        </div>
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1">
        {[72, 64, 88].map((w, i) => (
          <Skeleton key={i} className="h-8 rounded-lg" style={{ width: w }} />
        ))}
      </div>

      {/* Search bar */}
      <div className="mt-4">
        <Skeleton className="h-9 w-72 rounded-lg" />
      </div>

      {/* Table header */}
      <div className="mt-4 flex items-center gap-4 rounded-t-lg border border-border bg-muted/40 px-4 py-2.5">
        {[40, 20, 20, 15].map((w, i) => (
          <Skeleton key={i} className="h-2.5 rounded" style={{ width: `${w}%` }} />
        ))}
      </div>

      {/* Rows */}
      <div className="rounded-b-lg border border-t-0 border-border">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonListRow key={i} />
        ))}
      </div>
    </PageFrame>
  )
}
