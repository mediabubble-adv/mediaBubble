'use client'

import { useState, useEffect } from 'react'
import { Wand2, Palette, Type, Layout, Layers, Eye, Copy, Download } from 'lucide-react'

interface InteractivePromptBuilderProps {
  onPromptGenerated: (prompt: string) => void
}

interface AssetConfig {
  type: 'hero' | 'feature' | 'dashboard' | 'marketing' | 'component'
  size: 'small' | 'medium' | 'large'
  orientation: 'portrait' | 'landscape' | 'square'
  density: 'low' | 'medium' | 'high'
}

interface BrandConfig {
  primaryColor: string
  secondaryColor: string
  typographyStyle: 'modern' | 'classic' | 'minimal'
  layoutStyle: 'asymmetric' | 'centered' | 'grid'
  motionLevel: 'minimal' | 'moderate' | 'enhanced'
}

export const InteractivePromptBuilder = ({ onPromptGenerated }: InteractivePromptBuilderProps) => {
  const [assetConfig, setAssetConfig] = useState<AssetConfig>({
    type: 'hero',
    size: 'medium',
    orientation: 'landscape',
    density: 'medium'
  })

  const [brandConfig, setBrandConfig] = useState<BrandConfig>({
    primaryColor: 'yellow',
    secondaryColor: 'blue',
    typographyStyle: 'modern',
    layoutStyle: 'asymmetric',
    motionLevel: 'moderate'
  })

  const [customPrompt, setCustomPrompt] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState('')

  const assetTypes = [
    { value: 'hero', label: 'Hero Section', icon: Layout },
    { value: 'feature', label: 'Feature Card', icon: Layers },
    { value: 'dashboard', label: 'Dashboard UI', icon: Wand2 },
    { value: 'marketing', label: 'Marketing Graphic', icon: Eye },
    { value: 'component', label: 'Component', icon: Layers },
  ]

  const colors = [
    { value: 'yellow', label: 'Brand Yellow', hex: '#FFC107', role: 'Primary CTAs' },
    { value: 'blue', label: 'Brand Blue', hex: '#2196F3', role: 'Secondary Actions' },
    { value: 'gold', label: 'Accent Gold', hex: '#E8B506', role: 'Premium Highlights' },
  ]

  const generatePrompt = () => {
    const colorMap: Record<string, string> = {
      yellow: '#FFC107',
      blue: '#2196F3',
      gold: '#E8B506'
    }

    const sizeMap: Record<string, string> = {
      small: 'compact layout',
      medium: 'balanced layout',
      large: 'spacious layout'
    }

    const typographyMap: Record<string, string> = {
      modern: 'Poppins Bold headlines, Inter Regular body',
      classic: 'Poppins SemiBold, controlled leading',
      minimal: 'Inter only, reduced hierarchy'
    }

    const layoutMap: Record<string, string> = {
      asymmetric: 'purposeful asymmetry, offset layouts',
      centered: 'symmetrical composition, balanced elements',
      grid: 'CSS Grid system, structured layout'
    }

    const motionMap: Record<string, string> = {
      minimal: 'subtle transitions, basic interactions',
      moderate: 'spring physics, micro-animations',
      enhanced: 'perpetual animations, dynamic effects'
    }

    const assetPrompts: Record<string, string> = {
      hero: `Create a MediaBubble hero section with:
- ${sizeMap[assetConfig.size]} with ${assetConfig.orientation} orientation
- Strategic use of ${colorMap[brandConfig.primaryColor]} for primary CTA
- ${typographyMap[brandConfig.typographyStyle]} with proper hierarchy
- ${layoutMap[brandConfig.layoutStyle]} with generous whitespace
- ${motionMap[brandConfig.motionLevel]} for interactions
- Single primary action button with Brand Yellow background
- No filler text or scroll indicators
- Mobile-first responsive design`,

      feature: `Design MediaBubble feature cards with:
- ${sizeMap[assetConfig.size]} ${assetConfig.orientation} layout
- Generously rounded corners (12-16px)
- Soft 1px border (#E8E8E8) and diffused shadow
- ${colorMap[brandConfig.primaryColor]} accent for highlights
- ${typographyMap[brandConfig.typographyStyle]} for content
- ${layoutMap[brandConfig.layoutStyle]} for arrangement
- ${motionMap[brandConfig.motionLevel]} for hover states
- Consistent 16px padding and spacing`,

      dashboard: `Create MediaBubble dashboard interface with:
- ${sizeMap[assetConfig.size]} ${assetConfig.orientation} layout
- CSS Grid-based architecture
- ${colorMap[brandConfig.secondaryColor]} for secondary actions
- ${typographyMap[brandConfig.typographyStyle]} for text
- ${layoutMap[brandConfig.layoutStyle]} for content organization
- ${motionMap[brandConfig.motionLevel]} for data interactions
- High contrast for accessibility (WCAG 2.1 AA)
- Professional data visualization components`,

      marketing: `Generate MediaBubble marketing graphics with:
- ${sizeMap[assetConfig.size]} ${assetConfig.orientation} composition
- Premium aesthetic with balanced density
- Strategic ${colorMap[brandConfig.primaryColor]} highlights
- ${typographyMap[brandConfig.typographyStyle]} for messaging
- ${layoutMap[brandConfig.layoutStyle]} for visual flow
- ${motionMap[brandConfig.motionLevel]} for dynamic elements
- Professional imagery with strategic placement
- Brand-appropriate tone and messaging`,

      component: `Build MediaBubble ${assetConfig.type} components with:
- ${sizeMap[assetConfig.size]} ${assetConfig.orientation} dimensions
- Consistent styling with brand standards
- ${colorMap[brandConfig.primaryColor]} for primary interactions
- ${typographyMap[brandConfig.typographyStyle]} for labels
- ${layoutMap[brandConfig.layoutStyle]} for structure
- ${motionMap[brandConfig.motionLevel]} for user feedback
- Proper touch targets (minimum 44px)
- WCAG 2.1 AA compliance`
    }

    const prompt = `MediaBrand ${assetTypes.find(t => t.value === assetConfig.type)?.label} Prompt:

${assetPrompts[assetConfig.type]}

Brand Profile Constraints:
- Maximum 1 primary accent color
- No pure black (#000000) - use Charcoal (#333333)
- Poppins only for headlines, Inter for body text
- Maximum 65 characters per line
- CSS Grid preferred over Flexbox
- No overlapping elements or custom cursors
- 8px base spacing system
- Mobile-first responsive design`

    setGeneratedPrompt(prompt)
    onPromptGenerated(prompt)
  }

  useEffect(() => {
    if (assetConfig && brandConfig) {
      generatePrompt()
    }
  }, [assetConfig, brandConfig])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
  }

  const downloadPrompt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mediabubble-${assetConfig.type}-prompt.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const AssetTypeSelector = () => (
    <div>
      <h4 className="text-[13px] font-semibold text-[#333333] mb-3">Asset Type</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {assetTypes.map((type) => {
          const IconComponent = type.icon
          const isSelected = assetConfig.type === type.value
          return (
            <button
              key={type.value}
              onClick={() => setAssetConfig(prev => ({ ...prev, type: type.value as any }))}
              className={`p-3 rounded-lg border-2 transition-all text-start ${
                isSelected
                  ? 'border-[#FFC107] bg-[#FFC107]/[0.05] shadow-[0_2px_8px_rgba(255,193,7,0.1)]'
                  : 'border-[#E8E8E8] hover:border-[#2196F3] hover:bg-[#F5F5F5]'
              }`}
            >
              <div className="flex items-center gap-2">
                <IconComponent size={16} className={isSelected ? 'text-[#FFC107]' : 'text-[#9E9E9E]'} />
                <span className="text-[12px] font-medium text-[#333333]">{type.label}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )

  const BrandControls = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-[13px] font-semibold text-[#333333] mb-3">Primary Color</h4>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setBrandConfig(prev => ({ ...prev, primaryColor: color.value }))}
              className={`p-3 rounded-lg border-2 transition-all text-start ${
                brandConfig.primaryColor === color.value
                  ? 'border-[#FFC107] shadow-[0_2px_8px_rgba(255,193,7,0.1)]'
                  : 'border-[#E8E8E8] hover:border-[#2196F3]'
              }`}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border border-[#E8E8E8]" 
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <div className="text-[11px] font-medium text-[#333333]">{color.label}</div>
                  <div className="text-[10px] text-[#9E9E9E]">{color.role}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[13px] font-semibold text-[#333333] mb-3">Typography Style</h4>
        <div className="grid grid-cols-3 gap-2">
          {['modern', 'classic', 'minimal'].map((style) => (
            <button
              key={style}
              onClick={() => setBrandConfig(prev => ({ ...prev, typographyStyle: style as any }))}
              className={`p-3 rounded-lg border-2 transition-all text-start ${
                brandConfig.typographyStyle === style
                  ? 'border-[#FFC107] bg-[#FFC107]/[0.05]'
                  : 'border-[#E8E8E8] hover:border-[#2196F3] hover:bg-[#F5F5F5]'
              }`}
            >
              <div className="text-[11px] font-medium text-[#333333] capitalize">{style}</div>
              <div className="text-[10px] text-[#9E9E9E] mt-1">
                {style === 'modern' && 'Poppins Bold + Inter'}
                {style === 'classic' && 'Poppins SemiBold'}
                {style === 'minimal' && 'Inter only'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[13px] font-semibold text-[#333333] mb-3">Layout Style</h4>
        <div className="grid grid-cols-3 gap-2">
          {['asymmetric', 'centered', 'grid'].map((style) => (
            <button
              key={style}
              onClick={() => setBrandConfig(prev => ({ ...prev, layoutStyle: style as any }))}
              className={`p-3 rounded-lg border-2 transition-all text-start ${
                brandConfig.layoutStyle === style
                  ? 'border-[#FFC107] bg-[#FFC107]/[0.05]'
                  : 'border-[#E8E8E8] hover:border-[#2196F3] hover:bg-[#F5F5F5]'
              }`}
            >
              <div className="text-[11px] font-medium text-[#333333] capitalize">{style}</div>
              <div className="text-[10px] text-[#9E9E9E] mt-1">
                {style === 'asymmetric' && 'Offset layouts'}
                {style === 'centered' && 'Symmetrical'}
                {style === 'grid' && 'Structured'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const SizeDensityControls = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-[13px] font-semibold text-[#333333] mb-3">Size & Orientation</h4>
        <div className="grid grid-cols-2 gap-3">
          {['small', 'medium', 'large'].map((size) => (
            <button
              key={size}
              onClick={() => setAssetConfig(prev => ({ ...prev, size: size as any }))}
              className={`p-2 rounded-lg border-2 transition-all text-center ${
                assetConfig.size === size
                  ? 'border-[#FFC107] bg-[#FFC107]/[0.05]'
                  : 'border-[#E8E8E8] hover:border-[#2196F3] hover:bg-[#F5F5F5]'
              }`}
            >
              <div className="text-[11px] font-medium text-[#333333] capitalize">{size}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[13px] font-semibold text-[#333333] mb-3">Orientation</h4>
        <div className="grid grid-cols-3 gap-2">
          {['portrait', 'landscape', 'square'].map((orientation) => (
            <button
              key={orientation}
              onClick={() => setAssetConfig(prev => ({ ...prev, orientation: orientation as any }))}
              className={`p-2 rounded-lg border-2 transition-all text-center ${
                assetConfig.orientation === orientation
                  ? 'border-[#FFC107] bg-[#FFC107]/[0.05]'
                  : 'border-[#E8E8E8] hover:border-[#2196F3] hover:bg-[#F5F5F5]'
              }`}
            >
              <div className="text-[11px] font-medium text-[#333333] capitalize">{orientation}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[13px] font-semibold text-[#333333] mb-3">Content Density</h4>
        <div className="grid grid-cols-3 gap-2">
          {['low', 'medium', 'high'].map((density) => (
            <button
              key={density}
              onClick={() => setAssetConfig(prev => ({ ...prev, density: density as any }))}
              className={`p-2 rounded-lg border-2 transition-all text-center ${
                assetConfig.density === density
                  ? 'border-[#FFC107] bg-[#FFC107]/[0.05]'
                  : 'border-[#E8E8E8] hover:border-[#2196F3] hover:bg-[#F5F5F5]'
              }`}
            >
              <div className="text-[11px] font-medium text-[#333333] capitalize">{density}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AssetTypeSelector />
          <BrandControls />
        </div>
        <div>
          <SizeDensityControls />
        </div>
      </div>

      {/* Generated Prompt */}
      {generatedPrompt && (
        <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-[16px] font-bold text-[#333333]">Generated Prompt</h3>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2196F3] text-white text-[12px] font-medium hover:bg-[#1976D2] transition-colors"
              >
                <Copy size={14} />
                Copy
              </button>
              <button
                onClick={downloadPrompt}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#333333] text-[12px] font-medium hover:bg-[#E8E8E8] transition-colors"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
          <div className="bg-[#FAFAFA] border border-[#E8E8E8] rounded-lg p-4 font-mono text-[12px] text-[#333333] whitespace-pre-wrap max-h-96 overflow-y-auto">
            {generatedPrompt}
          </div>
        </div>
      )}

      {/* Custom Prompt Area */}
      <div className="bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl p-6">
        <h3 className="text-[16px] font-bold text-[#333333] mb-4">Custom Prompt Override</h3>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Enter your custom prompt here. Brand profile constraints will still be applied..."
          className="w-full h-32 p-3 border border-[#E8E8E8] rounded-lg font-mono text-[12px] text-[#333333] resize-none focus:outline-none focus:border-[#2196F3]"
        />
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => {
              const finalPrompt = customPrompt || generatedPrompt
              onPromptGenerated(finalPrompt)
            }}
            className="px-4 py-2 rounded-lg bg-[#FFC107] text-[#333333] text-[13px] font-medium hover:bg-[#FFB300] transition-colors"
          >
            Use Custom Prompt
          </button>
          <button
            onClick={() => setCustomPrompt('')}
            className="px-4 py-2 rounded-lg bg-[#F5F5F5] text-[#9E9E9E] text-[13px] font-medium hover:bg-[#E8E8E8] transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}