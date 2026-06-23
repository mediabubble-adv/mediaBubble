import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Primitive ──────────────────────────────────────────────────────────────

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// ─── Text block ─────────────────────────────────────────────────────────────

// N lines of text — last line is 3/4 width for a natural paragraph look.
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

// ─── Module nav card ────────────────────────────────────────────────────────

// Matches the compact module quick-nav cards (icon + title + description).
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-4", className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="mt-1.5 h-3 w-3/4" />
        </div>
        <Skeleton className="h-3 w-3 shrink-0 rounded" />
      </div>
    </div>
  )
}

// ─── Stat card ──────────────────────────────────────────────────────────────

// Matches the 4-up dashboard stat cards (label + large value + hint).
function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-2.5 w-24 rounded" />
        <Skeleton className="h-3.5 w-3.5 rounded" />
      </div>
      <Skeleton className="mt-4 h-7 w-16 rounded" />
      <Skeleton className="mt-2 h-3 w-32 rounded" />
    </div>
  )
}

// ─── List row ───────────────────────────────────────────────────────────────

// Matches table-style rows used in CRM, invoices, quotations.
function SkeletonListRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 border-b border-border/60 px-4 py-3.5", className)}>
      <Skeleton className="h-4 w-4 shrink-0 rounded" />
      <Skeleton className="h-3.5 w-2/5 rounded" />
      <Skeleton className="h-3.5 w-1/5 rounded" />
      <Skeleton className="ml-auto h-5 w-16 rounded-full" />
    </div>
  )
}

// ─── Task row ───────────────────────────────────────────────────────────────

// Matches the My Tasks list items on the dashboard widget.
function SkeletonTaskRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-start gap-3 border-b border-border/60 px-5 py-3.5", className)}>
      <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-3.5 w-4/5 rounded" />
        <div className="mt-1.5 flex gap-1.5">
          <Skeleton className="h-3 w-14 rounded-full" />
          <Skeleton className="h-3 w-12 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// ─── Activity item ──────────────────────────────────────────────────────────

// Matches the recent activity feed rows.
function SkeletonActivityItem({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-start gap-3 border-b border-border/60 px-5 py-3.5", className)}>
      <Skeleton className="mt-0.5 h-7 w-7 shrink-0 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="h-3.5 w-3/5 rounded" />
        <Skeleton className="mt-1.5 h-3 w-2/5 rounded" />
      </div>
    </div>
  )
}

// ─── Kanban column ──────────────────────────────────────────────────────────

// Matches a single kanban column with a header and N card stubs.
function SkeletonKanbanColumn({ cards = 3, className }: { cards?: number; className?: string }) {
  return (
    <div className={cn("flex w-72 shrink-0 flex-col gap-3 rounded-xl border border-border bg-card/60 p-3", className)}>
      <div className="flex items-center justify-between px-1 py-1">
        <Skeleton className="h-3.5 w-20 rounded" />
        <Skeleton className="h-5 w-6 rounded-full" />
      </div>
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-3.5">
          <Skeleton className="h-3.5 w-4/5 rounded" />
          <Skeleton className="mt-2 h-3 w-3/5 rounded" />
          <div className="mt-3 flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-16 rounded-full" />
            <Skeleton className="ml-auto h-3 w-10 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonStatCard,
  SkeletonListRow,
  SkeletonTaskRow,
  SkeletonActivityItem,
  SkeletonKanbanColumn,
}
