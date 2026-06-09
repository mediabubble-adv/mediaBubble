'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'

const FOOTER_SERVICES = [
  { key: 'footer.services.seo',      href: '/services#seo',      fallback: 'SEO & Organic Growth' },
  { key: 'footer.services.ppc',      href: '/services#ppc',      fallback: 'Paid Advertising' },
  { key: 'footer.services.social',   href: '/services#social',   fallback: 'Social Media Marketing' },
  { key: 'footer.services.branding', href: '/services#branding', fallback: 'Branding & Design' },
  { key: 'footer.services.web',      href: '/services#web',      fallback: 'Web Development' },
  { key: 'footer.services.content',  href: '/services#content',  fallback: 'Content Marketing' },
  { key: 'footer.services.events',   href: '/services#events',   fallback: 'Events & Activations' },
] as const

const FOOTER_RESOURCES = [
  { key: 'footer.resources.blog',           href: '/blog',     fallback: 'Blog' },
  { key: 'footer.resources.caseStudies',    href: '/portfolio',fallback: 'Case Studies' },
  { key: 'footer.resources.freeAudit',      href: '/contact',  fallback: 'Free Marketing Audit' },
  { key: 'footer.resources.brandGuidelines',href: '/brand',    fallback: 'Brand Guidelines' },
] as const

const FOOTER_LEGAL = [
  { key: 'footer.legal.privacy', href: '/privacy', fallback: 'Privacy Policy' },
  { key: 'footer.legal.terms',   href: '/terms',   fallback: 'Terms of Service' },
  { key: 'footer.legal.cookies', href: '/cookies', fallback: 'Cookie Policy' },
] as const

export function SiteFooter() {
  const { t, dir } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer dir={dir} className="bg-brand-navy border-t border-white/[0.06]" role="contentinfo">
      <Container className="py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group" aria-label="MediaBubble homepage">
              <Image src="/assets/logo-white.svg" alt="" width={32} height={32} className="shrink-0" />
              <span className="font-display font-bold text-[15px] text-white">MediaBubble</span>
            </Link>
            <p className="text-[13px] text-white/50 leading-relaxed mb-4">
              {t('footer.company.tagline', 'Strategic creative that fills rooms and grows brands.')}
            </p>
            <p className="text-[12px] text-white/35 leading-relaxed">
              {t('footer.company.description', "MediaBubble is a full-service marketing and advertising agency based in Hurghada, Egypt. We've been helping businesses grow since 2015.")}
            </p>
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
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/30 mb-4">
              {t('contact.info.heading', 'Other Ways to Reach Us')}
            </p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${t('contact.info.email', 'hello@mediabubble.com')}`} className="text-[13px] text-white/50 hover:text-white transition-colors duration-150 block">
                  {t('contact.info.email', 'hello@mediabubble.com')}
                </a>
              </li>
              <li>
                <a href={`tel:${t('contact.info.phone', '+20123456789')}`} className="text-[13px] text-white/50 hover:text-white transition-colors duration-150 block">
                  {t('contact.info.phone', '+20 123 456 7890')}
                </a>
              </li>
              <li className="text-[13px] text-white/35">
                {t('contact.info.address', 'Hurghada, Red Sea Governorate, Egypt')}
              </li>
              <li className="text-[12px] text-white/30">
                {t('contact.info.hours', 'Sunday – Thursday, 9 AM – 6 PM (EET)')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/30">
            {t('footer.copyright', `© ${year} MediaBubble. All rights reserved.`).replace('{{year}}', String(year))}
          </p>
          <div className="flex items-center gap-5">
            {FOOTER_LEGAL.map(({ key, href, fallback }) => (
              <Link key={key} href={href} className="text-[12px] text-white/30 hover:text-white/60 transition-colors duration-150">
                {t(key, fallback)}
              </Link>
            ))}
          </div>
          <p className="text-[12px] text-white/20">
            {t('footer.madeIn', 'Made with ☀️ in Hurghada, Egypt.')}
          </p>
        </div>
      </Container>
    </footer>
  )
}
