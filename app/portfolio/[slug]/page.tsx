import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CASE_STUDIES, getCaseStudyBySlug } from '@/lib/data/case-studies'
import { CaseStudyContent } from './content'

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
    openGraph: {
      title:       `${cs.title} | MediaBubble`,
      description: cs.metric,
      url:         `https://mediabubble.com/portfolio/${slug}`,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) notFound()
  return <CaseStudyContent cs={cs} />
}
