'use client'

import { useEffect } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { trackServiceViewed } from '@mediabubble/shared/client'
import type { ServicePageConfig, ServiceSectionId } from '@/lib/content/services/types'
import { ServiceHeroSection } from './sections/ServiceHeroSection'
import { ProblemsSection } from './sections/ProblemsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { CaseStudySection } from './sections/CaseStudySection'
import { FaqSection } from './sections/FaqSection'
import { ServiceCtaSection } from './sections/ServiceCtaSection'
import {
  AuditChecklistSection,
  LocalPackSection,
  RankingTimelineSection,
} from './sections/SeoExclusiveSections'
import {
  BeforeAfterSection,
  BudgetFrameworkSection,
  ChannelMatrixSection,
  ContentCalendarSection,
  DistributionMapSection,
  EditorialPillarsSection,
  EventTimelineSection,
  IdentityDeliverablesSection,
  LaunchChecklistSection,
  PerformanceMetricsSection,
  PlatformBadgesSection,
  PlatformShowcaseSection,
  TechStackSection,
  VenueShowcaseSection,
} from './sections/ServiceExclusiveSections'

function renderSection(config: ServicePageConfig, sectionId: ServiceSectionId) {
  switch (sectionId) {
    case 'hero':
      return <ServiceHeroSection key={sectionId} hero={config.hero} slug={config.slug} />
    case 'problems':
      return config.problems ? <ProblemsSection key={sectionId} problems={config.problems} /> : null
    case 'process':
      return config.process ? <ProcessSection key={sectionId} /> : null
    case 'rankingTimeline':
      return config.rankingTimeline ? (
        <RankingTimelineSection key={sectionId} data={config.rankingTimeline} />
      ) : null
    case 'localPack':
      return config.localPack ? <LocalPackSection key={sectionId} data={config.localPack} /> : null
    case 'auditChecklist':
      return config.auditChecklist ? (
        <AuditChecklistSection key={sectionId} data={config.auditChecklist} />
      ) : null
    case 'platformBadges':
      return config.platformBadges ? (
        <PlatformBadgesSection key={sectionId} data={config.platformBadges} />
      ) : null
    case 'channelMatrix':
      return config.channelMatrix ? (
        <ChannelMatrixSection key={sectionId} data={config.channelMatrix} />
      ) : null
    case 'budgetFramework':
      return config.budgetFramework ? (
        <BudgetFrameworkSection key={sectionId} data={config.budgetFramework} />
      ) : null
    case 'contentCalendar':
      return config.contentCalendar ? (
        <ContentCalendarSection key={sectionId} data={config.contentCalendar} />
      ) : null
    case 'platformShowcase':
      return config.platformShowcase ? (
        <PlatformShowcaseSection key={sectionId} data={config.platformShowcase} />
      ) : null
    case 'beforeAfter':
      return config.beforeAfter ? <BeforeAfterSection key={sectionId} data={config.beforeAfter} /> : null
    case 'identityDeliverables':
      return config.identityDeliverables ? (
        <IdentityDeliverablesSection key={sectionId} data={config.identityDeliverables} />
      ) : null
    case 'techStack':
      return config.techStack ? <TechStackSection key={sectionId} data={config.techStack} /> : null
    case 'performanceMetrics':
      return config.performanceMetrics ? (
        <PerformanceMetricsSection key={sectionId} data={config.performanceMetrics} />
      ) : null
    case 'launchChecklist':
      return config.launchChecklist ? (
        <LaunchChecklistSection key={sectionId} data={config.launchChecklist} />
      ) : null
    case 'editorialPillars':
      return config.editorialPillars ? (
        <EditorialPillarsSection key={sectionId} data={config.editorialPillars} />
      ) : null
    case 'distributionMap':
      return config.distributionMap ? (
        <DistributionMapSection key={sectionId} data={config.distributionMap} />
      ) : null
    case 'eventTimeline':
      return config.eventTimeline ? (
        <EventTimelineSection key={sectionId} data={config.eventTimeline} />
      ) : null
    case 'venueShowcase':
      return config.venueShowcase ? (
        <VenueShowcaseSection key={sectionId} data={config.venueShowcase} />
      ) : null
    case 'features':
      return <FeaturesSection key={sectionId} features={config.features} />
    case 'caseStudy':
      return <CaseStudySection key={sectionId} caseStudy={config.caseStudy} />
    case 'faq':
      return <FaqSection key={sectionId} faqs={config.faqs} />
    case 'cta':
      return <ServiceCtaSection key={sectionId} kicker={config.hero.kicker} />
    default: {
      const _exhaustive: never = sectionId
      return _exhaustive
    }
  }
}

export function ServicePageRenderer({ config }: { config: ServicePageConfig }) {
  useEffect(() => {
    trackServiceViewed(config.hero.kicker)
  }, [config.hero.kicker])

  return (
    <MainLayout>
      {config.sections.map((sectionId) => renderSection(config, sectionId))}
    </MainLayout>
  )
}
