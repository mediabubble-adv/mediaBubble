import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// N lines of text placeholder — last line is 3/4 width for natural look.
function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3.5 rounded", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  )
}

// Card-shaped skeleton matching the module card layout.
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5",
        className,
      )}
    >
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="mt-3 h-4 w-2/3" />
      <Skeleton className="mt-1.5 h-3.5 w-full" />
      <Skeleton className="mt-3 h-5 w-12 rounded-md" />
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonCard }
