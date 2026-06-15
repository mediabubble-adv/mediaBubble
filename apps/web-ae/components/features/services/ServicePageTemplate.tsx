'use client'

import { useEffect } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { trackServiceViewed } from '@mediabubble/shared/client'
import type { ServiceData } from '@/lib/services-data'
import { ServiceHeroSection } from './sections/ServiceHeroSection'
import { ProblemsSection } from './sections/ProblemsSection'
import { ProcessSection } from './sections/ProcessSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { CaseStudySection } from './sections/CaseStudySection'
import { FaqSection } from './sections/FaqSection'
import { ServiceCtaSection } from './sections/ServiceCtaSection'

export function ServicePageTemplate({ service }: { service: ServiceData }) {
  useEffect(() => {
    trackServiceViewed(service.hero.kicker)
  }, [service.hero.kicker])

  return (
    <MainLayout>
      <ServiceHeroSection hero={service.hero} slug={service.slug} />
      <ProblemsSection problems={service.problems} />
      <ProcessSection process={service.process} />
      <FeaturesSection features={service.features} />
      <CaseStudySection caseStudy={service.caseStudy} />
      <FaqSection faqs={service.faqs} />
      <ServiceCtaSection kicker={service.hero.kicker} />
    </MainLayout>
  )
}
