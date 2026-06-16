'use client'

import { useState } from 'react'
import { Info, Palette, Type, Layout, Zap, CheckCircle, AlertCircle } from 'lucide-react'

interface BrandDNAFoundationProps {
  onPromptGenerated: (prompt: string) => void
}

export const BrandDNAFoundation = ({ onPromptGenerated }: BrandDNAFoundationProps) => {
  const [selectedElements, setSelectedElements] = useState<string[]>(['colors', 'typography', 'layout'])

  const brandDNA = {
    colors: {
      primary: '#FFC107',
      secondary: '#2196F3',
      dark: '#1565C0',
      text: '#333333',
      background: '#FAFAFA',
      accent: '#1AD191'
    },
    typography: {
      display: 'Poppins Bold 700-900',
      body: 'Inter Regular 400',
      code: 'JetBrains Mono Regular 400',
      hierarchy: {
        h1: '32-48px',
        h2: '18px',
        h3: '13-14px',
        body: '13-14px',
        small: '10-11px'
      }
    },
    layout: {
      style: 'Premium, confident interface with balanced density',
      spacing: '8px base grid',
      composition: 'Purposeful asymmetry, no overlapping elements',
      responsive: 'Mobile-first, CSS Grid preferred'
    },
    components: {
      buttons: 'Rounded 12px, Brand Yellow background, tactile -1px translate',
      cards: 'Rounded 16px, soft border, diffused shadow',
      navigation: 'Deep Charcoal sidebar, Brand Yellow accent'
    },
    constraints: {
      colors: 'Maximum 1 primary accent, no pure black, WCAG AA compliance',
      typography: 'Poppins only for headlines, max 65 chars per line',
      layout: 'No nested cards, no 3-column equal grids',
      elements: 'No emojis, custom cursors, or overlapping elements'
    }
  }

  const generateBrandPrompt = () => {
    const prompt = `MediaBubble Brand Profile Guidelines:

Visual Style: ${brandDNA.layout.style}
Color Palette: Primary accent ${brandDNA.colors.primary}, secondary ${brandDNA.colors.secondary}, dark ${brandDNA.colors.dark}, text ${brandDNA.colors.text}
Typography: ${brandDNA.typography.display} for headlines, ${brandDNA.typography.body} for body text
Layout: ${brandDNA.layout.spacing} base grid, ${brandDNA.layout.composition}

Component Standards:
- Buttons: ${brandDNA.components.buttons}
- Cards: ${brandDNA.components.cards}
- Navigation: ${brandDNA.components.navigation}

Constraints: ${brandDNA.constraints.colors}, ${brandDNA.constraints.typography}, ${brandDNA.constraints.layout}

Create all visual assets following these MediaBubble brand guidelines for consistency across all outputs.`

    onPromptGenerated(prompt)
  }

  const toggleElement = (element: string) => {
    setSelectedElements(prev => 
      prev.includes(element) 
        ? prev.filter(e => e !== element)
        : [...prev, element]
    )
  }

  const elements = [
    {
      id: 'colors',
      title: 'Color System',
      description: 'Strategic use of Brand Yellow and Brand Blue with strict contrast guidelines',
      icon: Palette,
      details: [
        'Brand Yellow (#FFC107) - Primary CTAs and highlights',
        'Brand Blue (#2196F3) - Secondary actions and navigation',
        'Charcoal (#333333) - Body text and headings',
        'Canvas White (#FAFAFA) - Page backgrounds',
        'Maximum 1 accent color per view'
      ]
    },
    {
      id: 'typography',
      title: 'Typography Rules',
      description: 'Controlled hierarchy through weight and color, not massive scale',
      icon: Type,
      details: [
        'Poppins Bold 700-900 - Headlines (32-48px)',
        'Inter Regular 400 - Body text (13-14px)',
        'JetBrains Mono - Code snippets and metadata',
        'Maximum 65 characters per line',
        'No generic system fonts for premium contexts'
      ]
    },
    {
      id: 'layout',
      title: 'Layout Principles',
      description: 'Asymmetric compositions with clean spatial zones and purposeful whitespace',
      icon: Layout,
      details: [
        'CSS Grid preferred over Flexbox',
        '8px base spacing system',
        'No overlapping elements',
        'Mobile-first responsive design',
        'Asymmetric layouts preferred (variance > 5)'
      ]
    },
    {
      id: 'components',
      title: 'Component Standards',
      description: 'Consistent UI elements with premium styling and micro-interactions',
      icon: Zap,
      details: [
        'Buttons: Rounded 12px, tactile -1px translate on active',
        'Cards: Rounded 16px, soft border, diffused shadow',
        'Navigation: Deep Charcoal sidebar, Brand Yellow accents',
        'Spring physics for micro-interactions',
        'No nested cards or custom cursors'
      ]
    }
  ]

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-brand-surface border border-brand-whisper-border rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#2196F3]/[0.1] flex items-center justify-center flex-shrink-0">
            <Info size={20} className="text-brand-blue" />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-brand-text mb-2">MediaBubble Brand Profile Foundation</h2>
            <p className="text-[14px] text-brand-text-muted leading-relaxed">
              The Brand Profile represents the core visual and design principles that define MediaBubble&apos;s identity. 
              When creating prompts for generative AI tools, incorporating these elements ensures all generated 
              assets maintain brand consistency and professional quality.
            </p>
          </div>
        </div>
      </div>

      {/* Brand Elements Selection */}
      <div>
        <h3 className="text-[16px] font-bold text-brand-text mb-4">Select Brand Elements to Include</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {elements.map((element) => {
            const IconComponent = element.icon
            const isSelected = selectedElements.includes(element.id)
            return (
              <button
                key={element.id}
                onClick={() => toggleElement(element.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-start ${
                  isSelected
                    ? 'border-[#FFC107] bg-[#FFC107]/[0.05] shadow-[0_2px_8px_rgba(255,193,7,0.1)]'
                    : 'border-brand-whisper-border hover:border-[#2196F3] hover:bg-black/[0.02] dark:hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-[#FFC107]/[0.2]' : 'bg-brand-canvas dark:bg-white/[0.04]'
                  }`}>
                    <IconComponent size={16} className={isSelected ? 'text-brand-yellow' : 'text-brand-text-muted'} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-brand-text mb-1">{element.title}</h4>
                    <p className="text-[12px] text-brand-text-muted mb-2">{element.description}</p>
                    <ul className="text-[11px] text-brand-text-muted space-y-0.5">
                      {element.details.slice(0, 3).map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <CheckCircle size={10} className="text-brand-blue mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Brand Constraints */}
      <div className="bg-brand-canvas border border-brand-whisper-border rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle size={18} className="text-[#DC2626] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-[16px] font-bold text-brand-text mb-2">Brand Constraints & Anti-Patterns</h3>
            <p className="text-[12px] text-brand-text-muted mb-3">These elements are strictly forbidden in MediaBubble designs:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-brand-surface border border-brand-whisper-border rounded-lg p-3">
                <h4 className="text-[12px] font-semibold text-brand-text mb-2">❌ Forbidden Elements</h4>
                <ul className="text-[11px] text-brand-text-muted space-y-1">
                  <li>• Emojis anywhere</li>
                  <li>• Pure black (#000000)</li>
                  <li>• Nested cards</li>
                  <li>• 3-column equal grids</li>
                  <li>• Custom cursors</li>
                </ul>
              </div>
              <div className="bg-brand-surface border border-brand-whisper-border rounded-lg p-3">
                <h4 className="text-[12px] font-semibold text-brand-text mb-2">✅ Required Standards</h4>
                <ul className="text-[11px] text-brand-text-muted space-y-1">
                  <li>• WCAG 2.1 AA compliance</li>
                  <li>• 8px spacing grid</li>
                  <li>• CSS Grid layouts</li>
                  <li>• Mobile-first design</li>
                  <li>• Spring physics interactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Prompt Button */}
      <div className="flex justify-end">
        <button
          onClick={generateBrandPrompt}
          className="px-6 py-3 rounded-lg bg-[#FFC107] text-brand-charcoal text-[14px] font-semibold hover:bg-[#FFB300] transition-colors flex items-center gap-2 shadow-[0_4px_12px_rgba(255,193,7,0.2)]"
        >
          <CheckCircle size={16} />
          Generate Complete Brand Profile Prompt
        </button>
      </div>
    </div>
  )
}