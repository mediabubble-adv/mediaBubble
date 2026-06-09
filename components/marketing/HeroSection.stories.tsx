/**
 * Storybook stories for HeroSection.
 *
 * Install Storybook (if not already):
 *   npx storybook@latest init
 *
 * Run with:
 *   npm run storybook
 */

import type { Meta, StoryObj } from '@storybook/react'
import { HeroSection } from './HeroSection'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Marketing/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reusable hero section for all marketing pages. ' +
          'Supports three layouts (default, image-left, image-right), ' +
          'optional proof points, optional stats, and two CTA buttons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['default', 'image-left', 'image-right'],
      description: 'Column layout when an image is supplied',
    },
    image: {
      control: 'text',
      description: 'Optional hero image URL',
    },
    backgroundImage: {
      control: 'text',
      description: 'Optional full-section background image URL',
    },
  },
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const PROOF_POINTS = [
  { text: '35% average client growth in 12 months' },
  { text: '92% client retention rate' },
  { text: '500+ successful projects delivered' },
]

const STATS = [
  { number: '2015', label: 'Founded' },
  { number: '22+',  label: 'Team members' },
  { number: '200+', label: 'Clients served' },
  { number: '92%',  label: 'Retention rate' },
]

const CTA_BUTTONS = {
  primary:   { label: 'Get Your Free Strategy Audit', href: '/contact' },
  secondary: { label: 'View Case Studies',            href: '/portfolio' },
}

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Text-only, no image — default single-column layout */
export const Default: Story = {
  args: {
    layout: 'default',
    title: 'Grow Your Business 2–3× in 12 Months',
    subtitle: 'Proven Strategy + Expert Execution',
    description:
      'From strategy to execution — we turn local businesses into market leaders using data-driven campaigns that deliver measurable ROI. Based in Hurghada, serving Egypt and beyond since 2015.',
    ctaButtons: CTA_BUTTONS,
    proofPoints: PROOF_POINTS,
    stats: STATS,
  },
}

/** Image on the right, text on the left */
export const ImageRight: Story = {
  args: {
    layout: 'image-right',
    title: 'Grow Your Business 2–3× in 12 Months',
    subtitle: 'Proven Strategy + Expert Execution',
    description:
      'From strategy to execution — we turn local businesses into market leaders using data-driven campaigns that deliver measurable ROI.',
    image: '/assets/Mockups/mockup-01.jpg',
    ctaButtons: CTA_BUTTONS,
    proofPoints: PROOF_POINTS,
  },
}

/** Image on the left, text on the right */
export const ImageLeft: Story = {
  args: {
    layout: 'image-left',
    title: 'Grow Your Business 2–3× in 12 Months',
    subtitle: 'Proven Strategy + Expert Execution',
    description:
      'From strategy to execution — we turn local businesses into market leaders using data-driven campaigns that deliver measurable ROI.',
    image: '/assets/Mockups/mockup-01.jpg',
    ctaButtons: CTA_BUTTONS,
    proofPoints: PROOF_POINTS,
  },
}

/** With stats bar below the CTAs */
export const WithStats: Story = {
  args: {
    layout: 'image-right',
    title: "Hurghada's #1 Marketing Agency",
    subtitle: 'Results You Can Measure',
    description:
      'MediaBubble is a full-service marketing agency based in Hurghada, Egypt. Since 2015, we\'ve helped 200+ brands grow through SEO, branding, web development, and paid advertising.',
    image: '/assets/Real-Photos/team-01.jpg',
    ctaButtons: CTA_BUTTONS,
    proofPoints: PROOF_POINTS,
    stats: STATS,
  },
}

/** Only a primary CTA, no secondary */
export const SingleCta: Story = {
  args: {
    layout: 'default',
    title: 'Ready to Grow?',
    subtitle: 'Free Strategy Audit',
    description: 'Tell us about your business. We\'ll come back with a clear, actionable plan within one business day.',
    ctaButtons: {
      primary: { label: 'Book a Free Consultation', href: '/contact' },
    },
  },
}

/** Custom icon proof points (emoji checkmarks) */
export const CustomProofIcons: Story = {
  args: {
    layout: 'default',
    title: 'Why Businesses Choose MediaBubble',
    subtitle: 'What Makes Us Different',
    description:
      'We\'re not a one-size-fits-all agency. Every strategy is custom-built for your market, budget, and goals.',
    ctaButtons: CTA_BUTTONS,
    proofPoints: [
      { icon: '✓', text: 'No long-term lock-in contracts' },
      { icon: '✓', text: 'Dedicated account manager from day one' },
      { icon: '✓', text: 'Monthly performance reports — no vanity metrics' },
      { icon: '✓', text: 'Cancel anytime, keep all deliverables' },
    ],
  },
}

/** Services page hero — no image, no proof points */
export const ServicesHero: Story = {
  args: {
    layout: 'default',
    title: 'Everything Your Business Needs to Grow Online',
    subtitle: 'What We Do',
    description:
      'From SEO to branding, paid ads to web development — we cover every channel that moves the needle. One agency, full accountability.',
    ctaButtons: {
      primary:   { label: 'Get Your Free Audit',  href: '/contact' },
      secondary: { label: 'See Our Services',      href: '#services' },
    },
  },
}
