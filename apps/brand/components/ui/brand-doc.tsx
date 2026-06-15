import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

const cardShell =
  'rounded-xl border border-brand-whisper-border dark:border-brand-light-border bg-brand-surface'

const rowHover =
  'transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.04] active:bg-black/[0.04] dark:active:bg-white/[0.06]'

export function BrandPageContent({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto ${className}`.trim()}>
      {children}
    </div>
  )
}

export function BrandSectionHeading({
  title,
  icon: Icon,
  className = '',
}: {
  title: ReactNode
  icon?: LucideIcon
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2.5 mb-4 ${className}`.trim()}>
      {Icon ? (
        <Icon size={15} strokeWidth={2} className="shrink-0 text-brand-blue" aria-hidden />
      ) : null}
      <h2 className="text-[13px] font-semibold text-brand-dark-blue dark:text-brand-blue">{title}</h2>
    </div>
  )
}

export function BrandDocCard({
  children,
  className = '',
  padded = true,
}: {
  children: ReactNode
  className?: string
  padded?: boolean
}) {
  return (
    <div className={[cardShell, padded ? 'p-5 sm:p-6' : 'overflow-hidden', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export function BrandDocRow({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={[rowHover, onClick ? 'w-full text-start' : '', className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  )
}

export function BrandInfoBand({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'rounded-lg px-4 py-2.5 mb-5',
        'bg-brand-info-bg dark:bg-brand-navy/30',
        'border border-brand-whisper-border dark:border-brand-light-border',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

export function BrandBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm text-brand-text leading-relaxed ${className}`.trim()}>{children}</p>
}

export function BrandMuted({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[12px] text-brand-text-secondary dark:text-brand-text-muted ${className}`.trim()}>
      {children}
    </p>
  )
}

export const brandDocCardShell = cardShell
export const brandDocRowHover = rowHover
