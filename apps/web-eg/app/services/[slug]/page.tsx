import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ISR_REVALIDATE_SECONDS } from '@mediabubble/shared/server'
import { getService, SERVICE_SLUGS } from '@/lib/services-data'
import { getRegistrySlugs, getServicePageConfig } from '@/lib/content/services'
import { ServicePageContent } from './content'

export const revalidate = ISR_REVALIDATE_SECONDS.services

interface Props {
  params: Promise<{ slug: string }>
}

function getAllServiceSlugs(): string[] {
  return Array.from(new Set([...SERVICE_SLUGS, ...getRegistrySlugs()]))
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const config = getServicePageConfig(slug)
  const service = getService(slug)
  if (!config && !service) return {}

  const meta = config?.meta ?? service!.meta
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/services/${slug}`,
      type: 'website',
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const config = getServicePageConfig(slug)
  const service = getService(slug)
  if (!config && !service) notFound()

  const faqs = config?.faqs ?? service!.faqs

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  const faqSchemaJson = JSON.stringify(faqSchema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />
      <ServicePageContent slug={slug} />
    </>
  )
}
