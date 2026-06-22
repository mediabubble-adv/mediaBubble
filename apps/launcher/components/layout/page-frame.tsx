import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/** Ultra-wide content shell — shared across Launcher module pages. */
export function PageFrame({
  children,
  width = 'ultra',
  className = '',
}: {
  children: ReactNode
  width?: 'ultra' | 'narrow' | 'full'
  className?: string
}) {
  const inner =
    width === 'narrow'
      ? 'mx-auto w-full max-w-4xl'
      : width === 'full'
        ? 'w-full'
        : 'launcher-content mx-auto w-full'

  return (
    <div className={`launcher-page px-5 py-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-16 ${className}`}>
      <div className={inner}>{children}</div>
    </div>
  )
}

export function PageHeader({
  kicker,
  title,
  description,
  icon: Icon,
  actions,
}: {
  kicker?: string
  title: string
  description?: string
  icon?: LucideIcon
  actions?: ReactNode
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        {Icon ? (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
            <Icon size={22} className="text-primary" />
          </div>
        ) : null}
        <div className="min-w-0">
          {kicker ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{kicker}</p>
          ) : null}
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-1.5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  )
}

export function PageSection({
  title,
  description,
  children,
  className = '',
}: {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={className}>
      {title ? (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  )
}
