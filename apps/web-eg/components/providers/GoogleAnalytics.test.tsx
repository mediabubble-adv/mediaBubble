import { render, waitFor } from '@testing-library/react'
import { ConsentProvider } from '@mediabubble/shared/client'
import { GoogleAnalytics } from './GoogleAnalytics'

const GA_ID = 'G-TEST123456'
const CONSENT_KEY = 'mediabubble-cookie-consent'

function renderWithConsent(ui: React.ReactNode) {
  return render(<ConsentProvider>{ui}</ConsentProvider>)
}

describe('GoogleAnalytics', () => {
  const originalGaId = process.env.NEXT_PUBLIC_GA4_ID
  const appendedScripts: HTMLScriptElement[] = []

  beforeEach(() => {
    process.env.NEXT_PUBLIC_GA4_ID = GA_ID
    localStorage.clear()
    document.head.innerHTML = ''
    appendedScripts.length = 0
    jest.spyOn(console, 'error').mockImplementation(() => {})

    jest.spyOn(document.head, 'appendChild').mockImplementation((node) => {
      if (node instanceof HTMLScriptElement) {
        appendedScripts.push(node)
        node.onload?.(new Event('load'))
      }
      return node
    })
  })

  afterEach(() => {
    process.env.NEXT_PUBLIC_GA4_ID = originalGaId
    jest.restoreAllMocks()
  })

  it('does not inject gtag before consent is granted', () => {
    renderWithConsent(<GoogleAnalytics />)
    expect(appendedScripts.some((script) => script.src.includes('googletagmanager'))).toBe(false)
  })

  it('loads gtag after consent is stored', async () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')

    renderWithConsent(<GoogleAnalytics />)

    await waitFor(() => {
      expect(
        appendedScripts.some(
          (script) => script.src.includes('googletagmanager.com/gtag/js') && script.src.includes(GA_ID),
        ),
      ).toBe(true)
    })
  })

  it('loads gtag when cookieConsentGranted fires after accept', async () => {
    renderWithConsent(<GoogleAnalytics />)

    localStorage.setItem(CONSENT_KEY, 'accepted')
    window.dispatchEvent(new Event('cookieConsentGranted'))

    await waitFor(() => {
      expect(
        appendedScripts.some(
          (script) => script.src.includes('googletagmanager.com/gtag/js') && script.src.includes(GA_ID),
        ),
      ).toBe(true)
    })
  })
})
