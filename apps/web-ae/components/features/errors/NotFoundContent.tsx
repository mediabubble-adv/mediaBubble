'use client'

import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n/provider'

export function NotFoundContent() {
  const { t, dir } = useI18n()

  const quickLinks = [
    { label: t('nav.services', 'Services'), href: '/services' },
    { label: t('nav.about', 'About Us'), href: '/about' },
    { label: t('nav.portfolio', 'Portfolio'), href: '/case-studies' },
    { label: t('nav.blog', 'Blog'), href: '/insights' },
  ]

  return (
    <main
      id="main-content"
      tabIndex={-1}
      dir={dir}
      className="min-h-screen bg-brand-canvas flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="mb-6 w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center mx-auto">
        <Image src="/assets/logo-white.svg" alt="" width={36} height={36} />
      </div>

      <p className={marketingKickerClassName}>
        {t('errors.404.kicker', '404')}
      </p>
      <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4">
        {t('errors.404.heading', 'Page Not Found')}
      </h1>
      <p className="text-[16px] text-brand-secondary dark:text-brand-text-muted leading-relaxed mb-8 max-w-md">
        {t(
          'errors.404.body',
          "The page you were looking for does not exist or may have moved. Let's get you back on track.",
        )}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-brand-navy text-white hover:bg-[#0A3580] active:scale-[0.97] transition-all duration-150"
        >
          {t('errors.404.cta', 'Go to Homepage')}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold border-2 border-brand-navy/20 dark:border-brand-off-white/20 text-brand-navy dark:text-brand-off-white hover:border-brand-navy dark:hover:border-brand-off-white hover:bg-brand-navy/[0.04] dark:hover:bg-white/[0.06] active:scale-[0.97] transition-all duration-150"
        >
          {t('errors.404.contactCta', 'Contact Us')}
        </Link>
      </div>

      <nav
        className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2"
        aria-label={t('errors.404.quickLinks', 'Quick links')}
      >
        {quickLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-[13px] text-brand-blue hover:text-brand-navy hover:underline transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </main>
  )
}
