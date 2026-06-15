import { render, screen } from '@testing-library/react'
import { I18nLayoutWrapper } from './I18nLayoutWrapper'

jest.mock('@/lib/i18n/provider', () => ({
  I18nProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="i18n-provider">{children}</div>,
  useI18n: () => ({ t: (key: string, fallback: string) => fallback }),
}))

jest.mock('./CookieConsent', () => ({
  CookieConsent: () => <div data-testid="cookie-consent" />,
}))

jest.mock('./I18nErrorBoundary', () => ({
  I18nErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/components/shared/Phase1Provider', () => ({
  Phase1Provider: () => null,
}))

jest.mock('@/components/shared/Phase3Provider', () => ({
  Phase3Provider: () => null,
}))

describe('I18nLayoutWrapper', () => {
  it('renders children inside the i18n provider and mounts cookie consent', () => {
    render(
      <I18nLayoutWrapper>
        <main>Page content</main>
      </I18nLayoutWrapper>,
    )

    expect(screen.getByTestId('i18n-provider')).toBeInTheDocument()
    expect(screen.getByText('Page content')).toBeInTheDocument()
    expect(screen.getByTestId('cookie-consent')).toBeInTheDocument()
  })
})
