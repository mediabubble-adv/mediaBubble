'use client'

import { SiteNav, type SiteNavTopSurface } from './SiteNav'
import { SiteFooter } from './SiteFooter'

export interface MainLayoutProps {
  children: React.ReactNode
  navTopSurface?: SiteNavTopSurface
  mainClassName?: string
  showFooter?: boolean
}

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
