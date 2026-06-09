import type { Metadata } from 'next'
import { LegalLayout } from '@/components/marketing/LegalLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How MediaBubble uses cookies and how you can control them.',
}

export default function CookiesPage() {
  return (
    <LegalLayout
      kicker="Legal"
      title="Cookie Policy"
      lastUpdated="1 June 2025"
      sections={[
        {
          heading: 'What are cookies?',
          body:    'Cookies are small text files placed on your device when you visit a website. They allow the site to remember information about your visit, which makes it easier to visit again and makes the site more useful to you.',
        },
        {
          heading: 'Cookies we use',
          body: [
            'Essential cookies: required for the website to function. These cannot be disabled.',
            'Analytics cookies (Google Analytics 4): help us understand how visitors use our site — which pages are popular, how long people stay, and where they come from. All data is anonymised.',
            'Preference cookies: remember your language preference so you do not need to re-select it on every visit.',
          ],
        },
        {
          heading: 'Google Analytics',
          body:    'We use Google Analytics 4 with IP anonymisation enabled. Google may transfer data to the United States under Standard Contractual Clauses. You can opt out of Google Analytics tracking at all websites using the Google Analytics Opt-out Browser Add-on at tools.google.com/dlpage/gaoptout.',
        },
        {
          heading: 'Managing cookies',
          body:    'You can control and delete cookies through your browser settings. Disabling analytics cookies will not prevent you from using our website, but we will have less information to help us improve it.',
        },
        {
          heading: 'Browser cookie controls',
          body: [
            'Chrome: Settings → Privacy and security → Cookies and other site data',
            'Firefox: Settings → Privacy & Security → Cookies and Site Data',
            'Safari: Preferences → Privacy → Manage Website Data',
            'Edge: Settings → Cookies and site permissions → Cookies and site data',
          ],
        },
        {
          heading: 'Changes to this policy',
          body:    'We may update this cookie policy as our use of cookies changes or as regulations require. The "last updated" date at the top of this page reflects the most recent revision.',
        },
      ]}
    />
  )
}
