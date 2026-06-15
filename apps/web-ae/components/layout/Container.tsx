import React from 'react'

export interface ContainerProps {
  /** Extra Tailwind classes applied on top of the base container */
  className?: string
  children: React.ReactNode
  /** Render as a different element type (default: div) */
  as?: React.ElementType
}

/**
 * Centered, max-width container that enforces the 8px-grid padding scale:
 *   mobile  24px  (px-6  = 3 × 8)
 *   tablet  32px  (px-8  = 4 × 8)
 *   desktop 48px  (px-12 = 6 × 8)
 *
 * Max content width: 1400px (matches brand-guidelines max width)
 */
export function Container({ className = '', children, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12 ${className}`.trim()}>
      {children}
    </Tag>
  )
}
