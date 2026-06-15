'use client'

import Link from 'next/link'
import Image from 'next/image'
import { resolveMarketSiteConfig, useOfficeOpen, FooterSocialLinks } from '@mediabubble/shared/client'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from './Container'
import { FooterMarketSwitch } from './FooterMarketSwitch'

const FOOTER_SERVICES = [
  { key: 'footer.services.seo',      href: '/services/seo',      fallback: 'SEO & Organic Growth' },
  { key: 'footer.services.ppc',      href: '/services/ppc',      fallback: 'Paid Advertising' },
  { key: 'footer.services.social',   href: '/services/social',   fallback: 'Social Media Marketing' },
  { key: 'footer.services.branding', href: '/services/branding', fallback: 'Branding & Design' },
  { key: 'footer.services.web',      href: '/services/web',      fallback: 'Web Development' },
  { key: 'footer.services.content',  href: '/contact',           fallback: 'Content Marketing' },
  { key: 'footer.services.events',   href: '/contact',           fallback: 'Events & Activations' },
] as const

const FOOTER_RESOURCES = [
  { key: 'footer.resources.blog',           href: '/insights',     fallback: 'Blog' },
  { key: 'footer.resources.caseStudies',    href: '/case-studies',fallback: 'Case Studies' },
  { key: 'footer.resources.freeAudit',      href: '/contact',  fallback: 'Free Marketing Audit' },
  { key: 'footer.resources.brandGuidelines',href: '/brand',    fallback: 'Brand Guidelines' },
] as const

const FOOTER_LEGAL = [
  { key: 'footer.legal.privacy', href: '/privacy', fallback: 'Privacy Policy' },
  { key: 'footer.legal.terms',   href: '/terms',   fallback: 'Terms of Service' },
  { key: 'footer.legal.cookies', href: '/cookies', fallback: 'Cookie Policy' },
] as const

const site = resolveMarketSiteConfig('ae')
const PHONE_DISPLAY_FALLBACK = '+971 50 123 4567'

export function SiteFooter() {
  const { t, dir } = useI18n()
  const year = new Date().getFullYear()
  const officeOpen = useOfficeOpen('ae')

  return (
    <footer dir={dir} className="bg-brand-navy border-t border-white/[0.06]" role="contentinfo">
      <Container className="py-12 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group" aria-label="MediaBubble homepage">
              <Image src="/assets/Logo/mediaBubble_icon.svg" alt="" width={32} height={32} className="shrink-0" />
              <span className="font-display font-bold text-[15px] text-white">MediaBubble</span>
            </Link>
            <p className="text-[13px] text-white/50 leading-relaxed mb-4">
              {t('footer.company.tagline', 'Strategic creative that fills rooms and grows brands.')}
            </p>
            <p className="text-[12px] text-white/35 leading-relaxed">
              {t('footer.company.description', "MediaBubble is a full-service marketing and advertising agency based in Dubai, UAE. We've been helping businesses grow since 2015.")}
            </p>
            <FooterMarketSwitch activeMarket="ae" />
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/30 mb-4">
              {t('footer.services.heading', 'Services')}
            </p>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map(({ key, href, fallback }) => (
                <li key={key}>
                  <Link href={href} className="text-[13px] text-white/50 hover:text-white transition-colors duration-150">
                    {t(key, fallback)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/30 mb-4">
              {t('footer.resources.heading', 'Resources')}
            </p>
            <ul className="space-y-2.5">
              {FOOTER_RESOURCES.map(({ key, href, fallback }) => (
                <li key={key}>
                  <Link href={href} className="text-[13px] text-white/50 hover:text-white transition-colors duration-150">
                    {t(key, fallback)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/30 mb-4">
                {t('contact.info.officeHeading', 'Our Office')}
              </p>
              <ul className="space-y-3">
                <li className="text-[13px] text-white/35">
                  {t('contact.info.address', 'Dubai, UAE')}
                </li>
                <li className="text-[12px] text-white/30">
                  {t('contact.info.hours', 'Sunday – Thursday, 9 AM – 6 PM (GST)')}
                </li>
                <li>
                  <p
                    className="flex items-center gap-2 text-[12px] font-medium"
                    role="status"
                    aria-live="polite"
                  >
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${officeOpen ? 'bg-emerald-400' : 'bg-white/35'}`}
                      aria-hidden
                    />
                    <span className={officeOpen ? 'text-emerald-400/90' : 'text-white/40'}>
                      {t(
                        officeOpen ? 'contact.info.officeOpen' : 'contact.info.officeClosed',
                        officeOpen ? 'Office open now' : 'Office closed',
                      )}
                    </span>
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/30 mb-4">
                {t('contact.info.heading', 'Reach Us')}
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[13px] text-white/50 hover:text-white transition-colors duration-150 block"
                  >
                    {t('contact.info.email', site.email)}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone}`}
                    dir="ltr"
                    className="text-[13px] text-white/50 hover:text-white transition-colors duration-150 block tabular-nums [unicode-bidi:isolate]"
                  >
                    {t('contact.info.phone', PHONE_DISPLAY_FALLBACK)}
                  </a>
                </li>
                <li>
                  <FooterSocialLinks />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/30 text-center sm:text-start">
            {t('footer.copyright', `© ${year} MediaBubble. All rights reserved.`).replace('{{year}}', String(year))}
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            aria-label={t('footer.legal.heading', 'Legal')}
          >
            {FOOTER_LEGAL.map(({ key, href, fallback }) => (
              <Link key={key} href={href} className="text-[12px] text-white/30 hover:text-white/60 transition-colors duration-150">
                {t(key, fallback)}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
