import type { Metadata } from 'next'
import { LegalLayout } from '@/components/marketing/LegalLayout'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions governing your use of MediaBubble services and this website.',
}

export default function TermsPage() {
  return (
    <LegalLayout
      kicker="Legal"
      title="Terms of Service"
      lastUpdated="1 June 2025"
      sections={[
        {
          heading: 'Acceptance of terms',
          body:    'By accessing this website or engaging MediaBubble for services, you agree to be bound by these terms. If you do not agree, please do not use our website or services.',
        },
        {
          heading: 'Services',
          body:    'MediaBubble provides marketing and advertising services including SEO, paid advertising, social media management, branding, web development, content marketing, and event activations. The specific scope, deliverables, fees, and timelines for any engagement are set out in a separate written agreement or proposal signed by both parties.',
        },
        {
          heading: 'Intellectual property',
          body:    'Upon receipt of full payment, MediaBubble assigns to the client all intellectual property rights in custom deliverables (such as logos, website code, and written content) created specifically for that client under the relevant agreement. MediaBubble retains ownership of its own tools, methodologies, templates, and pre-existing materials.',
        },
        {
          heading: 'Confidentiality',
          body:    'Both parties agree to keep confidential any non-public information disclosed during the course of the engagement. This obligation survives termination of the agreement.',
        },
        {
          heading: 'Payment',
          body:    'Fees are as agreed in the relevant proposal or agreement. Unless otherwise stated, invoices are payable within 14 days of issue. MediaBubble reserves the right to suspend services if invoices remain unpaid after 30 days.',
        },
        {
          heading: 'Limitation of liability',
          body:    'To the extent permitted by law, MediaBubble is not liable for indirect, incidental, or consequential losses. Our total liability for any claim arising from an engagement is limited to the fees paid by the client in the three months preceding the event giving rise to the claim.',
        },
        {
          heading: 'Website use',
          body: [
            'You may not use this website for any unlawful purpose.',
            'You may not attempt to gain unauthorised access to any part of the website or its underlying systems.',
            'Content on this website is for informational purposes only and does not constitute professional advice.',
          ],
        },
        {
          heading: 'Third-party links',
          body:    'Our website may contain links to third-party sites. We are not responsible for the content or practices of those sites.',
        },
        {
          heading: 'Governing law',
          body:    'These terms are governed by the laws of the Arab Republic of Egypt. Any disputes shall be subject to the exclusive jurisdiction of the courts of Hurghada, Red Sea Governorate.',
        },
        {
          heading: 'Changes to these terms',
          body:    'We may update these terms from time to time. The most current version is always published at this URL. Continued use of our website or services after changes are posted constitutes acceptance.',
        },
      ]}
    />
  )
}
