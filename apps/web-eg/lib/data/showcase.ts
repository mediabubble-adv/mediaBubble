import { CASE_STUDIES } from '@/lib/data/case-studies'

const SHOWCASE_ORDER = [
  'coral-bay',
  'red-sea-divers',
  'aqua-sports',
  'desert-rose',
  'marina-view',
  'hurghada-rentals',
] as const

const TRANSLATION_BY_ID: Record<
  (typeof SHOWCASE_ORDER)[number],
  { tagKey: string; poeticTitleKey: string; descKey: string; metricKey: string }
> = {
  'coral-bay': {
    tagKey: 'showcase.project1.tag',
    poeticTitleKey: 'showcase.project1.poeticTitle',
    descKey: 'showcase.project1.description',
    metricKey: 'showcase.project1.metric',
  },
  'red-sea-divers': {
    tagKey: 'showcase.project2.tag',
    poeticTitleKey: 'showcase.project2.poeticTitle',
    descKey: 'showcase.project2.description',
    metricKey: 'showcase.project2.metric',
  },
  'aqua-sports': {
    tagKey: 'showcase.project3.tag',
    poeticTitleKey: 'showcase.project3.poeticTitle',
    descKey: 'showcase.project3.description',
    metricKey: 'showcase.project3.metric',
  },
  'desert-rose': {
    tagKey: 'showcase.project4.tag',
    poeticTitleKey: 'showcase.project4.poeticTitle',
    descKey: 'showcase.project4.description',
    metricKey: 'showcase.project4.metric',
  },
  'marina-view': {
    tagKey: 'showcase.project5.tag',
    poeticTitleKey: 'showcase.project5.poeticTitle',
    descKey: 'showcase.project5.description',
    metricKey: 'showcase.project5.metric',
  },
  'hurghada-rentals': {
    tagKey: 'showcase.project6.tag',
    poeticTitleKey: 'showcase.project6.poeticTitle',
    descKey: 'showcase.project6.description',
    metricKey: 'showcase.project6.metric',
  },
}

export const SHOWCASE_PROJECTS = SHOWCASE_ORDER.map(id => {
  const cs = CASE_STUDIES.find(s => s.id === id)!
  return {
    id: cs.id,
    accent: cs.accent,
    bg: cs.bg,
    image: cs.heroImage ?? '',
    imageAlt: cs.heroImageAlt ?? cs.client,
    tagFallback: cs.tag,
    poeticTitleFallback: cs.client,
    descFallback: cs.desc,
    metricFallback: cs.metric,
    ...TRANSLATION_BY_ID[id],
  }
})

export const SHOWCASE_PER_PAGE = 3
export const SHOWCASE_PAGE_COUNT = Math.ceil(SHOWCASE_PROJECTS.length / SHOWCASE_PER_PAGE)
