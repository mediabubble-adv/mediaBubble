/**
 * Unit tests for HeroSection.
 *
 * Install dependencies before running:
 *   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
 *   npm install --save-dev jest-environment-jsdom ts-jest
 *
 * Or with Vitest:
 *   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
 *
 * Add to package.json:
 *   "scripts": { "test": "jest" }  // or "vitest"
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { HeroSection, type HeroSectionProps } from './HeroSection'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DEFAULT_PROPS: HeroSectionProps = {
  title: 'Grow Your Business',
  subtitle: 'Proven Strategy + Expert Execution',
  description: 'We help businesses grow through data-driven marketing.',
  ctaButtons: {
    primary:   { label: 'Get Free Audit',   href: '/contact' },
    secondary: { label: 'View Case Studies', href: '/portfolio' },
  },
}

function renderHero(overrides: Partial<HeroSectionProps> = {}) {
  return render(<HeroSection {...DEFAULT_PROPS} {...overrides} />)
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('HeroSection — rendering', () => {
  it('renders the title as an h1', () => {
    renderHero()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Grow Your Business')
  })

  it('renders the subtitle text', () => {
    renderHero()
    expect(screen.getByText('Proven Strategy + Expert Execution')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    renderHero()
    expect(screen.getByText('We help businesses grow through data-driven marketing.')).toBeInTheDocument()
  })

  it('renders the primary CTA button with correct label', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /Get Free Audit/i })).toBeInTheDocument()
  })

  it('primary CTA links to the correct href', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /Get Free Audit/i })).toHaveAttribute('href', '/contact')
  })

  it('renders the secondary CTA when provided', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /View Case Studies/i })).toBeInTheDocument()
  })

  it('secondary CTA links to the correct href', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /View Case Studies/i })).toHaveAttribute('href', '/portfolio')
  })

  it('does not render a secondary CTA when omitted', () => {
    renderHero({ ctaButtons: { primary: DEFAULT_PROPS.ctaButtons.primary } })
    expect(screen.queryByRole('link', { name: /View Case Studies/i })).not.toBeInTheDocument()
  })

  it('renders the section landmark', () => {
    renderHero()
    expect(screen.getByRole('region', { name: /hero/i })).toBeInTheDocument()
  })
})

// ─── Proof points ─────────────────────────────────────────────────────────────

describe('HeroSection — proof points', () => {
  const proofPoints = [
    { text: '35% average client growth' },
    { text: '92% client retention rate' },
    { text: '500+ projects delivered' },
  ]

  it('renders all proof points', () => {
    renderHero({ proofPoints })
    proofPoints.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('renders a list element for proof points', () => {
    renderHero({ proofPoints })
    expect(screen.getByRole('list', { name: /highlights/i })).toBeInTheDocument()
  })

  it('renders custom icon when provided', () => {
    renderHero({ proofPoints: [{ icon: '✓', text: 'Great results' }] })
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('does not render the proof list when proofPoints is empty', () => {
    renderHero({ proofPoints: [] })
    expect(screen.queryByRole('list', { name: /highlights/i })).not.toBeInTheDocument()
  })

  it('does not render the proof list when proofPoints is omitted', () => {
    renderHero({ proofPoints: undefined })
    expect(screen.queryByRole('list', { name: /highlights/i })).not.toBeInTheDocument()
  })
})

// ─── Stats ────────────────────────────────────────────────────────────────────

describe('HeroSection — stats', () => {
  const stats = [
    { number: '2015', label: 'Founded' },
    { number: '22+',  label: 'Team members' },
    { number: '200+', label: 'Clients served' },
  ]

  it('renders all stat numbers', () => {
    renderHero({ stats })
    stats.forEach(({ number }) => {
      expect(screen.getByText(number)).toBeInTheDocument()
    })
  })

  it('renders all stat labels', () => {
    renderHero({ stats })
    stats.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('does not render stats section when omitted', () => {
    renderHero({ stats: undefined })
    expect(screen.queryByText('Founded')).not.toBeInTheDocument()
  })
})

// ─── Image ────────────────────────────────────────────────────────────────────

describe('HeroSection — image', () => {
  it('renders an img element when image is provided', () => {
    renderHero({ image: '/hero.jpg', layout: 'image-right' })
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
  })

  it('img src matches the supplied path', () => {
    renderHero({ image: '/hero.jpg', layout: 'image-right' })
    expect(screen.getByRole('img', { hidden: true })).toHaveAttribute('src', '/hero.jpg')
  })

  it('does not render an img when image is omitted', () => {
    renderHero({ image: undefined })
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument()
  })
})

// ─── Layout variants ──────────────────────────────────────────────────────────

describe('HeroSection — layout variants', () => {
  it('renders default layout without throwing', () => {
    expect(() => renderHero({ layout: 'default' })).not.toThrow()
  })

  it('renders image-right layout without throwing', () => {
    expect(() => renderHero({ image: '/hero.jpg', layout: 'image-right' })).not.toThrow()
  })

  it('renders image-left layout without throwing', () => {
    expect(() => renderHero({ image: '/hero.jpg', layout: 'image-left' })).not.toThrow()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('HeroSection — accessibility', () => {
  it('CTA links are keyboard-focusable anchor elements', () => {
    renderHero()
    const primary = screen.getByRole('link', { name: /Get Free Audit/i })
    expect(primary.tagName).toBe('A')
  })

  it('image is aria-hidden (decorative)', () => {
    renderHero({ image: '/hero.jpg' })
    const img = screen.getByRole('img', { hidden: true })
    expect(img).toHaveAttribute('aria-hidden', 'true')
  })

  it('proof points list has an accessible label', () => {
    renderHero({ proofPoints: [{ text: 'Test point' }] })
    expect(screen.getByRole('list', { name: /highlights/i })).toBeInTheDocument()
  })

  it('section has an accessible label', () => {
    renderHero()
    expect(screen.getByRole('region', { name: /hero/i })).toBeInTheDocument()
  })
})

// ─── Responsive ───────────────────────────────────────────────────────────────

describe('HeroSection — responsive', () => {
  it('renders without overflow on narrow viewports', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 375 })
    expect(() => renderHero()).not.toThrow()
  })

  it('renders without overflow on wide viewports', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1440 })
    expect(() => renderHero({ image: '/hero.jpg', layout: 'image-right', stats: [{ number: '200+', label: 'Clients' }] })).not.toThrow()
  })
})
