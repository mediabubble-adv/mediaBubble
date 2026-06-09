import type { Metadata } from 'next'
import { LegalLayout } from '@/components/marketing/LegalLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MediaBubble collects, uses, and protects your personal data.',
}

export default function PrivacyPage() {
  return (
    <LegalLayout
      kicker="Legal"
      title="Privacy Policy"
      lastUpdated="1 June 2025"
      sections={[
        {
          heading: 'Who we are',
          body:    'MediaBubble is a marketing and advertising agency based in Hurghada, Red Sea Governorate, Egypt. When this policy refers to "we", "us", or "our", it means MediaBubble. Our primary contact email is hello@mediabubble.com.',
        },
        {
          heading: 'What data we collect',
          body: [
            'Contact information you provide (name, email address, phone number) when you submit our contact form or enquire about our services.',
            'Usage data automatically collected when you visit our website — pages viewed, time on site, referring URL, browser type, and device type — via Google Analytics 4.',
            'Communication records when you email or message us directly.',
          ],
        },
        {
          heading: 'How we use your data',
          body: [
            'To respond to enquiries and provide the services you have requested.',
            'To send you marketing communications if you have opted in — you can unsubscribe at any time.',
            'To improve our website and understand how visitors use it.',
            'To comply with legal obligations.',
          ],
        },
        {
          heading: 'Legal basis for processing',
          body:    'We process your personal data on the basis of (a) your consent, where you have given it; (b) our legitimate interests in operating and improving our business; and (c) compliance with legal obligations. You may withdraw consent at any time by contacting us.',
        },
        {
          heading: 'Data sharing',
          body:    'We do not sell your personal data. We share data only with trusted service providers who help us operate our business (such as Google Analytics, our email platform, and our CRM), and only to the extent necessary. All processors are bound by data processing agreements.',
        },
        {
          heading: 'Data retention',
          body:    'We retain contact enquiry data for 3 years from the date of last contact. Analytics data is retained for 14 months. You may request deletion of your data at any time.',
        },
        {
          heading: 'Your rights',
          body: [
            'Access: request a copy of the personal data we hold about you.',
            'Rectification: ask us to correct inaccurate data.',
            'Erasure: request deletion of your data.',
            'Objection: object to processing based on legitimate interests.',
            'Portability: receive your data in a structured, machine-readable format.',
          ],
        },
        {
          heading: 'Cookies',
          body:    'We use cookies for analytics and to remember your preferences. You can manage cookie settings via our Cookie Policy page or your browser settings.',
        },
        {
          heading: 'Changes to this policy',
          body:    'We may update this policy from time to time. The "last updated" date at the top of this page reflects the most recent revision. Continued use of our website after changes are posted constitutes acceptance of the updated policy.',
        },
      ]}
    />
  )
}
