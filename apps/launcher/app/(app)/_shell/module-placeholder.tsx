import type { LucideIcon } from 'lucide-react'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'

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
    <PageFrame width="narrow">
      <PageHeader icon={Icon} title={title} description={description} />

      <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
        <Icon size={32} className="text-muted-foreground" />
        <p className="mt-4 text-[16px] font-bold text-foreground">Coming {status}</p>
        <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted-foreground">
          This module is part of the Phase 1 roadmap and lands {status}.
        </p>
      </div>
    </PageFrame>
  )
}
