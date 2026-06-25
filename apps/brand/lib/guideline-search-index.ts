import { colorFamilies, neutralScale, sections } from '@/components/constants'

export type GuidelineSearchKind = 'logo' | 'color' | 'font' | 'component' | 'icon' | 'asset' | 'digital' | 'page'

export interface GuidelineSearchItem {
  id: string
  label: string
  context: string
  section: string
  anchor?: string
  keywords: string[]
  kind: GuidelineSearchKind
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const LOGO_FILES: GuidelineSearchItem[] = [
  {
    id: 'logo-vertical-full-color',
    label: 'mediaBubble_logo_vertical_full_color.svg',
    context: 'Logo · Canonical',
    section: 'logo',
    anchor: 'logo-primary-mark',
    keywords: ['logo', 'vertical', 'full color', 'mark', 'mediaBubble_logo_vertical_full_color', 'canonical'],
    kind: 'logo',
  },
  {
    id: 'logo-horizontal-full-color',
    label: 'mediaBubble_logo_horizontal_full_color.svg',
    context: 'Logo · Canonical',
    section: 'logo',
    anchor: 'logo-primary-mark',
    keywords: ['logo', 'horizontal', 'full color', 'wordmark', 'mediaBubble_logo_horizontal_full_color', 'canonical'],
    kind: 'logo',
  },
  {
    id: 'logo-horizontal-text-white',
    label: 'mediaBubble_logo_horizontal_text_white.svg',
    context: 'Logo · Canonical',
    section: 'logo',
    keywords: ['logo', 'horizontal', 'white', 'text white', 'dark background', 'mediaBubble_logo_horizontal_text_white', 'canonical'],
    kind: 'logo',
  },
  {
    id: 'logo-horizontal-white',
    label: 'mediaBubble_logo_horizontal_white.svg',
    context: 'Logo · Reference',
    section: 'logo',
    keywords: ['logo', 'horizontal', 'white', 'mediaBubble_logo_horizontal_white', 'reference'],
    kind: 'logo',
  },
  {
    id: 'logo-horizontal-black',
    label: 'mediaBubble_logo_horizontal_black.svg',
    context: 'Logo · Reference',
    section: 'logo',
    keywords: ['logo', 'horizontal', 'black', 'mediaBubble_logo_horizontal_black', 'reference'],
    kind: 'logo',
  },
  {
    id: 'logo-vertical-white',
    label: 'mediaBubble_logo_vertical_white.svg',
    context: 'Logo · Reference',
    section: 'logo',
    keywords: ['logo', 'vertical', 'white', 'mediaBubble_logo_vertical_white', 'reference'],
    kind: 'logo',
  },
  {
    id: 'logo-vertical-black',
    label: 'mediaBubble_logo_vertical_black.svg',
    context: 'Logo · Reference',
    section: 'logo',
    keywords: ['logo', 'vertical', 'black', 'mediaBubble_logo_vertical_black', 'reference'],
    kind: 'logo',
  },
  {
    id: 'logo-icon',
    label: 'logo.svg',
    context: 'Logo · Reference',
    section: 'logo',
    keywords: ['logo', 'icon', 'symbol', 'app icon', 'logo.svg', 'reference'],
    kind: 'logo',
  },
  {
    id: 'logo-icon-outline',
    label: 'logo-outline.svg',
    context: 'Logo · Reference',
    section: 'logo',
    keywords: ['logo', 'icon', 'outline', 'logo-outline.svg', 'reference'],
    kind: 'logo',
  },
  {
    id: 'logo-social-profile',
    label: 'Social Profile Logo',
    context: 'Logo',
    section: 'digital',
    anchor: 'digital-avatars',
    keywords: ['logo', 'social', 'profile', 'avatar', 'mediaBubble_social_profile'],
    kind: 'logo',
  },
  {
    id: 'logo-favicon',
    label: 'favicon.ico',
    context: 'Digital Assets · Canonical',
    section: 'digital',
    anchor: 'digital-favicon',
    keywords: ['logo', 'favicon', 'browser tab', 'favicon.ico', 'canonical'],
    kind: 'logo',
  },
]

const LOGO_BACKGROUNDS: GuidelineSearchItem[] = [
  { id: 'logo-bg-full-color', label: 'mediaBubble_logo_horizontal_full_color.svg on white', context: 'Logo · Background · Canonical', section: 'logo', anchor: 'logo-bg-white', keywords: ['logo', 'white', 'full color', 'canonical'], kind: 'logo' },
  { id: 'logo-bg-white-on-dark', label: 'mediaBubble_logo_horizontal_text_white.svg on deep blue', context: 'Logo · Background · Canonical', section: 'logo', anchor: 'logo-bg-deep-blue', keywords: ['logo', 'white', 'dark', 'blue', 'canonical'], kind: 'logo' },
  { id: 'logo-bg-canvas', label: 'mediaBubble_logo_vertical_full_color.svg on canvas', context: 'Logo · Background · Canonical', section: 'logo', anchor: 'logo-bg-canvas', keywords: ['logo', 'canvas', '#FAFAFA', 'canonical'], kind: 'logo' },
  { id: 'logo-bg-yellow', label: 'logo reference on brand yellow', context: 'Logo · Background · Reference', section: 'logo', anchor: 'logo-bg-yellow', keywords: ['logo', 'yellow', '#FFC107', 'reference'], kind: 'logo' },
  { id: 'logo-bg-charcoal', label: 'white logo on charcoal', context: 'Logo · Background · Canonical', section: 'logo', anchor: 'logo-bg-charcoal', keywords: ['logo', 'charcoal', 'dark', '#333', 'canonical'], kind: 'logo' },
  { id: 'logo-bg-blue-tint', label: 'logo reference on light blue tint', context: 'Logo · Background · Reference', section: 'logo', anchor: 'logo-bg-blue-tint', keywords: ['logo', 'blue tint', '#E3F2FD', 'reference'], kind: 'logo' },
]

function buildColorItems(): GuidelineSearchItem[] {
  const families = colorFamilies.map((family) => ({
    id: `color-${slugify(family.name)}`,
    label: family.name,
    context: 'Color Palette',
    section: 'colors',
    anchor: `color-${slugify(family.name)}`,
    keywords: [
      family.name,
      family.hex,
      family.cssVar,
      family.role,
      'palette',
      'color',
      'colours',
      'colour',
      ...family.tones,
      ...(family.name.includes('Yellow') ? ['yellow', 'gold', 'accent', 'cta'] : []),
      ...(family.name.includes('Blue') && !family.name.includes('Dark') ? ['blue', 'primary', 'link'] : []),
      ...(family.name.includes('Dark Blue') ? ['navy', 'dark blue', 'heading'] : []),
      ...(family.name.includes('Mint') ? ['mint', 'green', 'success'] : []),
      ...(family.name.includes('Charcoal') ? ['charcoal', 'dark', 'sidebar'] : []),
    ],
    kind: 'color' as const,
  }))

  const neutrals = neutralScale.map((color) => ({
    id: `neutral-${slugify(color.name)}`,
    label: color.name,
    context: 'Color Palette · Neutral',
    section: 'colors',
    anchor: `neutral-${slugify(color.name)}`,
    keywords: [color.name, color.hex, color.note, 'neutral', 'grey', 'gray'],
    kind: 'color' as const,
  }))

  return [...families, ...neutrals]
}

const FONT_ITEMS: GuidelineSearchItem[] = [
  {
    id: 'font-poppins',
    label: 'Poppins',
    context: 'Typography · Display',
    section: 'typography',
    anchor: 'font-poppins',
    keywords: ['font', 'fonts', 'poppins', 'display', 'headline', 'heading', 'typeface'],
    kind: 'font',
  },
  {
    id: 'font-inter',
    label: 'Inter',
    context: 'Typography · Body',
    section: 'typography',
    anchor: 'font-inter',
    keywords: ['font', 'fonts', 'inter', 'body', 'ui', 'paragraph', 'typeface'],
    kind: 'font',
  },
  {
    id: 'font-jetbrains-mono',
    label: 'JetBrains Mono',
    context: 'Typography · Code',
    section: 'typography',
    anchor: 'font-jetbrains-mono',
    keywords: ['font', 'fonts', 'jetbrains', 'mono', 'monospace', 'code', 'metadata'],
    kind: 'font',
  },
  {
    id: 'font-cairo',
    label: 'Cairo',
    context: 'Typography · Arabic',
    section: 'typography',
    anchor: 'font-cairo',
    keywords: ['font', 'fonts', 'cairo', 'arabic', 'rtl', 'bilingual', 'typeface'],
    kind: 'font',
  },
  ...['Display', 'H1', 'H2', 'H3', 'Body', 'Small', 'Mono'].map((token) => ({
    id: `type-scale-${token.toLowerCase()}`,
    label: `${token} Type Scale`,
    context: 'Typography · Scale',
    section: 'typography',
    anchor: 'typography-scale',
    keywords: ['type', 'scale', 'token', token.toLowerCase(), 'size', 'font'],
    kind: 'font' as const,
  })),
]

const COMPONENT_ITEMS: GuidelineSearchItem[] = [
  { id: 'btn-primary-cta', label: 'Primary CTA Button', context: 'Components · Canonical · Button', section: 'components', anchor: 'component-button-primary', keywords: ['button', 'primary', 'cta', 'yellow', 'submit', 'canonical'], kind: 'component' },
  { id: 'btn-secondary', label: 'Secondary Button', context: 'Components · Canonical · Button', section: 'components', anchor: 'component-button-secondary', keywords: ['button', 'secondary', 'blue', 'canonical'], kind: 'component' },
  { id: 'btn-outline', label: 'Outline Button', context: 'Components · Canonical · Button', section: 'components', anchor: 'component-button-outline', keywords: ['button', 'outline', 'border', 'canonical'], kind: 'component' },
  { id: 'btn-ghost', label: 'Ghost Button', context: 'Components · Canonical · Button', section: 'components', anchor: 'component-button-ghost', keywords: ['button', 'ghost', 'tertiary', 'canonical'], kind: 'component' },
  { id: 'btn-destructive', label: 'Destructive Button', context: 'Components · Canonical · Button', section: 'components', anchor: 'component-button-destructive', keywords: ['button', 'destructive', 'delete', 'danger', 'red', 'canonical'], kind: 'component' },
  { id: 'btn-disabled', label: 'Disabled Button', context: 'Components · Canonical · Button', section: 'components', anchor: 'component-button-disabled', keywords: ['button', 'disabled', 'inactive', 'canonical'], kind: 'component' },
  { id: 'card-default', label: 'Default Card', context: 'Components · Canonical · Card', section: 'components', keywords: ['card', 'default', 'surface', 'canonical'], kind: 'component' },
  { id: 'card-hover', label: 'Hover Card', context: 'Components · Canonical · Card', section: 'components', keywords: ['card', 'hover', 'interactive', 'canonical'], kind: 'component' },
  { id: 'card-accent', label: 'Accent Card', context: 'Components · Canonical · Card', section: 'components', keywords: ['card', 'accent', 'yellow', 'highlight', 'canonical'], kind: 'component' },
  { id: 'card-dark', label: 'Dark Card', context: 'Components · Canonical · Card', section: 'components', keywords: ['card', 'dark', 'inverse', 'hero', 'canonical'], kind: 'component' },
  { id: 'component-ui-shell', label: 'UI Dashboard Shell', context: 'Components · Canonical · Layout', section: 'components', anchor: 'component-ui-shell', keywords: ['layout', 'shell', 'dashboard', 'sidebar', 'canonical'], kind: 'component' },
  { id: 'component-header-nav', label: 'Header & Nav Menu', context: 'Components · Canonical · Layout', section: 'components', anchor: 'component-header-nav', keywords: ['header', 'nav', 'navigation', 'menu', 'navbar', 'canonical'], kind: 'component' },
  { id: 'component-footer', label: 'Footer Layout', context: 'Components · Canonical · Layout', section: 'components', anchor: 'component-footer', keywords: ['footer', 'layout', 'canonical'], kind: 'component' },
  { id: 'component-pagination', label: 'Pagination Control', context: 'Components · Canonical · Layout', section: 'components', anchor: 'component-pagination', keywords: ['pagination', 'pager', 'pages', 'canonical'], kind: 'component' },
  { id: 'component-pagination-button-height', label: 'Pagination Button Height Rule', context: 'Components · Canonical · Layout Rule', section: 'components', anchor: 'component-pagination-button-height', keywords: ['pagination', 'button height', '32px', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-pagination-active-state', label: 'Pagination Active State Rule', context: 'Components · Canonical · Layout Rule', section: 'components', anchor: 'component-pagination-active-state', keywords: ['pagination', 'active state', 'yellow', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-pagination-gap-spacing', label: 'Pagination Gap Spacing Rule', context: 'Components · Canonical · Layout Rule', section: 'components', anchor: 'component-pagination-gap-spacing', keywords: ['pagination', 'gap spacing', '6px', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-nav-tabs', label: 'Navigation Tabs', context: 'Components · Canonical · Navigation', section: 'components', anchor: 'component-nav-tabs', keywords: ['tabs', 'navigation', 'underline', 'pill', 'segmented', 'canonical'], kind: 'component' },
  { id: 'component-form-inputs', label: 'Form Inputs', context: 'Components · Canonical · Form', section: 'components', anchor: 'component-form-inputs', keywords: ['form', 'input', 'text field', 'textarea', 'select', 'canonical'], kind: 'component' },
  { id: 'component-date-picker', label: 'Date Picker', context: 'Components · Canonical · Form', section: 'components', anchor: 'component-date-picker', keywords: ['date', 'calendar', 'picker', 'range', 'canonical'], kind: 'component' },
  { id: 'component-date-picker-selected-day-highlight', label: 'Date Picker Selected Day Highlight Rule', context: 'Components · Canonical · Form Rule', section: 'components', anchor: 'component-date-picker-selected-day-highlight', keywords: ['date picker', 'selected day', 'highlight', 'yellow', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-date-picker-active-range-fill', label: 'Date Picker Active Range Fill Rule', context: 'Components · Canonical · Form Rule', section: 'components', anchor: 'component-date-picker-active-range-fill', keywords: ['date picker', 'range fill', 'opacity', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-date-picker-trigger-input-icon', label: 'Date Picker Trigger Input Icon Rule', context: 'Components · Canonical · Form Rule', section: 'components', anchor: 'component-date-picker-trigger-input-icon', keywords: ['date picker', 'trigger input', 'calendar icon', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-data-table', label: 'Data Table', context: 'Components · Canonical · Display', section: 'components', anchor: 'component-data-table', keywords: ['table', 'data', 'grid', 'rows', 'canonical'], kind: 'component' },
  { id: 'component-progress-bar', label: 'Progress Bar', context: 'Components · Canonical · Display', section: 'components', anchor: 'component-progress-bar', keywords: ['progress', 'bar', 'loading', 'canonical'], kind: 'component' },
  { id: 'component-progress-bar-height', label: 'Progress Bar Height Rule', context: 'Components · Canonical · Display Rule', section: 'components', anchor: 'component-progress-bar-height', keywords: ['progress bar', 'height', '8px', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-progress-bar-inner-shadow', label: 'Progress Bar Inner Shadow Rule', context: 'Components · Canonical · Display Rule', section: 'components', anchor: 'component-progress-bar-inner-shadow', keywords: ['progress bar', 'inner shadow', 'track', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-progress-bar-color-system', label: 'Progress Bar Color System Rule', context: 'Components · Canonical · Display Rule', section: 'components', anchor: 'component-progress-bar-color-system', keywords: ['progress bar', 'color system', 'blue', 'yellow', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-badges', label: 'Badges & Tags', context: 'Components · Canonical · Display', section: 'components', anchor: 'component-badges', keywords: ['badge', 'tag', 'chip', 'label', 'canonical'], kind: 'component' },
  { id: 'component-tooltip', label: 'Tooltip', context: 'Components · Canonical · Feedback', section: 'components', anchor: 'component-tooltip', keywords: ['tooltip', 'hint', 'hover', 'canonical'], kind: 'component' },
  { id: 'component-toggletip', label: 'Toggletip', context: 'Components · Canonical · Feedback', section: 'components', anchor: 'component-toggletip', keywords: ['toggletip', 'popover', 'click', 'canonical'], kind: 'component' },
  { id: 'component-tooltip-trigger', label: 'Tooltip Trigger Rule', context: 'Components · Canonical · Feedback Rule', section: 'components', anchor: 'component-tooltip-trigger', keywords: ['tooltip', 'trigger', 'hover', 'focus', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-tooltip-max-size', label: 'Tooltip Maximum Size Rule', context: 'Components · Canonical · Feedback Rule', section: 'components', anchor: 'component-tooltip-max-size', keywords: ['tooltip', 'maximum size', 'whitespace-nowrap', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-tooltip-border-outline', label: 'Tooltip Border Outline Rule', context: 'Components · Canonical · Feedback Rule', section: 'components', anchor: 'component-tooltip-border-outline', keywords: ['tooltip', 'border outline', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-toggletip-trigger', label: 'Toggletip Trigger Rule', context: 'Components · Canonical · Feedback Rule', section: 'components', anchor: 'component-toggletip-trigger', keywords: ['toggletip', 'trigger', 'click', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-toggletip-accessibility', label: 'Toggletip Accessibility Rule', context: 'Components · Canonical · Feedback Rule', section: 'components', anchor: 'component-toggletip-accessibility', keywords: ['toggletip', 'accessibility', 'aria', 'button', 'rule', 'canonical'], kind: 'component' },
  { id: 'component-toggletip-z-index', label: 'Toggletip Z-Index Rule', context: 'Components · Canonical · Feedback Rule', section: 'components', anchor: 'component-toggletip-z-index', keywords: ['toggletip', 'z-index', 'dropdown', 'rule', 'canonical'], kind: 'component' },
]

const RULE_ITEMS: GuidelineSearchItem[] = [
  { id: 'rule-brand-register', label: 'Brand & Website Voice Register', context: 'Rules · Canonical', section: 'voice', anchor: 'voice-registers', keywords: ['voice', 'tone', 'brand register', 'website voice', 'canonical'], kind: 'page' },
  { id: 'rule-seo-register', label: 'Content & SEO Voice Register', context: 'Rules · Canonical', section: 'voice', anchor: 'voice-registers', keywords: ['voice', 'tone', 'seo register', 'content voice', 'canonical'], kind: 'page' },
  { id: 'rule-cta-standards', label: 'Call-to-Action Standards', context: 'Rules · Canonical', section: 'voice', anchor: 'voice-cta-standards', keywords: ['cta', 'call to action', 'rules', 'canonical'], kind: 'page' },
  { id: 'rule-prohibited-phrases', label: 'Prohibited Phrases', context: 'Rules · Canonical', section: 'voice', anchor: 'voice-prohibited-phrases', keywords: ['prohibited', 'phrases', 'slop', 'copywriting', 'canonical'], kind: 'page' },
  { id: 'rule-bilingual-sandbox', label: 'Bilingual Tone Sandbox', context: 'Rules · Reference', section: 'voice', anchor: 'voice-sandbox', keywords: ['sandbox', 'translation', 'masri', 'khaliji', 'reference'], kind: 'page' },
]

const PATTERN_ITEMS: GuidelineSearchItem[] = [
  { id: 'pattern-spacing-grid', label: 'Spacing & Grid', context: 'Pattern · Canonical', section: 'spacing', keywords: ['pattern', 'spacing', 'grid', 'canonical'], kind: 'page' },
  { id: 'pattern-applications-hub', label: 'Application Hub', context: 'Pattern · Reference', section: 'real-world-examples', keywords: ['pattern', 'applications', 'application hub', 'examples', 'reference'], kind: 'page' },
  { id: 'pattern-email-applications', label: 'Email Applications', context: 'Pattern · Reference', section: 'pattern-email', keywords: ['pattern', 'email', 'signature', 'reference'], kind: 'page' },
  { id: 'pattern-email-signature', label: 'Email Signature Application', context: 'Pattern · Reference', section: 'pattern-email', anchor: 'pattern-email-signature', keywords: ['pattern', 'email', 'signature', 'application', 'reference'], kind: 'page' },
  { id: 'pattern-email-rules', label: 'Email Application Rules', context: 'Pattern · Canonical', section: 'pattern-email', anchor: 'pattern-email-rules', keywords: ['pattern', 'email', 'rules', 'tokens', 'canonical'], kind: 'page' },
  { id: 'pattern-social-applications', label: 'Social Applications', context: 'Pattern · Reference', section: 'pattern-social', keywords: ['pattern', 'social', 'avatar', 'post', 'reference'], kind: 'page' },
  { id: 'pattern-social-template', label: 'Social Template Application', context: 'Pattern · Reference', section: 'pattern-social', anchor: 'pattern-social-template', keywords: ['pattern', 'social', 'template', 'application', 'reference'], kind: 'page' },
  { id: 'pattern-social-checks', label: 'Social Application Checks', context: 'Pattern · Canonical', section: 'pattern-social', anchor: 'pattern-social-checks', keywords: ['pattern', 'social', 'checks', 'canonical'], kind: 'page' },
  { id: 'pattern-deck-applications', label: 'Deck Applications', context: 'Pattern · Reference', section: 'pattern-decks', keywords: ['pattern', 'deck', 'slides', 'presentation', 'reference'], kind: 'page' },
  { id: 'pattern-deck-presentation', label: 'Presentation Application', context: 'Pattern · Reference', section: 'pattern-decks', anchor: 'pattern-deck-presentation', keywords: ['pattern', 'deck', 'presentation', 'application', 'reference'], kind: 'page' },
  { id: 'pattern-deck-checks', label: 'Deck Application Checks', context: 'Pattern · Canonical', section: 'pattern-decks', anchor: 'pattern-deck-checks', keywords: ['pattern', 'deck', 'checks', 'canonical'], kind: 'page' },
]

const ICON_NAMES = [
  'Home', 'Search', 'Menu', 'ChevronRight', 'ArrowRight', 'Settings',
  'Plus', 'Edit', 'Trash', 'Download', 'Copy', 'Send',
  'Check', 'X', 'Alert', 'Bell', 'Star', 'Heart',
  'User', 'Mail', 'Bookmark', 'Package', 'Filter', 'Layers',
  'TrendingUp', 'BarChart2', 'PieChart', 'Activity', 'Award', 'Zap',
] as const

const ICON_ITEMS: GuidelineSearchItem[] = ICON_NAMES.map((name) => ({
  id: `icon-${name.toLowerCase()}`,
  label: `${name} Icon`,
  context: 'Iconography · Lucide',
  section: 'iconography',
  anchor: `icon-${name.toLowerCase()}`,
  keywords: ['icon', 'icons', 'lucide', name.toLowerCase(), name],
  kind: 'icon',
}))

const DIGITAL_ITEMS: GuidelineSearchItem[] = [
  { id: 'digital-email-signature', label: 'Email Signature Template', context: 'Digital Assets · Canonical', section: 'digital', anchor: 'guideline-digital-email-signature', keywords: ['email', 'signature', 'html', 'template', 'canonical'], kind: 'digital' },
  { id: 'digital-favicon-16', label: 'favicon.ico · 16px', context: 'Digital Assets · Favicon', section: 'digital', anchor: 'digital-favicon', keywords: ['favicon', '16', 'browser tab', 'ico'], kind: 'digital' },
  { id: 'digital-favicon-180', label: 'apple-touch-icon.png · 180px', context: 'Digital Assets · Favicon', section: 'digital', anchor: 'digital-favicon', keywords: ['apple', 'ios', '180', 'home screen', 'png'], kind: 'digital' },
  { id: 'digital-avatar-linkedin', label: 'LinkedIn Avatar Spec', context: 'Digital Assets · Reference', section: 'digital', anchor: 'guideline-digital-avatars', keywords: ['linkedin', 'avatar', 'profile', '400x400', 'reference'], kind: 'digital' },
  { id: 'digital-avatar-instagram', label: 'Instagram Avatar Spec', context: 'Digital Assets · Reference', section: 'digital', anchor: 'guideline-digital-avatars', keywords: ['instagram', 'avatar', 'profile', 'reference'], kind: 'digital' },
]

const COLLATERAL_ITEMS: GuidelineSearchItem[] = [
  { id: 'collateral-business-card', label: 'Business Card', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-business-card', keywords: ['collateral', 'business card', 'print', 'reference'], kind: 'asset' },
  { id: 'collateral-business-card-front', label: 'Business Card Front', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-business-card-front-spec', keywords: ['collateral', 'business card', 'front', 'print', 'reference'], kind: 'asset' },
  { id: 'collateral-business-card-back', label: 'Business Card Back', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-business-card-back-spec', keywords: ['collateral', 'business card', 'back', 'contact', 'reference'], kind: 'asset' },
  { id: 'collateral-business-card-paper', label: 'Business Card Paper & Finish', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-business-card-paper-finish', keywords: ['collateral', 'business card', 'paper', 'finish', 'reference'], kind: 'asset' },
  { id: 'collateral-envelope', label: 'Business Envelope', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-envelope', keywords: ['collateral', 'envelope', 'dl', 'print', 'reference'], kind: 'asset' },
  { id: 'collateral-envelope-flap', label: 'Envelope Flap Design', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-envelope-flap-design', keywords: ['collateral', 'envelope', 'flap', 'reference'], kind: 'asset' },
  { id: 'collateral-envelope-accent-strip', label: 'Envelope Accent Strip', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-envelope-accent-strip', keywords: ['collateral', 'envelope', 'accent strip', 'reference'], kind: 'asset' },
  { id: 'collateral-envelope-return-address', label: 'Envelope Return Address', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-envelope-return-address', keywords: ['collateral', 'envelope', 'return address', 'reference'], kind: 'asset' },
  { id: 'collateral-letterhead', label: 'Company Letterhead', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-letterhead', keywords: ['collateral', 'letterhead', 'a4', 'print', 'reference'], kind: 'asset' },
  { id: 'collateral-letterhead-header', label: 'Letterhead Header Band', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-letterhead-header-band', keywords: ['collateral', 'letterhead', 'header', 'band', 'reference'], kind: 'asset' },
  { id: 'collateral-letterhead-body-margins', label: 'Letterhead Body Margins', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-letterhead-body-margins', keywords: ['collateral', 'letterhead', 'body margins', 'reference'], kind: 'asset' },
  { id: 'collateral-letterhead-footer', label: 'Letterhead Footer Band', context: 'Collateral · Reference', section: 'collateral', anchor: 'collateral-letterhead-footer-band', keywords: ['collateral', 'letterhead', 'footer', 'band', 'reference'], kind: 'asset' },
]

const ASSET_FILE_ITEMS: GuidelineSearchItem[] = [
  { id: 'asset-logo-svg', label: 'logo.svg', context: 'Asset Library · Download', section: 'assets', anchor: 'asset-logo-files', keywords: ['logo', 'svg', 'download', 'vector'], kind: 'asset' },
  { id: 'asset-favicon-ico', label: 'favicon.ico', context: 'Asset Library · Download', section: 'assets', anchor: 'asset-logo-files', keywords: ['favicon', 'ico', 'download'], kind: 'asset' },
  { id: 'asset-color-tokens', label: 'Brand Color Tokens', context: 'Asset Library · CSS', section: 'assets', anchor: 'asset-color-tokens', keywords: ['color', 'token', 'css', 'variable', '--color-brand'], kind: 'asset' },
  { id: 'asset-font-stack', label: 'Font Stack Reference', context: 'Asset Library · Fonts', section: 'assets', anchor: 'asset-font-stack', keywords: ['font', 'stack', 'poppins', 'inter', 'download'], kind: 'asset' },
]

const PAGE_ITEMS: GuidelineSearchItem[] = sections.map((section) => ({
  id: `page-${section.id}`,
  label: section.label,
  context:
    section.id === 'components'
      ? 'Components · Canonical'
      : section.id === 'voice'
        ? 'Rules · Canonical'
        : section.id === 'spacing'
          ? 'Pattern · Canonical'
          : section.id === 'real-world-examples' || section.id === 'pattern-email' || section.id === 'pattern-social' || section.id === 'pattern-decks'
            ? 'Pattern · Reference'
            : section.id === 'digital' || section.id === 'assets' || section.id === 'logo'
              ? 'Canonical page'
              : 'Page',
  section: section.id,
  keywords: [section.id, section.group, section.label],
  kind: 'page' as const,
}))

export const GUIDELINE_SEARCH_INDEX: GuidelineSearchItem[] = [
  ...LOGO_FILES,
  ...LOGO_BACKGROUNDS,
  ...buildColorItems(),
  ...FONT_ITEMS,
  ...COMPONENT_ITEMS,
  ...RULE_ITEMS,
  ...PATTERN_ITEMS,
  ...ICON_ITEMS,
  ...DIGITAL_ITEMS,
  ...COLLATERAL_ITEMS,
  ...ASSET_FILE_ITEMS,
  ...PAGE_ITEMS,
]

export const FEATURED_SEARCH_ITEM_IDS = [
  'logo-vertical-full-color',
  'logo-horizontal-full-color',
  'color-brand-yellow',
  'color-brand-blue',
  'font-poppins',
  'font-inter',
  'btn-primary-cta',
  'component-header-nav',
  'icon-home',
  'icon-search',
  'digital-favicon-16',
  'asset-logo-svg',
] as const

const INDEX_BY_ID = new Map(GUIDELINE_SEARCH_INDEX.map((item) => [item.id, item]))

export function getFeaturedSearchItems(): GuidelineSearchItem[] {
  return FEATURED_SEARCH_ITEM_IDS.map((id) => INDEX_BY_ID.get(id)).filter(
    (item): item is GuidelineSearchItem => item !== undefined,
  )
}
