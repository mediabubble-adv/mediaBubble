import React from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Button } from './button'

export interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  href?: { label: string; href: string }
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, href, className }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center ${className ?? ''}`}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/15">
        <Icon size={20} className="text-primary/80" aria-hidden="true" />
      </div>
      <h3 className="text-[14px] font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {action ? (
        <Button size="sm" onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      ) : null}
      {href ? (
        <Button asChild size="sm" className="mt-4">
          <Link href={href.href}>{href.label}</Link>
        </Button>
      ) : null}
    </div>
  )
}
