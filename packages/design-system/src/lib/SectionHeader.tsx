import * as React from 'react'

interface SectionHeaderProps {
  kicker?: string
  title: React.ReactNode
  intro?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
  id?: string
}

export function SectionHeader({
  kicker,
  title,
  intro,
  align = 'left',
  light = false,
  className = '',
  id,
}: SectionHeaderProps) {
  const centred = align === 'center'

  return (
    <div className={['max-w-2xl', centred ? 'mx-auto text-center' : '', className].join(' ')}>
      {kicker && (
        <p
          className={[
            'text-[11px] font-bold tracking-[0.12em] uppercase mb-3',
            light ? 'text-white/50' : 'text-brand-blue dark:text-brand-yellow',
          ].join(' ')}
        >
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className={[
          'font-display text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-tight mb-4',
          light ? 'text-white' : 'text-brand-navy dark:text-brand-off-white',
        ].join(' ')}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={[
            'text-[16px] sm:text-[17px] leading-relaxed',
            light ? 'text-white/70' : 'text-brand-secondary dark:text-brand-muted-steel',
          ].join(' ')}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
