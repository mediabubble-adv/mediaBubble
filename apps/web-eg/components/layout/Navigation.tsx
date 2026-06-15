'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavigationItem {
  label: string
  href: string
}

export interface NavigationProps {
  items: NavigationItem[]
  className?: string
  linkClassName?: string
  activeClassName?: string
  ariaLabel?: string
}

/**
 * Lightweight horizontal nav for pages that do not need the full mega-menu SiteNav.
 */
export function Navigation({
  items,
  className = '',
  linkClassName = 'text-[14px] font-medium text-brand-navy/80 hover:text-brand-blue transition-colors',
  activeClassName = 'text-brand-blue font-semibold',
  ariaLabel = 'Primary',
}: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={className} aria-label={ariaLabel}>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {items.map(({ label, href }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
          return (
            <li key={href}>
              <Link href={href} className={[linkClassName, active ? activeClassName : ''].join(' ')}>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
