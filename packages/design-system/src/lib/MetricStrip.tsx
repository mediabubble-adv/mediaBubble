import * as React from 'react'

export interface MetricStripItem {
  value: string
  label: string
}

export type MetricStripVariant = 'hero' | 'dark-bar' | 'light'

const variantClasses: Record<MetricStripVariant, { container: string; value: string; label: string }> = {
  hero: {
    container: 'border-t border-white/20 pt-6',
    value: 'font-display text-[2rem] font-bold text-brand-yellow leading-none mb-1',
    label: 'text-[12px] text-white/50 font-medium uppercase tracking-wide',
  },
  'dark-bar': {
    container: '',
    value: 'font-display font-semibold text-white tabular-nums tracking-tight',
    label: 'text-[13px] sm:text-[14px] text-white/65',
  },
  light: {
    container: '',
    value: 'text-[28px] sm:text-[34px] font-bold text-brand-yellow leading-none',
    label: 'text-[12px] text-brand-secondary dark:text-brand-text-muted mt-1',
  },
}

export interface MetricStripProps {
  items: MetricStripItem[]
  variant?: MetricStripVariant
  columns?: 2 | 3 | 4
  className?: string
  'aria-label'?: string
}

export function MetricStrip({
  items,
  variant = 'hero',
  columns = 3,
  className = '',
  'aria-label': ariaLabel = 'Key metrics',
}: MetricStripProps) {
  const styles = variantClasses[variant]

  if (variant === 'dark-bar') {
    return (
      <ul
        className={[
          'flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-3 list-none p-0 m-0',
          className,
        ].join(' ')}
        role="list"
        aria-label={ariaLabel}
      >
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-4 sm:gap-5">
            {index > 0 ? (
              <span className="hidden sm:block h-4 w-px bg-white/20 shrink-0" aria-hidden="true" />
            ) : null}
            <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className={styles.value}>{item.value}</span>
              <span className={styles.label}>{item.label}</span>
            </span>
          </li>
        ))}
      </ul>
    )
  }

  const gridCols =
    columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'

  return (
    <div
      className={[
        variant === 'hero' ? 'flex flex-wrap gap-8' : `grid ${gridCols} gap-6`,
        styles.container,
        className,
      ].join(' ')}
      role="list"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} role="listitem">
          <p className={styles.value}>{item.value}</p>
          <p className={styles.label}>{item.label}</p>
        </div>
      ))}
    </div>
  )
}
