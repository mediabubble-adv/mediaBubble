import * as React from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-brand-blue/10 text-brand-dark-blue dark:bg-brand-blue/20 dark:text-brand-blue',
  secondary: 'bg-brand-navy/[0.06] text-brand-navy dark:bg-white/10 dark:text-brand-off-white',
  success: 'bg-brand-success-bg text-brand-success',
  warning: 'bg-brand-warning-bg text-brand-warning',
  error: 'bg-brand-error-bg text-brand-error',
  info: 'bg-brand-info-bg text-brand-info',
}

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold leading-none',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
