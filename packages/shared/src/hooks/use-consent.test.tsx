import { act, renderHook, waitFor } from '@testing-library/react'
import { COOKIE_CONSENT_KEY } from '../consent/constants'
import { useConsent } from './use-consent'

describe('useConsent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts without a stored decision', async () => {
    const { result } = renderHook(() => useConsent())

    await waitFor(() => {
      expect(result.current.ready).toBe(true)
    })

    expect(result.current.status).toBeNull()
    expect(result.current.hasAnalyticsConsent).toBe(false)
  })

  it('reads an existing accepted decision', async () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')

    const { result } = renderHook(() => useConsent())

    await waitFor(() => {
      expect(result.current.status).toBe('accepted')
    })
    expect(result.current.hasAnalyticsConsent).toBe(true)
  })

  it('accept stores consent and dispatches the granted event', async () => {
    const handler = jest.fn()
    window.addEventListener('cookieConsentGranted', handler)

    const { result } = renderHook(() => useConsent())

    await waitFor(() => {
      expect(result.current.ready).toBe(true)
    })

    act(() => {
      result.current.accept()
    })

    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe('accepted')
    expect(result.current.status).toBe('accepted')
    expect(handler).toHaveBeenCalledTimes(1)

    window.removeEventListener('cookieConsentGranted', handler)
  })
})
