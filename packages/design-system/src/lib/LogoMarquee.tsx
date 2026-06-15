'use client'

import * as React from 'react'

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return prefersReducedMotion
}

export interface LogoMarqueeItem {
  src: string
  alt: string
  href?: string
}

export interface LogoMarqueeProps {
  items: LogoMarqueeItem[]
  duration?: number
  reverse?: boolean
  className?: string
  'aria-label'?: string
}

export function LogoMarquee({
  items,
  duration = 40,
  reverse = false,
  className = '',
  'aria-label': ariaLabel = 'Client logos',
}: LogoMarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const duplicated = prefersReducedMotion ? items : [...items, ...items]
  const animClass = prefersReducedMotion
    ? ''
    : reverse
      ? 'animate-marquee-right'
      : 'animate-marquee-left'

  return (
    <div className={['overflow-hidden relative', className].join(' ')} aria-label={ariaLabel}>
      <div
        className={[
          prefersReducedMotion
            ? 'flex flex-wrap justify-center gap-8 items-center'
            : 'flex w-max gap-10 items-center',
          animClass,
        ].join(' ')}
        style={prefersReducedMotion ? undefined : { animationDuration: `${duration}s` }}
      >
        {duplicated.map((item, index) => {
          const img = (
            <img
              src={item.src}
              alt={item.alt}
              className="h-8 sm:h-10 w-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-200"
              loading="lazy"
            />
          )

          return item.href ? (
            <a key={`${item.alt}-${index}`} href={item.href} className="shrink-0">
              {img}
            </a>
          ) : (
            <span key={`${item.alt}-${index}`} className="shrink-0">
              {img}
            </span>
          )
        })}
      </div>
    </div>
  )
}
