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

function featureLayoutClass(index: number): string {
  if (index === 0) {
    return 'md:col-span-2 border-b border-brand-whisper-border pb-10 md:pb-12'
  }
  return 'md:pt-10 md:border-t md:border-brand-whisper-border'
}

export function FeaturesSection() {
  const { t, dir } = useI18n()

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

        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 list-none p-0 m-0"
          role="list"
        >
          {FEATURES.map(({ icon: Icon, titleKey, titleFallback, descKey, descFallback }, index) => (
            <li key={titleKey} className={featureLayoutClass(index)}>
              <div className={`flex gap-4 sm:gap-5 ${index === 0 ? 'md:gap-8' : ''}`}>
                <div
                  className={`shrink-0 rounded-xl bg-brand-navy/[0.06] dark:bg-brand-yellow/15 flex items-center justify-center text-brand-navy dark:text-brand-yellow ${
                    index === 0 ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-11 h-11'
                  }`}
                >
                  <Icon size={index === 0 ? 26 : 22} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3
                    className={`font-semibold text-brand-navy dark:text-brand-off-white mb-2 ${
                      index === 0
                        ? 'font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-snug'
                        : 'text-[17px]'
                    }`}
                  >
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
