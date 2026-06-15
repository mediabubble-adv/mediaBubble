'use client'

import { useEffect, useRef } from 'react'
import { useConsentContext } from '../consent/ConsentContext'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function useGA() {
  const { hasAnalyticsConsent, ready } = useConsentContext()
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    const gaId = process.env['NEXT_PUBLIC_GA4_ID']
    if (!ready || !gaId || !hasAnalyticsConsent || scriptLoadedRef.current) return

    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    script.async = true
    document.head.appendChild(script)
    scriptLoadedRef.current = true

    script.onload = () => {
      window.dataLayer = window.dataLayer ?? []
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args)
      }
      window.gtag('js', new Date())
      window.gtag('config', gaId, {
        page_path: window.location.pathname,
        send_page_view: true,
        anonymize_ip: true,
      })
    }
  }, [ready, hasAnalyticsConsent])
}
