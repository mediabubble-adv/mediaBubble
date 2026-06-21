import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Button } from './button'

export interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-whisper-border bg-brand-surface/40 px-6 py-14 text-center">
      <Icon size={36} className="mb-4 text-brand-text-muted/40" aria-hidden="true" />
      <h3 className="text-[15px] font-bold text-brand-text">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-sm text-[13px] text-brand-text-muted">{description}</p>
      ) : null}
      {action ? (
        <Button size="sm" onClick={action.onClick} className="mt-5">
          {action.label}
        </Button>
      ) : null}
    </div>
  )
}
