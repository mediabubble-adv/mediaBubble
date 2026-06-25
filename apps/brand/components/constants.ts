import { Layout, BookOpen, Layers, Palette, Type, Shapes, MessageSquare, Square, Grid3X3, Bookmark, FileText, Monitor, Zap, Download, Package, Wand2, TreePine } from 'lucide-react'

export const brand = {
  name: 'mediaBubble',
  tagline: 'Strategic creative that fills rooms and grows brands.',
  description: 'MediaBubble is a marketing and advertising agency based in Hurghada, Egypt. Since 2015, a team of 22+ strategists, designers, and developers has helped brands grow through SEO, branding, web, and paid ads. We measure outcomes, not outputs.',
  services: [
    { name: 'Strategic & Creative Marketing', desc: 'Strategy consulting, creative services, media production' },
    { name: 'Marketing & Digital Growth', desc: 'SEO, SEM, social advertising, email marketing, lead generation, content strategy' },
    { name: 'Branding & Design', desc: 'Logo design, brand development, print collateral, corporate events' },
    { name: 'Web Development', desc: 'Web development, UI/UX design, performance optimization' },
  ],
}

export const colorFamilies = [
  {
    name: 'Brand Blue',
    role: 'Primary color for navigation, interactive elements, and links',
    hex: '#2196F3',
    tones: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#2196F3', '#1E88E5', '#1976D2', '#1565C0'],
    usage: 'The primary color of the entire system. Drives navigation, primary buttons, links, focus rings, and information hierarchy across every surface.',
    cssVar: '--color-brand-blue',
  },
  {
    name: 'Dark Blue',
    role: 'Depth for headings, dark surfaces, and sidebar backgrounds',
    hex: '#1565C0',
    tones: ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#1565C0', '#0D47A1', '#0A3D91', '#072A6B'],
    usage: 'The deeper anchor. Use for display headings, sidebar/dark-mode surfaces, and hover intensification of Brand Blue.',
    cssVar: '--color-dark-blue',
  },
  {
    name: 'Brand Yellow',
    role: 'Accent for CTAs, highlights, and active indicators',
    hex: '#FFC107',
    tones: ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFC107', '#FFB300', '#FF8F00', '#FF6F00'],
    usage: 'The accent that cuts through. Reserve for primary CTAs, active navigation states, and single moments per view that must earn attention. Never use for body text or large backgrounds.',
    cssVar: '--color-brand-yellow',
  },
  {
    name: 'Mint',
    role: 'Vibrant accent — premium highlights, success states, and elevated hover details',
    hex: '#1AD191',
    tones: ['#F0FDF9', '#CCFBEF', '#99F6E0', '#5EEAD4', '#2DD4BF', '#1AD191', '#0D9067', '#065F46'],
    usage: 'Mint accent for secondary gradients, high-value highlights, and action state elevations.',
    cssVar: '--color-accent-mint',
  },
  {
    name: 'Deep Charcoal',
    role: 'Sidebar backgrounds, dark sections, high-contrast surfaces',
    hex: '#0D0F12',
    tones: ['#2A2D35', '#1F2128', '#181A20', '#121418', '#0D0F12', '#0A0B0E', '#07080A', '#040506'],
    usage: 'Use for dark containers, sidebars, and footer backgrounds. Pair with light text only. Not for body copy on white.',
    cssVar: '--color-deep-charcoal',
  },
]

export const neutralScale = [
  { name: 'Pure White', hex: '#FFFFFF', note: 'Cards, containers, surfaces' },
  { name: 'Canvas White', hex: '#FAFAFA', note: 'Page backgrounds' },
  { name: 'Light Border', hex: '#F5F5F5', note: 'Subtle section backgrounds' },
  { name: 'Whisper Border', hex: '#E8E8E8', note: 'Card borders, dividers' },
  { name: 'Muted Steel', hex: '#9E9E9E', note: 'Secondary text, placeholders' },
  { name: 'Charcoal', hex: '#333333', note: 'Body text, headings' },
  { name: 'Deep Charcoal', hex: '#0D0F12', note: 'Dark UI surfaces' },
]

export const sections = [
  { id: 'overview', label: 'Start Here', icon: BookOpen, group: 'Start Here' },
  { id: 'logo', label: 'Logo', icon: Layers, group: 'Foundations' },
  { id: 'colors', label: 'Color', icon: Palette, group: 'Foundations' },
  { id: 'typography', label: 'Typography', icon: Type, group: 'Foundations' },
  { id: 'iconography', label: 'Iconography', icon: Shapes, group: 'Foundations' },
  { id: 'voice', label: 'Voice & Tone', icon: MessageSquare, group: 'Foundations' },
  { id: 'components', label: 'Components', icon: Square, group: 'Components' },
  { id: 'patterns', label: 'Patterns', icon: Grid3X3, group: 'Patterns' },
  { id: 'spacing', label: 'Spacing & Grid', icon: Grid3X3, group: 'Patterns' },
  { id: 'real-world-examples', label: 'Application Hub', icon: Layout, group: 'Patterns' },
  { id: 'pattern-email', label: 'Email Applications', icon: Monitor, group: 'Patterns' },
  { id: 'pattern-social', label: 'Social Applications', icon: Zap, group: 'Patterns' },
  { id: 'pattern-decks', label: 'Deck Applications', icon: Bookmark, group: 'Patterns' },
  { id: 'collateral', label: 'Collateral', icon: FileText, group: 'Assets' },
  { id: 'digital', label: 'Digital Assets', icon: Monitor, group: 'Assets' },
  { id: 'assets', label: 'Asset Library', icon: Package, group: 'Assets' },
  { id: 'prompts', label: 'Brand AI Prompts', icon: Wand2, group: 'Rules' },
]
