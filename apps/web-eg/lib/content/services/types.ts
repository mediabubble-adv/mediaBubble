import type { ServiceData } from '@/lib/services-data'

export type ServiceSectionId =
  | 'hero'
  | 'problems'
  | 'process'
  | 'rankingTimeline'
  | 'localPack'
  | 'auditChecklist'
  | 'platformBadges'
  | 'channelMatrix'
  | 'budgetFramework'
  | 'contentCalendar'
  | 'platformShowcase'
  | 'beforeAfter'
  | 'identityDeliverables'
  | 'techStack'
  | 'performanceMetrics'
  | 'launchChecklist'
  | 'editorialPillars'
  | 'distributionMap'
  | 'eventTimeline'
  | 'venueShowcase'
  | 'features'
  | 'caseStudy'
  | 'faq'
  | 'cta'

export interface SectionBlockData {
  kicker?: string
  title: string
  intro?: string
}

export interface RankingTimelineData extends SectionBlockData {
  highlights?: Array<{ value: string; label: string }>
  milestones: Array<{ step: string; title: string; description: string; signal?: string }>
}

export interface LocalPackData extends SectionBlockData {
  spots: Array<{ title: string; description: string; stat?: string }>
}

export interface AuditChecklistData extends SectionBlockData {
  groups: Array<{ title: string; items: string[] }>
}

export interface PlatformBadgesData extends SectionBlockData {
  platforms: Array<{ name: string; description: string }>
}

export interface ChannelMatrixData extends SectionBlockData {
  columns: string[]
  rows: Array<{ label: string; values: Array<string | boolean> }>
}

export interface BudgetFrameworkData extends SectionBlockData {
  tiers: Array<{ label: string; spend: string; focus: string }>
}

export interface ContentCalendarData extends SectionBlockData {
  weeks: Array<{ label: string; themes: string[] }>
}

export interface PlatformShowcaseData extends SectionBlockData {
  platforms: Array<{ id: string; label: string; highlights: string[] }>
}

export interface BeforeAfterData extends SectionBlockData {
  pairs: Array<{ label: string; before: string; after: string }>
}

export interface IdentityDeliverablesData extends SectionBlockData {
  items: Array<{ title: string; description: string; colSpan?: 1 | 2 }>
}

export interface TechStackData extends SectionBlockData {
  tools: Array<{ name: string; category: string; why: string }>
}

export interface PerformanceMetricsData extends SectionBlockData {
  metrics: Array<{ value: string; label: string; target: string }>
}

export interface LaunchChecklistData extends SectionBlockData {
  groups: Array<{ title: string; items: string[] }>
}

export interface EditorialPillarsData extends SectionBlockData {
  pillars: Array<{ title: string; description: string; examples: string[] }>
}

export interface DistributionMapData extends SectionBlockData {
  channels: Array<{ channel: string; format: string; cadence: string }>
}

export interface EventTimelineData extends SectionBlockData {
  phases: Array<{ step: string; title: string; description: string }>
}

export interface VenueShowcaseData extends SectionBlockData {
  venues: Array<{ title: string; description: string; capacity?: string }>
}

export interface ServicePageConfig {
  slug: string
  meta: ServiceData['meta']
  hero: ServiceData['hero']
  sections: ServiceSectionId[]
  problems?: ServiceData['problems']
  process?: ServiceData['process']
  rankingTimeline?: RankingTimelineData
  localPack?: LocalPackData
  auditChecklist?: AuditChecklistData
  platformBadges?: PlatformBadgesData
  channelMatrix?: ChannelMatrixData
  budgetFramework?: BudgetFrameworkData
  contentCalendar?: ContentCalendarData
  platformShowcase?: PlatformShowcaseData
  beforeAfter?: BeforeAfterData
  identityDeliverables?: IdentityDeliverablesData
  techStack?: TechStackData
  performanceMetrics?: PerformanceMetricsData
  launchChecklist?: LaunchChecklistData
  editorialPillars?: EditorialPillarsData
  distributionMap?: DistributionMapData
  eventTimeline?: EventTimelineData
  venueShowcase?: VenueShowcaseData
  features: ServiceData['features']
  caseStudy: ServiceData['caseStudy']
  faqs: ServiceData['faqs']
}
