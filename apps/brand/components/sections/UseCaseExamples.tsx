'use client'

import { useState } from 'react'
import { Layout, Layers, Monitor, Zap, Copy, Eye, AlertCircle, CheckCircle } from 'lucide-react'

interface UseCaseExamplesProps {
  onPromptGenerated: (prompt: string) => void
}

interface UseCaseExample {
  id: string
  title: string
  category: string
  scenario: string
  badPrompt: string
  goodPrompt: string
  explanation: string
  keyImprovements: string[]
}

export const UseCaseExamples = ({ onPromptGenerated }: UseCaseExamplesProps) => {
  const [selectedExample, setSelectedExample] = useState<string>('hero-section')

  const examples: UseCaseExample[] = [
    {
      id: 'hero-section',
      title: 'Hero Section Redesign',
      category: 'Web Design',
      scenario: 'A tech company needs a compelling hero section that converts visitors',
      badPrompt: `Create a hero section with a nice background image, some text about our services, and a call to action button. Make it look modern and professional with good colors.`,
      goodPrompt: `Create a MediaBubble hero section with:
- Asymmetric left-aligned layout with purposeful asymmetry
- Strategic use of Brand Yellow (#FFC107) for primary CTA button
- Poppins Bold headline (32-48px): "Transform Your Digital Presence"
- Inter body text (13-14px, max 65 chars per line) describing services
- Single "Schedule Strategy Session" CTA button with rounded 12px corners
- Generous whitespace, no filler text or scroll indicators
- Canvas White background with subtle shadow depth
- Mobile-first responsive design that collapses to single column
- Tactile -1px translate on button active state`,
      explanation: 'The improved prompt incorporates specific brand profile elements like asymmetric layout, exact color values, typography hierarchy, and component standards that ensure brand consistency.',
      keyImprovements: [
        'Specified exact color values and brand accents',
        'Defined typography hierarchy with font names and sizes',
        'Incorporated asymmetric layout principles',
        'Added interaction specifications',
        'Ensured mobile-first responsive design'
      ]
    },
    {
      id: 'feature-cards',
      title: 'Feature Card Enhancement',
      category: 'UI Components',
      scenario: 'Designing service feature cards for a company landing page',
      badPrompt: `Make some nice cards to showcase our services. Include icons, titles, descriptions, and maybe some hover effects. Use a modern design.`,
      goodPrompt: `Design MediaBubble feature cards with:
- Generously rounded corners (16px) with soft 1px border (#E8E8E8)
- Diffused shadow (0 1px 3px rgba(0,0,0,0.05)) for depth
- Canvas White background with strategic Brand Blue (#2196F3) icon placement
- Clean typography hierarchy: Poppins SemiBold titles, Inter Regular descriptions
- 16px internal padding with consistent 8px spacing between elements
- Hover states with subtle scale effect (1.02x) and Brand Blue accent intensification
- No nested cards or excessive shadow layers
- Proper touch targets (minimum 44px) for accessibility
- WCAG 2.1 AA contrast compliance for text`,
      explanation: 'The MediaBubble prompt enforces specific design standards like corner radius, shadow specifications, and accessibility requirements that maintain brand quality.',
      keyImprovements: [
        'Specified exact corner radius and border styling',
        'Defined shadow properties precisely',
        'Incorporated typography standards',
        'Added accessibility requirements',
        'Ensured consistent spacing system'
      ]
    },
    {
      id: 'dashboard-ui',
      title: 'Dashboard Interface',
      category: 'Web Application',
      scenario: 'Creating an analytics dashboard for client reporting',
      badPrompt: `Build a dashboard with charts, data tables, and navigation. Use a clean design with good colors and make it responsive.`,
      goodPrompt: `Create a MediaBubble analytics dashboard with:
- CSS Grid-based layout system with proper column definitions
- Deep Charcoal (#0D0F12) sidebar navigation with Brand Yellow active states
- Brand Blue (#2196F3) for secondary actions and data point highlights
- Professional data visualization with clear information hierarchy
- High contrast for accessibility (WCAG 2.1 AA minimum)
- Spring physics micro-interactions on data updates
- Consistent 8px spacing grid throughout
- Inter Regular body text, Poppins Bold for headings and labels
- Mobile-first responsive design that reorganizes grid below 768px
- No overlapping elements or data points`,
      explanation: "The prompt enforces MediaBubble's specific layout preferences (CSS Grid over Flexbox) and maintains the established color hierarchy and motion philosophy.",
      keyImprovements: [
        'Specified CSS Grid architecture',
        'Defined sidebar styling and colors',
        'Ensured accessibility compliance',
        'Incorporated motion standards',
        'Enforced mobile-first approach'
      ]
    },
    {
      id: 'marketing-graphic',
      title: 'Social Media Marketing',
      category: 'Marketing Design',
      scenario: 'Creating social media posts for a campaign launch',
      badPrompt: `Design some social media graphics for our new product launch. Make them eye-catching with good colors and text.`,
      goodPrompt: `Generate MediaBubble social media graphics with:
- Premium, confident aesthetic with balanced density (5/10)
- Strategic Brand Yellow (#FFC107) accent for primary message highlights
- Professional composition with purposeful asymmetry (variance > 5)
- Clean typography: Poppins Bold for headlines, Inter for body text
- Consistent color palette using Brand Blue and neutral tones
- No generic AI patterns or filler content
- High-quality product imagery with strategic placement
- Brand-appropriate messaging: "Innovate Beyond Boundaries"
- Mobile-optimized aspect ratios (1:1 for Instagram, 1.91:1 for Facebook)
- Proper text hierarchy with maximum 65 characters per line`,
      explanation: 'The MediaBubble prompt ensures marketing materials maintain brand consistency while being optimized for specific social media platforms.',
      keyImprovements: [
        'Specified aesthetic qualities and variance',
        'Ensured brand color usage',
        'Incorporated typography standards',
        'Optimized for social media platforms',
        'Eliminated generic content patterns'
      ]
    },
    {
      id: 'navigation-system',
      title: 'Navigation Redesign',
      category: 'Web Design',
      scenario: 'Improving website navigation for better user experience',
      badPrompt: `Create a navigation menu with links organized in a sidebar. Make it look clean and modern with hover effects.`,
      goodPrompt: `Design MediaBubble navigation sidebar with:
- Deep Charcoal background (#0D0F12) with proper contrast ratios
- Light neutral text (rgba(255,255,255,0.55)) for inactive states
- Brand Yellow left border (3px) for active state indication
- Yellow text and light yellow background highlight for active items
- Hover state: Light neutral background (rgba(255,255,255,0.04))
- Uppercase labels with 10px font size and letter-spacing for hierarchy
- Logo placement: 36px mark with yellow background, Poppins bold wordmark
- Clean hierarchy with proper 12px spacing between items
- Mobile collapse to hamburger menu below 768px
- Touch-friendly spacing (48px+ tap targets)`,
      explanation: 'The prompt enforces MediaBubble\u2019s specific navigation standards including exact colors, typography specifications, and responsive behavior.',
      keyImprovements: [
        'Specified exact color values and backgrounds',
        'Defined typography hierarchy precisely',
        'Ensured responsive behavior',
        'Added accessibility considerations',
        'Incorporated brand-specific styling'
      ]
    }
  ]

  const selectedData = examples.find(ex => ex.id === selectedExample)

  const copyToClipboard = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    onPromptGenerated(prompt)
  }

  const renderComparison = (example: UseCaseExample) => (
    <div key={example.id} className="space-y-6">
      {/* Scenario */}
      <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
            <Layout size={16} className="text-[#9E9E9E]" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-[#333333] mb-1">{example.title}</h3>
            <p className="text-[12px] text-[#9E9E9E]">{example.scenario}</p>
            <span className="inline-block mt-2 px-2 py-1 bg-[#F5F5F5] text-[#9E9E9E] text-[10px] rounded-full">
              {example.category}
            </span>
          </div>
        </div>
      </div>

      {/* Bad Prompt */}
      <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle size={18} className="text-[#DC2626] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-[14px] font-semibold text-[#DC2626] mb-2">❌ Generic Prompt (Poor Results)</h3>
            <p className="text-[11px] text-[#9E9E9E] mb-3">This prompt lacks specific brand guidelines and produces inconsistent results:</p>
          </div>
        </div>
        <div className="bg-[#FFFFFF] border border-[#FECACA] rounded-lg p-4 mb-4">
          <div className="font-mono text-[11px] text-[#333333] whitespace-pre-wrap">
            {example.badPrompt}
          </div>
        </div>
        <button
          onClick={() => copyToClipboard(example.badPrompt)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#FECACA] text-[#DC2626] text-[12px] font-medium hover:bg-[#FCA5A5] transition-colors"
        >
          <Copy size={14} />
          Copy Generic Prompt
        </button>
      </div>

      {/* Good Prompt */}
      <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <CheckCircle size={18} className="text-[#16A34A] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-[14px] font-semibold text-[#16A34A] mb-2">✅ MediaBubble Brand Prompt (Consistent Results)</h3>
            <p className="text-[11px] text-[#9E9E9E] mb-3">This prompt incorporates Brand profile for on-brand, consistent outputs:</p>
          </div>
        </div>
        <div className="bg-[#FFFFFF] border border-[#86EFAC] rounded-lg p-4 mb-4">
          <div className="font-mono text-[11px] text-[#333333] whitespace-pre-wrap">
            {example.goodPrompt}
          </div>
        </div>
        <button
          onClick={() => copyToClipboard(example.goodPrompt)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#86EFAC] text-[#16A34A] text-[12px] font-medium hover:bg:#4ADE80 transition-colors"
        >
          <Copy size={14} />
          Copy Brand Prompt
        </button>
      </div>

      {/* Explanation */}
      <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-xl p-6">
        <h3 className="text-[14px] font-semibold text-[#333333] mb-3">Why This Works Better</h3>
        <p className="text-[12px] text-[#9E9E9E] mb-4">{example.explanation}</p>
        
        <h4 className="text-[12px] font-semibold text-[#333333] mb-2">Key Improvements:</h4>
        <ul className="space-y-2">
          {example.keyImprovements.map((improvement, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle size={12} className="text-[#16A34A] mt-0.5 flex-shrink-0" />
              <span className="text-[11px] text-[#9E9E9E]">{improvement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Example Selector */}
      <div>
        <h3 className="text-[16px] font-bold text-[#333333] mb-4">Use Case Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples.map((example) => {
            const IconComponent = example.category === 'Web Design' ? Layout : 
                                 example.category === 'UI Components' ? Layers :
                                 example.category === 'Web Application' ? Monitor : Zap
            const isSelected = selectedExample === example.id
            return (
              <button
                key={example.id}
                onClick={() => setSelectedExample(example.id)}
                className={`p-4 rounded-xl border-2 transition-all text-start ${
                  isSelected
                    ? 'border-[#FFC107] bg-[#FFC107]/[0.05] shadow-[0_2px_8px_rgba(255,193,7,0.1)]'
                    : 'border-[#E8E8E8] hover:border-[#2196F3] hover:bg-[#F5F5F5]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-[#FFC107]/[0.2]' : 'bg-[#F5F5F5]'
                  }`}>
                    <IconComponent size={16} className={isSelected ? 'text-[#FFC107]' : 'text-[#9E9E9E]'} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-semibold text-[#333333] mb-1">{example.title}</h4>
                    <p className="text-[11px] text-[#9E9E9E]">{example.scenario}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-[#F5F5F5] text-[#9E9E9E] text-[10px] rounded-full">
                      {example.category}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Example */}
      {selectedData && renderComparison(selectedData)}
    </div>
  )
}