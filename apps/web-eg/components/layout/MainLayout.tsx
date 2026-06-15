'use client'

import { SiteNav, type SiteNavTopSurface } from './SiteNav'
import { SiteFooter } from './SiteFooter'

export interface MainLayoutProps {
  children: React.ReactNode
  navTopSurface?: SiteNavTopSurface
  mainClassName?: string
  showFooter?: boolean
}

/**
 * Standard marketing shell: sticky header, skip-target main landmark, site footer.
 */
export function MainLayout({
  children,
  navTopSurface = 'dark',
  mainClassName = '',
  showFooter = true,
}: MainLayoutProps) {
  return (
    <>
      <SiteNav topSurface={navTopSurface} />
      <main id="main-content" tabIndex={-1} className={mainClassName}>
        {children}
      </main>
      {showFooter ? <SiteFooter /> : null}
    </>
  )
}
