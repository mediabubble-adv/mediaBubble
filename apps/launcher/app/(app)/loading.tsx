import { PageFrame } from '@/components/layout/page-frame'
import {
  SkeletonStatCard,
  SkeletonTaskRow,
  SkeletonActivityItem,
  SkeletonCard,
  Skeleton,
} from '@/components/ui'

export default function DashboardLoading() {
  return (
    <PageFrame>
      {/* Header */}
      <div className="flex items-start gap-4 border-b border-border pb-6">
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="mt-2 h-8 w-64 rounded-lg" />
          <Skeleton className="mt-2 h-3.5 w-80 rounded" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>

      {/* My tasks + Activity */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">
        {/* My tasks panel */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <Skeleton className="h-3.5 w-16 rounded" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonTaskRow key={i} />
          ))}
        </div>

        {/* Activity feed panel */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-28 rounded" />
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonActivityItem key={i} />
          ))}
        </div>
      </div>

      {/* Quick nav */}
      <div className="mt-10">
        <Skeleton className="mb-5 h-2.5 w-28 rounded" />
        <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, g) => (
            <div key={g}>
              <Skeleton className="mb-4 h-2.5 w-24 rounded" />
              <div className="grid gap-2.5">
                {Array.from({ length: g % 2 === 0 ? 2 : 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageFrame>
  )
}
