'use client'

import { useState } from 'react'
import { Layers, Copy, CheckCircle, Eye, Zap, Monitor, Layout } from 'lucide-react'

interface PromptTemplateLibraryProps {
  onPromptGenerated: (prompt: string) => void
}

interface PromptTemplate {
  id: string
  name: string
  category: 'hero' | 'feature' | 'dashboard' | 'marketing' | 'component'
  description: string
  icon: any
  prompt: string
  examples: string[]
  tags: string[]
}

export const PromptTemplateLibrary = ({ onPromptGenerated }: PromptTemplateLibraryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const templates: PromptTemplate[] = [
    {
      id: 'hero-section',
      name: 'Hero Section',
      category: 'hero',
      description: 'Asymmetric hero with strategic Brand Yellow accent',
      icon: Layout,
      prompt: `Create a MediaBubble hero section with:
- Asymmetric left-aligned layout (purposeful asymmetry)
- Strategic use of Brand Yellow (#FFC107) for primary CTA
- Poppins Bold headline (32-48px): "Grow Your Business with Measurable Results"
- Inter body text (13-14px, max 65 chars per line)
- Single "Schedule a Free Consultation" button
- Generous whitespace, no filler text or scroll indicators
- Canvas White background with subtle shadows
- Mobile-first responsive design`,
      examples: [
        'Tech company landing page hero',
        'SaaS platform introduction',
        'Digital agency services showcase'
      ],
      tags: ['asymmetric', 'cta', 'responsive']
    },
    {
      id: 'feature-card',
      name: 'Feature Card',
      category: 'feature',
      description: 'Premium feature cards with consistent styling',
      icon: Layers,
      prompt: `Design MediaBubble feature cards with:
- Generously rounded corners (16px)
- Soft 1px border (#E8E8E8)
- Diffused shadow (0 1px 3px rgba(0,0,0,0.05))
- Canvas White background
- Strategic Brand Blue (#2196F3) icon placement
- Clean typography hierarchy
- 16px internal padding
- Hover states with subtle scale effect
- No nested cards or excessive shadows`,
      examples: [
        'Service feature showcase',
        'Product capability cards',
        'Benefit highlight modules'
      ],
      tags: ['cards', 'features', 'consistent']
    },
    {
      id: 'dashboard-ui',
      name: 'Dashboard UI',
      category: 'dashboard',
      description: 'Professional dashboard with brand profile components',
      icon: Monitor,
      prompt: `Create a MediaBubble dashboard interface with:
- CSS Grid-based layout system
- Brand Blue (#2196F3) for secondary actions and indicators
- Professional data visualization charts
- Clear information hierarchy
- High contrast for accessibility (WCAG 2.1 AA)
- Spring physics micro-interactions
- Consistent 8px spacing grid
- Deep Charcoal (#0D0F12) sidebar for navigation
- Inter Regular body text, Poppins Bold for headings`,
      examples: [
        'Analytics dashboard',
        'Project management interface',
        'Marketing metrics panel'
      ],
      tags: ['dashboard', 'data', 'professional']
    },
    {
      id: 'marketing-graphic',
      name: 'Marketing Graphic',
      category: 'marketing',
      description: 'Premium marketing collateral with brand consistency',
      icon: Zap,
      prompt: `Generate MediaBubble marketing graphics with:
- Premium, confident aesthetic with balanced density
- Strategic Brand Yellow accent for highlights
- Professional composition with purposeful asymmetry
- Clean typography (Poppins + Inter)
- Consistent color palette (Brand Blue, neutrals)
- No generic AI patterns or filler content
- High-quality imagery with strategic placement
- Brand-appropriate messaging and tone
- Mobile-responsive aspect ratios`,
      examples: [
        'Social media posts',
        'Website banners',
        'Email campaign graphics'
      ],
      tags: ['marketing', 'graphics', 'premium']
    },
    {
      id: 'button-component',
      name: 'Button Component',
      category: 'component',
      description: 'Brand-consistent button variations',
      icon: Layers,
      prompt: `Create MediaBubble button components:
- Primary: Brand Yellow (#FFC107) background, Charcoal text, rounded 12px
- Secondary: Brand Blue (#2196F3) background, White text, rounded 12px
- Ghost: White background, Brand Blue border (2px), Brand Blue text
- Tactile interaction: -1px translate on active state (not shadow depth)
- Focus ring: Brand Yellow outline, 2px width
- Consistent padding: 12px 24px for medium size
- No outer glows or excessive effects
- Disabled state: 50% opacity, no interactivity`,
      examples: [
        'Call-to-action buttons',
        'Navigation buttons',
        'Form action buttons'
      ],
      tags: ['buttons', 'components', 'interactive']
    },
    {
      id: 'navigation-sidebar',
      name: 'Navigation Sidebar',
      category: 'component',
      description: 'Brand-consistent navigation system',
      icon: Layout,
      prompt: `Design MediaBubble navigation sidebar:
- Deep Charcoal background (#0D0F12)
- Light neutral text (rgba(255,255,255,0.55))
- Brand Yellow left border (3px) for active state
- Yellow text and light highlight for active items
- Hover state: Light neutral background (rgba(255,255,255,0.04))
- Uppercase labels, small font (10px), letter-spacing for hierarchy
- Logo: 36px mark with yellow background, Poppins bold wordmark
- Clean hierarchy with proper spacing
- Mobile collapse to hamburger menu`,
      examples: [
        'Dashboard sidebar',
        'Settings navigation',
        'App main navigation'
      ],
      tags: ['navigation', 'sidebar', 'consistent']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Templates', count: templates.length },
    { id: 'hero', label: 'Hero Sections', count: templates.filter(t => t.category === 'hero').length },
    { id: 'feature', label: 'Feature Cards', count: templates.filter(t => t.category === 'feature').length },
    { id: 'dashboard', label: 'Dashboard UI', count: templates.filter(t => t.category === 'dashboard').length },
    { id: 'marketing', label: 'Marketing Graphics', count: templates.filter(t => t.category === 'marketing').length },
    { id: 'component', label: 'Components', count: templates.filter(t => t.category === 'component').length },
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const copyToClipboard = (prompt: string, name: string) => {
    navigator.clipboard.writeText(prompt)
    // You could show a success state here
    onPromptGenerated(prompt)
  }

  const renderTemplateCard = (template: PromptTemplate) => {
    const IconComponent = template.icon
    return (
      <div key={template.id} className="bg-brand-surface border border-brand-whisper-border rounded-xl p-6 animate-fade-in-up">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#2196F3]/[0.1] flex items-center justify-center flex-shrink-0">
            <IconComponent size={20} className="text-[#2196F3]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-bold text-brand-text mb-1">{template.name}</h3>
            <p className="text-[13px] text-brand-text-muted mb-3">{template.description}</p>
            <div className="flex flex-wrap gap-1">
              {template.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-brand-canvas dark:bg-white/[0.04] text-brand-text-muted text-[10px] rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={14} className="text-brand-text-muted" />
            <span className="text-[11px] font-medium text-brand-text-muted">Use cases:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {template.examples.map((example, idx) => (
              <span key={idx} className="px-2 py-1 bg-brand-canvas border border-brand-whisper-border text-brand-text text-[10px] rounded">
                {example}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-brand-canvas border border-brand-whisper-border rounded-lg p-4 mb-4">
          <h4 className="text-[12px] font-semibold text-brand-text mb-2">Prompt Template:</h4>
          <div className="font-mono text-[11px] text-brand-text whitespace-pre-wrap">
            {template.prompt}
          </div>
        </div>

        <button
          onClick={() => copyToClipboard(template.prompt, template.name)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#2196F3] text-white text-[13px] font-medium hover:bg-[#1976D2] transition-colors"
        >
          <Copy size={14} />
          Use This Template
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-[16px] font-bold text-brand-text mb-4">Template Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-[#FFC107]/[0.1] text-brand-text shadow-[inset_0_0_0_1px_rgba(255,193,7,0.12)]'
                  : 'bg-brand-canvas dark:bg-white/[0.04] text-brand-text-muted hover:bg-[#E8E8E8] hover:text-brand-text'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map(renderTemplateCard)}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-brand-canvas dark:bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers size={24} className="text-brand-text-muted" />
          </div>
          <h3 className="text-[16px] font-semibold text-brand-text mb-2">No templates found</h3>
          <p className="text-[14px] text-brand-text-muted">Try selecting a different category or check back later for more templates.</p>
        </div>
      )}
    </div>
  )
}