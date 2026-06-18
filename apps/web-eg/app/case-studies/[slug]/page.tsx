import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAlternates, buildCaseStudyJsonLd, serializeJsonLd, resolveMarketSiteConfig } from '@mediabubble/shared/server'
import { CASE_STUDIES, getCaseStudyBySlug } from '@/lib/data/case-studies'
import { CaseStudyContent } from './content'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CASE_STUDIES.map(cs => ({ slug: cs.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return {}
  return {
    title:       cs.title,
    description: cs.desc,
    alternates:  getAlternates(`/case-studies/${slug}`, 'eg'),
    openGraph: {
      title:       `${cs.title} | MediaBubble`,
      description: cs.metric,
      url:         `/case-studies/${slug}`,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) notFound()

  const site = resolveMarketSiteConfig('eg')
  const jsonLd = buildCaseStudyJsonLd({
    slug: `/case-studies/${slug}`,
    title: cs.title,
    description: cs.desc,
    clientName: cs.client,
    imageUrl: cs.heroImage,
    duration: cs.duration,
    technologies: cs.technologies,
  }, site.siteUrl)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <CaseStudyContent cs={cs} />
    </>
  )
}
