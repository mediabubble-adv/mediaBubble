import { act, render, screen } from '@testing-library/react'
import { ConsentProvider } from '@mediabubble/shared/client'
import { CookieConsent } from './CookieConsent'

jest.mock('@/lib/i18n/provider', () => ({
  useI18n: () => ({
    t: (_key: string, fallback: string) => fallback,
  }),
}))

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('does not render after consent is already stored', () => {
    localStorage.setItem('mediabubble-cookie-consent', 'accepted')

    render(
      <ConsentProvider>
        <CookieConsent />
      </ConsentProvider>,
    )

    expect(screen.queryByRole('region', { name: 'Cookie consent' })).toBeNull()
  })

  it('shows the banner after the delay when consent is pending', () => {
    render(
      <ConsentProvider>
        <CookieConsent />
      </ConsentProvider>,
    )

    act(() => {
      jest.advanceTimersByTime(1500)
    })

    expect(screen.getByRole('region', { name: 'Cookie consent' })).toBeInTheDocument()
    expect(screen.getByText('We value your privacy')).toBeInTheDocument()
  })
})
