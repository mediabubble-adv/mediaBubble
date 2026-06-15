import { render, screen, fireEvent, act } from '@testing-library/react'
import { InsightsGrid } from './InsightsGrid'

jest.mock('@/lib/i18n/provider', () => ({
  useI18n: () => ({
    t: (_key: string, fallback: string) => fallback,
    dir: 'ltr',
  }),
}))

jest.mock('@mediabubble/shared/client', () => {
  const actual = jest.requireActual('@mediabubble/shared/client')
  return {
    ...actual,
    useExperiment: () => 'default',
    trackInsightsSearch: jest.fn(),
  }
})

describe('InsightsGrid', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('renders featured and standard posts', () => {
    render(<InsightsGrid />)
    expect(screen.getByText('Featured')).toBeInTheDocument()
    expect(screen.getByText('SEO for Hurghada Tourism Businesses: The 2025 Playbook')).toBeInTheDocument()
  })

  it('filters posts by category', () => {
    render(<InsightsGrid />)
    fireEvent.click(screen.getByRole('button', { name: 'Branding' }))
    expect(screen.queryByText('SEO for Hurghada Tourism Businesses: The 2025 Playbook')).not.toBeInTheDocument()
    expect(screen.getByText('Branding on a Budget: How Small Egyptian Businesses Can Look Premium')).toBeInTheDocument()
  })

  it('filters posts by search query locally', () => {
    render(<InsightsGrid />)
    fireEvent.change(screen.getByPlaceholderText('Search articles…'), {
      target: { value: 'Google Ads' },
    })
    expect(screen.getByText('Why Most Google Ads Campaigns for Red Sea Hotels Waste Budget')).toBeInTheDocument()
    expect(screen.queryByText('Branding on a Budget: How Small Egyptian Businesses Can Look Premium')).not.toBeInTheDocument()
  })

  it('requests blog search API after debounced input', () => {
    jest.useFakeTimers()

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ posts: [], total: 0 }),
    })

    globalThis.fetch = fetchMock as typeof fetch

    render(<InsightsGrid />)
    fireEvent.change(screen.getByPlaceholderText('Search articles…'), {
      target: { value: 'structured data' },
    })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/insights/search?q=structured+data'),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    )

    jest.useRealTimers()
  })
})
