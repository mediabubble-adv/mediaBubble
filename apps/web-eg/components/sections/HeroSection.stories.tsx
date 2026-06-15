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
  primary:   { label: 'Get your free strategy audit', href: '/contact' },
  secondary: { label: 'View case studies',            href: '/case-studies' },
}

const HERO_DESCRIPTION =
  'From strategy through execution, we help local businesses grow with campaigns you can measure. Based in Hurghada, serving Egypt and beyond since 2015.'

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Text-only, no image, default single-column layout */
export const Default: Story = {
  args: {
    layout: 'default',
    title: 'Grow Your Business 2–3× in 12 Months',
    subtitle: 'Proven Strategy + Expert Execution',
    description: HERO_DESCRIPTION,
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
      'From strategy through execution, we help local businesses grow with campaigns you can measure.',
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
      'From strategy through execution, we help local businesses grow with campaigns you can measure.',
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
      'MediaBubble is a marketing agency based in Hurghada, Egypt. Since 2015, we have helped 200+ brands grow through SEO, branding, web, and paid ads.',
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
    description: 'Tell us about your business. We will reply with a clear, actionable plan within one business day.',
    ctaButtons: {
      primary: { label: 'Get your free strategy audit', href: '/contact' },
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
      'Every strategy is built for your market, budget, and goals. No generic playbooks.',
    ctaButtons: CTA_BUTTONS,
    proofPoints: [
      { icon: '✓', text: 'No long-term lock-in contracts' },
      { icon: '✓', text: 'Dedicated account manager from day one' },
      { icon: '✓', text: 'Monthly performance reports with metrics that matter' },
      { icon: '✓', text: 'Cancel anytime, keep all deliverables' },
    ],
  },
}

/** Services page hero, no image, no proof points */
export const ServicesHero: Story = {
  args: {
    layout: 'default',
    title: 'Everything Your Business Needs to Grow Online',
    subtitle: 'What We Do',
    description:
      'From SEO to branding, paid ads to web development, we cover the channels that move revenue. One agency, full accountability.',
    ctaButtons: {
      primary:   { label: 'Get your free strategy audit', href: '/contact' },
      secondary: { label: 'Explore our services',         href: '#services' },
    },
  },
}
