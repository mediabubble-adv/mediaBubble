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
    label: 'Vertical Full Color Logo',
    context: 'Logo',
    section: 'logo',
    anchor: 'logo-primary-mark',
    keywords: ['logo', 'vertical', 'full color', 'mark', 'mediaBubble_logo_vertical_full_color'],
    kind: 'logo',
  },
  {
    id: 'logo-horizontal-full-color',
    label: 'Horizontal Full Color Logo',
    context: 'Logo',
    section: 'logo',
    anchor: 'logo-primary-mark',
    keywords: ['logo', 'horizontal', 'full color', 'wordmark', 'mediaBubble_logo_horizontal_full_color'],
    kind: 'logo',
  },
  {
    id: 'logo-horizontal-text-white',
    label: 'Horizontal Text White Logo',
    context: 'Logo',
    section: 'logo',
    keywords: ['logo', 'horizontal', 'white', 'text white', 'dark background', 'mediaBubble_logo_horizontal_text_white'],
    kind: 'logo',
  },
  {
    id: 'logo-horizontal-white',
    label: 'Horizontal White Logo',
    context: 'Logo',
    section: 'logo',
    keywords: ['logo', 'horizontal', 'white', 'mediaBubble_logo_horizontal_white'],
    kind: 'logo',
  },
  {
    id: 'logo-horizontal-black',
    label: 'Horizontal Black Logo',
    context: 'Logo',
    section: 'logo',
    keywords: ['logo', 'horizontal', 'black', 'mediaBubble_logo_horizontal_Black'],
    kind: 'logo',
  },
  {
    id: 'logo-vertical-white',
    label: 'Vertical White Logo',
    context: 'Logo',
    section: 'logo',
    keywords: ['logo', 'vertical', 'white', 'mediaBubble_logo_vertical_white'],
    kind: 'logo',
  },
  {
    id: 'logo-vertical-black',
    label: 'Vertical Black Logo',
    context: 'Logo',
    section: 'logo',
    keywords: ['logo', 'vertical', 'black', 'mediaBubble_logo_vertical_Black'],
    kind: 'logo',
  },
  {
    id: 'logo-icon',
    label: 'Logo Icon',
    context: 'Logo',
    section: 'logo',
    keywords: ['logo', 'icon', 'symbol', 'app icon', 'mediaBubble_icon'],
    kind: 'logo',
  },
  {
    id: 'logo-icon-outline',
    label: 'Logo Icon Outline',
    context: 'Logo',
    section: 'logo',
    keywords: ['logo', 'icon', 'outline', 'mediaBubble_icon_outline'],
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
    label: 'Favicon Logo',
    context: 'Digital Assets',
    section: 'digital',
    anchor: 'digital-favicon',
    keywords: ['logo', 'favicon', 'browser tab', 'logo-favicon'],
    kind: 'logo',
  },
]

const LOGO_BACKGROUNDS: GuidelineSearchItem[] = [
  { id: 'logo-bg-full-color', label: 'Full Color on White', context: 'Logo · Background', section: 'logo', anchor: 'logo-bg-white', keywords: ['logo', 'white', 'full color'], kind: 'logo' },
  { id: 'logo-bg-white-on-dark', label: 'White on Deep Blue', context: 'Logo · Background', section: 'logo', anchor: 'logo-bg-deep-blue', keywords: ['logo', 'white', 'dark', 'blue'], kind: 'logo' },
  { id: 'logo-bg-canvas', label: 'Logo on Canvas White', context: 'Logo · Background', section: 'logo', anchor: 'logo-bg-canvas', keywords: ['logo', 'canvas', '#FAFAFA'], kind: 'logo' },
  { id: 'logo-bg-yellow', label: 'Logo on Brand Yellow', context: 'Logo · Background', section: 'logo', anchor: 'logo-bg-yellow', keywords: ['logo', 'yellow', '#FFC107'], kind: 'logo' },
  { id: 'logo-bg-charcoal', label: 'White on Charcoal', context: 'Logo · Background', section: 'logo', anchor: 'logo-bg-charcoal', keywords: ['logo', 'charcoal', 'dark', '#333'], kind: 'logo' },
  { id: 'logo-bg-blue-tint', label: 'Logo on Light Blue Tint', context: 'Logo · Background', section: 'logo', anchor: 'logo-bg-blue-tint', keywords: ['logo', 'blue tint', '#E3F2FD'], kind: 'logo' },
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
  { id: 'btn-primary-cta', label: 'Primary CTA Button', context: 'Components · Button', section: 'components', keywords: ['button', 'primary', 'cta', 'yellow', 'submit'], kind: 'component' },
  { id: 'btn-secondary', label: 'Secondary Button', context: 'Components · Button', section: 'components', keywords: ['button', 'secondary', 'blue'], kind: 'component' },
  { id: 'btn-outline', label: 'Outline Button', context: 'Components · Button', section: 'components', keywords: ['button', 'outline', 'border'], kind: 'component' },
  { id: 'btn-ghost', label: 'Ghost Button', context: 'Components · Button', section: 'components', keywords: ['button', 'ghost', 'tertiary'], kind: 'component' },
  { id: 'btn-destructive', label: 'Destructive Button', context: 'Components · Button', section: 'components', keywords: ['button', 'destructive', 'delete', 'danger', 'red'], kind: 'component' },
  { id: 'btn-disabled', label: 'Disabled Button', context: 'Components · Button', section: 'components', keywords: ['button', 'disabled', 'inactive'], kind: 'component' },
  { id: 'card-default', label: 'Default Card', context: 'Components · Card', section: 'components', keywords: ['card', 'default', 'surface'], kind: 'component' },
  { id: 'card-hover', label: 'Hover Card', context: 'Components · Card', section: 'components', keywords: ['card', 'hover', 'interactive'], kind: 'component' },
  { id: 'card-accent', label: 'Accent Card', context: 'Components · Card', section: 'components', keywords: ['card', 'accent', 'yellow', 'highlight'], kind: 'component' },
  { id: 'card-dark', label: 'Dark Card', context: 'Components · Card', section: 'components', keywords: ['card', 'dark', 'inverse', 'hero'], kind: 'component' },
  { id: 'component-ui-shell', label: 'UI Dashboard Shell', context: 'Components · Layout', section: 'components', keywords: ['layout', 'shell', 'dashboard', 'sidebar'], kind: 'component' },
  { id: 'component-header-nav', label: 'Header & Nav Menu', context: 'Components · Layout', section: 'components', keywords: ['header', 'nav', 'navigation', 'menu', 'navbar'], kind: 'component' },
  { id: 'component-footer', label: 'Footer Layout', context: 'Components · Layout', section: 'components', keywords: ['footer', 'layout'], kind: 'component' },
  { id: 'component-pagination', label: 'Pagination Control', context: 'Components · Layout', section: 'components', keywords: ['pagination', 'pager', 'pages'], kind: 'component' },
  { id: 'component-nav-tabs', label: 'Navigation Tabs', context: 'Components · Navigation', section: 'components', keywords: ['tabs', 'navigation', 'underline', 'pill', 'segmented'], kind: 'component' },
  { id: 'component-form-inputs', label: 'Form Inputs', context: 'Components · Form', section: 'components', keywords: ['form', 'input', 'text field', 'textarea', 'select'], kind: 'component' },
  { id: 'component-date-picker', label: 'Date Picker', context: 'Components · Form', section: 'components', keywords: ['date', 'calendar', 'picker', 'range'], kind: 'component' },
  { id: 'component-data-table', label: 'Data Table', context: 'Components · Display', section: 'components', keywords: ['table', 'data', 'grid', 'rows'], kind: 'component' },
  { id: 'component-progress-bar', label: 'Progress Bar', context: 'Components · Display', section: 'components', keywords: ['progress', 'bar', 'loading'], kind: 'component' },
  { id: 'component-badges', label: 'Badges & Tags', context: 'Components · Display', section: 'components', keywords: ['badge', 'tag', 'chip', 'label'], kind: 'component' },
  { id: 'component-tooltip', label: 'Tooltip', context: 'Components · Feedback', section: 'components', keywords: ['tooltip', 'hint', 'hover'], kind: 'component' },
  { id: 'component-toggletip', label: 'Toggletip', context: 'Components · Feedback', section: 'components', keywords: ['toggletip', 'popover', 'click'], kind: 'component' },
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
  { id: 'digital-email-signature', label: 'Email Signature', context: 'Digital Assets', section: 'digital', anchor: 'digital-email-signature', keywords: ['email', 'signature', 'html'], kind: 'digital' },
  { id: 'digital-favicon-16', label: 'Favicon 16px', context: 'Digital Assets · Favicon', section: 'digital', anchor: 'digital-favicon', keywords: ['favicon', '16', 'browser tab'], kind: 'digital' },
  { id: 'digital-favicon-180', label: 'Apple Touch Icon 180px', context: 'Digital Assets · Favicon', section: 'digital', anchor: 'digital-favicon', keywords: ['apple', 'ios', '180', 'home screen'], kind: 'digital' },
  { id: 'digital-avatar-linkedin', label: 'LinkedIn Avatar', context: 'Digital Assets · Avatar', section: 'digital', anchor: 'digital-avatars', keywords: ['linkedin', 'avatar', 'profile', '400x400'], kind: 'digital' },
  { id: 'digital-avatar-instagram', label: 'Instagram Avatar', context: 'Digital Assets · Avatar', section: 'digital', anchor: 'digital-avatars', keywords: ['instagram', 'avatar', 'profile'], kind: 'digital' },
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
  context: 'Page',
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
  ...ICON_ITEMS,
  ...DIGITAL_ITEMS,
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
