import { PageFrame } from '@/components/layout/page-frame'
import { SkeletonStatCard, SkeletonListRow, Skeleton } from '@/components/ui'

export default function FinanceLoading() {
  return (
    <PageFrame>
      {/* Header */}
      <div className="flex items-start gap-4 border-b border-border pb-6">
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="mt-2 h-8 w-32 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>

      {/* Summary stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>

      {/* AI brief banner */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="mt-2 h-3 w-full rounded" />
            <Skeleton className="mt-1.5 h-3 w-5/6 rounded" />
            <Skeleton className="mt-1.5 h-3 w-4/6 rounded" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1">
        {[80, 80, 96, 96].map((w, i) => (
          <Skeleton key={i} className="h-8 rounded-lg" style={{ width: w }} />
        ))}
      </div>

      {/* Transaction rows */}
      <div className="mt-4 rounded-lg border border-border">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonListRow key={i} />
        ))}
      </div>
    </PageFrame>
  )
}
