import type { LucideIcon } from 'lucide-react'

// Shared "coming soon" body for nav routes whose module isn't built yet.
export function ModulePlaceholder({
  icon: Icon,
  title,
  description,
  status,
}: {
  icon: LucideIcon
  title: string
  description: string
  status: string
}) {
  return (
    <div className="px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Icon size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-[13px] text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <Icon size={28} className="text-muted-foreground" />
          <p className="mt-3 text-[15px] font-bold text-foreground">Coming {status}</p>
          <p className="mt-1 max-w-sm text-[13px] text-muted-foreground">
            This module is part of the Phase 1 roadmap and lands {status}.
          </p>
        </div>
      </div>
    </div>
  )
}
