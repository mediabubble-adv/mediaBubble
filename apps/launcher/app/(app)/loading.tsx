import { PageFrame } from '@/components/layout/page-frame'
import { SkeletonStatCard, SkeletonTaskRow, SkeletonCard, Skeleton } from '@/components/ui'

export default function DashboardLoading() {
  return (
    <PageFrame>
      <div className="flex items-start gap-4 border-b border-border pb-6">
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-3 w-24 rounded" />
          <Skeleton className="mt-2 h-8 w-72 rounded-lg" />
          <Skeleton className="mt-2 h-3.5 w-96 max-w-full rounded" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
        <SkeletonStatCard className="md:col-span-5 lg:col-span-4" />
        <SkeletonStatCard className="md:col-span-3 lg:col-span-3" />
        <SkeletonStatCard className="md:col-span-4 lg:col-span-5" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-3.5 w-16 rounded" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonTaskRow key={i} />
          ))}
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="mt-4 h-20 w-full rounded-lg" />
          <Skeleton className="mt-3 h-8 w-24 rounded-md" />
        </div>
      </div>

      <div className="mt-10">
        <Skeleton className="mb-5 h-3 w-24 rounded" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </PageFrame>
  )
}
