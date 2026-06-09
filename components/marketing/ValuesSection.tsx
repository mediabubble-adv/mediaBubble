'use client'

import { Target, BarChart2, Users, Lightbulb } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'

const VALUES = [
  {
    icon:  Target,
    color: '#2196F3',
    titleKey:   'about.values.results.title',
    descKey:    'about.values.results.desc',
    titleFallback: 'Results First',
    descFallback:  'Every campaign starts with a measurable goal. We tie every deliverable to a business outcome — not vanity metrics.',
  },
  {
    icon:  BarChart2,
    color: '#072A6B',
    titleKey:   'about.values.data.title',
    descKey:    'about.values.data.desc',
    titleFallback: 'Data-Driven',
    descFallback:  'We make decisions based on evidence. A/B tests, attribution modelling, and weekly reporting keep every campaign honest.',
  },
  {
    icon:  Users,
    color: '#1565C0',
    titleKey:   'about.values.partnership.title',
    descKey:    'about.values.partnership.desc',
    titleFallback: 'True Partnership',
    descFallback:  'We act as an extension of your team. You have a dedicated strategist, regular strategy calls, and full visibility into our work.',
  },
  {
    icon:  Lightbulb,
    color: '#FFC107',
    titleKey:   'about.values.creative.title',
    descKey:    'about.values.creative.desc',
    titleFallback: 'Creative Rigour',
    descFallback:  'Great creative and rigorous strategy are not opposites. We push for both — work that stands out and converts.',
  },
] as const

export function ValuesSection() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="py-10 sm:py-16 lg:py-20 bg-white" aria-label="Our values">
      <Container>
        <div className="max-w-2xl mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2196F3] mb-3">
            {t('about.values.kicker', 'How We Work')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#072A6B] leading-tight mb-4">
            {t('about.values.title', 'The Principles Behind Every Campaign')}
          </h2>
          <p className="text-[16px] text-[#666] leading-relaxed">
            {t('about.values.subtitle', "We've refined our approach over ten years of working with businesses in Hurghada and across Egypt. These four principles drive every decision we make.")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((v) => {
            const Icon = v.icon
            return (
              <div
                key={v.titleKey}
                className="bg-[#FAFAFA] rounded-2xl border border-[#E8E8E8] p-8"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${v.color}14` }}
                >
                  <Icon size={20} strokeWidth={1.75} style={{ color: v.color }} />
                </div>
                <h3 className="font-display text-[18px] font-bold text-[#1A1A2E] mb-2">
                  {t(v.titleKey, v.titleFallback)}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  {t(v.descKey, v.descFallback)}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
