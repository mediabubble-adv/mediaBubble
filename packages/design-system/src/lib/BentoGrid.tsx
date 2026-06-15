import * as React from 'react'

export interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={[
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export interface BentoItemProps {
  children: React.ReactNode
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
  className?: string
}

const colSpanClasses: Record<NonNullable<BentoItemProps['colSpan']>, string> = {
  1: '',
  2: 'sm:col-span-2',
  3: 'sm:col-span-2 lg:col-span-3',
}

const rowSpanClasses: Record<NonNullable<BentoItemProps['rowSpan']>, string> = {
  1: '',
  2: 'row-span-2',
}

export function BentoItem({ children, colSpan = 1, rowSpan = 1, className = '' }: BentoItemProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-brand-whisper-border bg-brand-surface',
        'dark:bg-brand-navy/40 dark:border-brand-light-border p-6',
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
