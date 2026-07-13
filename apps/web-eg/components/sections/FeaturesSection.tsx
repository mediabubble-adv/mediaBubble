'use client'

import { BarChart3, Layers, Rocket, ShieldCheck, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '@mediabubble/design-system'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

type FeatureItem = {
  icon: LucideIcon
  titleKey: string
  titleFallback: string
  descKey: string
  descFallback: string
}

const FEATURES: FeatureItem[] = [
  {
    icon: Rocket,
    titleKey: 'features.strategy.title',
    titleFallback: 'Strategy-first execution',
    descKey: 'features.strategy.description',
    descFallback: 'Every campaign starts with clear goals, audience insight, and a roadmap you can measure.',
  },
  {
    icon: Layers,
    titleKey: 'features.fullService.title',
    titleFallback: 'Full-service under one roof',
    descKey: 'features.fullService.description',
    descFallback:
      'SEO, paid media, branding, web, and content: coordinated by one team that knows your market.',
  },
  {
    icon: BarChart3,
    titleKey: 'features.results.title',
    titleFallback: 'Results you can report on',
    descKey: 'features.results.description',
    descFallback: 'Transparent reporting, realistic KPIs, and optimizations tied to revenue, not vanity metrics.',
  },
  {
    icon: ShieldCheck,
    titleKey: 'features.trust.title',
    titleFallback: 'Local expertise, global standards',
    descKey: 'features.trust.description',
    descFallback: 'Deep Red Sea market knowledge with production quality that stands up to international brands.',
  },
]

export function FeaturesSection() {
  const { t, dir } = useI18n()

  const [hero, ...rest] = FEATURES

  return (
    <section dir={dir} aria-labelledby="features-heading" className="py-12 sm:py-20 lg:py-28 bg-brand-surface">
      <Container>
        <SectionHeader
          kicker={t('features.kicker', 'Why MediaBubble')}
          title={
            <span id="features-heading">
              {t('features.title', 'Marketing for brands that need growth, not more posts')}
            </span>
          }
          intro={t(
            'features.intro',
            'We combine strategy, creative, and performance so tourism, hospitality, and retail brands win more customers in Hurghada and beyond.',
          )}
          align="left"
          className="mb-12 sm:mb-16 lg:mb-20 max-w-2xl"
        />

        {/* Hero feature — full-width with image */}
        <div className="border-b border-brand-whisper-border pb-10 md:pb-12 mb-0">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex gap-4 sm:gap-8 md:w-1/2">
              <div className="shrink-0 rounded-xl bg-brand-navy/[0.06] dark:bg-brand-yellow/15 flex items-center justify-center text-brand-navy dark:text-brand-yellow w-12 h-12 sm:w-14 sm:h-14">
                <hero.icon size={26} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-[clamp(1.25rem,2vw,1.5rem)] leading-snug text-brand-navy dark:text-brand-off-white mb-2">
                  {t(hero.titleKey, hero.titleFallback)}
                </h3>
                <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed max-w-prose">
                  {t(hero.descKey, hero.descFallback)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining features — 3-column grid with small images */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-0 list-none p-0 m-0"
          role="list"
        >
          {rest.map(({ icon: Icon, titleKey, titleFallback, descKey, descFallback }) => (
            <li key={titleKey} className="pt-10 border-t border-brand-whisper-border">
              <div className="flex gap-4">
                <div className="shrink-0 rounded-xl bg-brand-navy/[0.06] dark:bg-brand-yellow/15 flex items-center justify-center text-brand-navy dark:text-brand-yellow w-11 h-11">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[17px] text-brand-navy dark:text-brand-off-white mb-2">
                    {t(titleKey, titleFallback)}
                  </h3>
                  <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed max-w-prose">
                    {t(descKey, descFallback)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
