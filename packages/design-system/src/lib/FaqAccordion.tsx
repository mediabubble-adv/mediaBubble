import * as React from 'react'

export interface FaqAccordionItem {
  question: string
  answer: string
}

export interface FaqAccordionProps {
  items: FaqAccordionItem[]
  className?: string
  'aria-label'?: string
}

export function FaqAccordion({
  items,
  className = '',
  'aria-label': ariaLabel = 'Frequently asked questions',
}: FaqAccordionProps) {
  return (
    <div
      className={['divide-y divide-brand-whisper-border dark:divide-white/10', className].join(' ')}
      role="region"
      aria-label={ariaLabel}
    >
      {items.map((faq, index) => (
        <details key={`${faq.question}-${index}`} className="group py-5 first:pt-0 last:pb-0">
          <summary
            className={[
              'flex cursor-pointer select-none list-none items-start justify-between gap-4',
              'text-[15px] font-semibold text-brand-navy dark:text-brand-off-white',
              '[&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-sm',
            ].join(' ')}
          >
            <span>{faq.question}</span>
            <span
              className={[
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                'border border-brand-navy/20 dark:border-white/20 text-[11px]',
                'text-brand-navy/50 dark:text-white/50 transition-transform duration-200 group-open:rotate-180',
              ].join(' ')}
              aria-hidden="true"
            >
              ▾
            </span>
          </summary>
          <p className="mt-3 text-[14px] leading-relaxed text-brand-secondary dark:text-brand-text-muted">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
