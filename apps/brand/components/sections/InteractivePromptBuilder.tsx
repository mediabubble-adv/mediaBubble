'use client'

import { useState, useEffect } from 'react'
import { Wand2, Palette, Type, Layout, Layers, Eye, Copy, Download, Monitor, Activity, TrendingUp, Sparkles, Check, ArrowRight } from 'lucide-react'

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
    primaryColor: 'blue',
    secondaryColor: 'yellow',
    typographyStyle: 'modern',
    layoutStyle: 'asymmetric',
    motionLevel: 'moderate'
  })

  const [customPrompt, setCustomPrompt] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)

  const assetTypes = [
    { value: 'hero', label: 'Hero Section', icon: Layout },
    { value: 'feature', label: 'Feature Card', icon: Layers },
    { value: 'dashboard', label: 'Dashboard UI', icon: Monitor },
    { value: 'marketing', label: 'Marketing Graphic', icon: Eye },
    { value: 'component', label: 'Component UI', icon: Activity },
  ]

  const brandColors = [
    { value: 'blue', label: 'Brand Blue', hex: '#2196F3', role: 'Primary & Interactive' },
    { value: 'dark-blue', label: 'Dark Blue', hex: '#1565C0', role: 'Depth & Sidebar' },
    { value: 'yellow', label: 'Brand Yellow', hex: '#FFC107', role: 'Primary CTAs & Active' },
    { value: 'mint', label: 'Mint', hex: '#1AD191', role: 'Premium Highlights' },
    { value: 'charcoal', label: 'Deep Charcoal', hex: '#0D0F12', role: 'Containers & Dark Base' },
  ]

  const generatePrompt = () => {
    const colorMap: Record<string, string> = {
      blue: '#2196F3',
      'dark-blue': '#1565C0',
      yellow: '#FFC107',
      mint: '#1AD191',
      charcoal: '#0D0F12'
    }

    const colorNameMap: Record<string, string> = {
      blue: 'Brand Blue (#2196F3)',
      'dark-blue': 'Dark Blue (#1565C0)',
      yellow: 'Brand Yellow (#FFC107)',
      mint: 'Mint (#1AD191)',
      charcoal: 'Deep Charcoal (#0D0F12)'
    }

    const sizeMap: Record<string, string> = {
      small: 'compact container (max-w-4xl)',
      medium: 'balanced container (max-w-6xl)',
      large: 'full-width layout (max-w-7xl/1400px)'
    }

    const typographyMap: Record<string, string> = {
      modern: 'Poppins Bold/Cairo Bold for headings, Inter for body/UI',
      classic: 'Poppins SemiBold/Cairo SemiBold, controlled leading and tracking-tight',
      minimal: 'Inter for all interfaces, typographic hierarchy by weight only'
    }

    const layoutMap: Record<string, string> = {
      asymmetric: 'asymmetric layout, left-aligned typography, staggered grid columns',
      centered: 'symmetrical centered layout with clean whitespace',
      grid: 'CSS Grid architecture with auto-fitting responsive columns'
    }

    const motionMap: Record<string, string> = {
      minimal: 'subtle CSS transitions (transform, opacity only)',
      moderate: 'spring physics transitions on hover, tactile scale-[0.98] clicks',
      enhanced: 'perpetual micro-interactions (pulse, slow floating, marquee) and layouts'
    }

    const assetPrompts: Record<string, string> = {
      hero: `Design a high-end Hero section with:
- Spacing: Strict 8px grid system, px-8 py-16 container
- Width: ${sizeMap[assetConfig.size]} with ${assetConfig.orientation} framing
- Layout: ${layoutMap[brandConfig.layoutStyle]} (avoiding standard centered hero copy if asymmetric)
- Typography: ${typographyMap[brandConfig.typographyStyle]}
- Colors: Primary accent is ${colorNameMap[brandConfig.primaryColor]}, with highlights of ${colorNameMap[brandConfig.secondaryColor]}
- CTA Button: Solid background of ${colorMap[brandConfig.primaryColor]}, rounded-lg, text-xs, active scale-95 feedback
- Secondary CTA: Outline button with hover overlay and scale transition
- Right Asset or Visual Background: Asymmetric shape collage, abstract geometric card frame, or graphic mask using desaturated highlights
- Constraints: No pure black (#000000), no generic user icons, no emojis. Highlight Cairo font for Arabic versions`,

      feature: `Design a group of Feature Cards with:
- Spacing: Gap-6 grid, p-8 inside cards, keeping sizes ${assetConfig.size}
- Layout: ${layoutMap[brandConfig.layoutStyle]} arrangement
- Border & Shadow: 1px border (#E8E8E8 or white/10), rounded-xl, desaturated light shadow
- Colors: Main highlights use ${colorNameMap[brandConfig.primaryColor]}, with accents in ${colorNameMap[brandConfig.secondaryColor]}
- Icon Box: Rounded-lg icon box matching the primary color, with 1.5px stroke icons
- Typography: ${typographyMap[brandConfig.typographyStyle]}
- State Transitions: hover:-translate-y-1 hover:shadow-md transition-all duration-300 active:scale-[0.98]`,

      dashboard: `Design a clean Dashboard interface with:
- Spacing: VISUAL_DENSITY: 8 (compact 8px padding, grid gap-4)
- Layout: Sidebar layout (240px wide sidebar) with CSS grid-based metrics cards
- Sidebar Color: Dark Blue (#1565C0) or Deep Charcoal (#0D0F12) background
- Primary Colors: Highlight states colored in ${colorNameMap[brandConfig.primaryColor]}
- Secondary Colors: Interactive elements colored in ${colorNameMap[brandConfig.secondaryColor]}
- Metrics: Monospace numbers (font-mono) for organic data values (e.g. 47.2%, +1,294)
- Typography: ${typographyMap[brandConfig.typographyStyle]}
- Visual: Mini CSS chart elements and tables with grid dividers rather than card borders`,

      marketing: `Create a Premium Marketing Graphic template with:
- Density: ${assetConfig.density} visual density
- Layout: Asymmetrical composition with bold typographic anchors
- Colors: Solid color fields in ${colorNameMap[brandConfig.primaryColor]} and text blocks accented in ${colorNameMap[brandConfig.secondaryColor]}
- Typography: Bold Display headings (Poppins/Cairo) at text-4xl leading-none
- Details: Tech tags (small code elements, 1px thin grid boundaries)
- Layout Style: ${layoutMap[brandConfig.layoutStyle]}`,

      component: `Build cohesive Component elements including:
- Button States: Solid, Outline, Ghost, and Destructive buttons, each showing hover and active:scale-95 states
- Text Inputs: Top labels, placeholder text, focus rings styled in ${colorNameMap[brandConfig.primaryColor]}
- Progress Bars: 8px height, rounded full indicator filled with ${colorMap[brandConfig.primaryColor]}
- Anatomy specs and spacing guides utilizing the 8px grid system`
    }

    const prompt = `MediaBubble Brand AI Prompt Generator:

[TASK]
${assetPrompts[assetConfig.type]}

[GLOBAL BRAND CONSTRAINTS - STRICT]
- No emojis anywhere in UI, code, or labels.
- Max 1 primary accent color. Accents desaturated to blend with Slate/Charcoal neutrals.
- Font stack: Cairo (Arabic & Bilingual), Poppins (English headlines), Inter (English body/UI), JetBrains Mono (Code/Numbers).
- Use CSS grid for structural alignment. Avoid percentage flexbox calculations.
- Layout spacing strictly uses 8px multipliers (4px, 8px, 16px, 24px, 32px, 48px).
- Mobile responsive fallback: Single-column full width on viewports < 768px.
- Interactive buttons must use active:scale-95 or active:-translate-y-0.5 tactile feedback.`

    setGeneratedPrompt(prompt)
    onPromptGenerated(prompt)
  }

  useEffect(() => {
    generatePrompt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetConfig, brandConfig])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

  // Live CSS Visual DNA Preview Component
  const VisualDNAPreview = () => {
    const colorMap: Record<string, string> = {
      blue: '#2196F3',
      'dark-blue': '#1565C0',
      yellow: '#FFC107',
      mint: '#1AD191',
      charcoal: '#0D0F12',
    }

    const pri = colorMap[brandConfig.primaryColor]
    const sec = colorMap[brandConfig.secondaryColor]

    const getPreviewStyle = () => {
      let fontClass = 'font-sans'
      if (brandConfig.typographyStyle === 'modern') fontClass = 'font-display'
      if (brandConfig.typographyStyle === 'classic') fontClass = 'font-display tracking-tight'

      let densityPadding = 'p-6'
      if (assetConfig.density === 'low') densityPadding = 'p-8'
      if (assetConfig.density === 'high') densityPadding = 'p-4'

      return { fontClass, densityPadding }
    }

    const { fontClass, densityPadding } = getPreviewStyle()

    return (
      <div className="w-full border border-brand-whisper-border rounded-xl bg-brand-surface overflow-hidden shadow-sm flex flex-col h-full">
        <div className="border-b border-brand-whisper-border px-5 py-3 flex items-center justify-between bg-brand-canvas dark:bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] font-mono text-brand-text-muted select-none ml-2">Visual DNA Preview</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-text-muted px-2 py-0.5 rounded bg-brand-canvas border border-brand-whisper-border">
            <span>{brandConfig.layoutStyle}</span>
            <span>&middot;</span>
            <span>{brandConfig.typographyStyle}</span>
          </div>
        </div>

        <div className="flex-1 bg-brand-canvas dark:bg-black/20 p-6 flex items-center justify-center min-h-[300px]">
          {/* Dynamic Render based on type */}
          {assetConfig.type === 'hero' && (
            <div className={`w-full bg-brand-surface border border-brand-whisper-border rounded-lg ${densityPadding} relative overflow-hidden transition-all duration-300`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 opacity-70">
                <div className="text-[12px] font-bold text-brand-text">mediaBubble</div>
                <div className="flex gap-4">
                  <div className="w-10 h-1.5 bg-brand-text-muted/20 rounded-full" />
                  <div className="w-10 h-1.5 bg-brand-text-muted/20 rounded-full" />
                  <div className="w-10 h-1.5 bg-brand-text-muted/20 rounded-full" />
                </div>
              </div>

              {/* Main Area */}
              <div className={`grid ${brandConfig.layoutStyle === 'centered' ? 'grid-cols-1 text-center' : 'grid-cols-1 md:grid-cols-12'} gap-6 items-center`}>
                <div className={brandConfig.layoutStyle === 'centered' ? 'mx-auto max-w-md' : 'md:col-span-7 space-y-4'}>
                  <h3 className={`${fontClass} text-2xl font-bold tracking-tight text-brand-text leading-tight`}>
                    Strategic creative that <span style={{ color: pri }}>fills rooms</span> and grows brands.
                  </h3>
                  <p className="text-xs text-brand-text-muted leading-relaxed max-w-[45ch]">
                    Hurghada based marketing agency built on creativity, guided by organic data.
                  </p>
                  <div className={`flex flex-wrap gap-3 mt-4 ${brandConfig.layoutStyle === 'centered' ? 'justify-center' : ''}`}>
                    <button 
                      className="px-4 py-2 text-[11px] font-bold rounded-lg text-[#0D0F12] transition-all duration-150 active:scale-95"
                      style={{ backgroundColor: pri }}
                    >
                      Grow Brand
                    </button>
                    <button 
                      className="px-4 py-2 text-[11px] font-bold rounded-lg border transition-all duration-150 active:scale-95"
                      style={{ borderColor: sec, color: sec }}
                    >
                      See Our Work
                    </button>
                  </div>
                </div>

                {brandConfig.layoutStyle !== 'centered' && (
                  <div className="md:col-span-5 h-24 bg-brand-canvas border border-brand-whisper-border rounded-lg relative overflow-hidden flex items-center justify-center">
                    {/* Visual Collage */}
                    <div className="absolute w-12 h-12 rounded-lg rotate-12 opacity-20 -right-2 -bottom-2" style={{ backgroundColor: pri }} />
                    <div className="absolute w-16 h-16 rounded-full -left-4 -top-4 opacity-10" style={{ backgroundColor: sec }} />
                    <div className="text-[10px] font-mono text-brand-text-muted uppercase tracking-wider">Asymmetric Asset</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {assetConfig.type === 'feature' && (
            <div className="w-full space-y-4">
              <div className={`grid ${brandConfig.layoutStyle === 'asymmetric' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
                <div className={`bg-brand-surface border border-brand-whisper-border rounded-xl ${densityPadding} hover:border-brand-blue/30 transition-all duration-300 relative`}>
                  <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: `${pri}15` }}>
                    <TrendingUp size={16} style={{ color: pri }} />
                  </div>
                  <h4 className={`${fontClass} text-[13px] font-bold text-brand-text mb-1.5`}>SEO Strategy</h4>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed">
                    Organic visibility optimization focusing on ROI.
                  </p>
                </div>

                <div className={`bg-brand-surface border border-brand-whisper-border rounded-xl ${densityPadding} hover:border-brand-blue/30 transition-all duration-300`}>
                  <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: `${sec}15` }}>
                    <Sparkles size={16} style={{ color: sec }} />
                  </div>
                  <h4 className={`${fontClass} text-[13px] font-bold text-brand-text mb-1.5`}>Creative Branding</h4>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed">
                    Unique logo systems and modern typography rules.
                  </p>
                </div>

                {brandConfig.layoutStyle === 'asymmetric' && (
                  <div className={`bg-brand-surface border border-brand-whisper-border rounded-xl ${densityPadding} hover:border-brand-blue/30 transition-all duration-300 md:col-span-1`} style={{ borderColor: `${pri}40` }}>
                    <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center bg-emerald-500/10">
                      <Check size={16} className="text-emerald-500" />
                    </div>
                    <h4 className={`${fontClass} text-[13px] font-bold text-brand-text mb-1.5`}>Paid Ads</h4>
                    <p className="text-[11px] text-brand-text-muted leading-relaxed">
                      Strategic campaigns scaled with dynamic targets.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {assetConfig.type === 'dashboard' && (
            <div className="w-full bg-[#0D0F12] border border-[#1F2128] rounded-xl overflow-hidden shadow-2xl text-white/95 text-xs flex h-52">
              {/* Sidebar */}
              <div className="w-20 border-e border-[#1F2128] p-3 flex flex-col justify-between shrink-0 bg-[#07080A]">
                <div className="space-y-3">
                  <div className="w-5 h-5 rounded bg-[#FFC107] flex items-center justify-center text-[10px] text-black font-bold font-mono">mB</div>
                  <div className="space-y-2 pt-2">
                    <div className="w-12 h-2 rounded bg-white/10" />
                    <div className="w-10 h-2 rounded bg-white/5" />
                    <div className="w-14 h-2 rounded bg-white/5" />
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/10" />
              </div>

              {/* Main Board */}
              <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-[#1F2128]">
                  <div className="w-24 h-3 rounded bg-white/10" />
                  <div className="w-12 h-4 rounded-md" style={{ backgroundColor: `${pri}25`, border: `1px solid ${pri}40` }} />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/[0.02] border border-[#1F2128] rounded-lg p-3 space-y-2">
                    <div className="w-10 h-1.5 bg-white/30 rounded" />
                    <div className="font-mono text-[14px] font-bold" style={{ color: pri }}>47.2%</div>
                  </div>
                  <div className="bg-white/[0.02] border border-[#1F2128] rounded-lg p-3 space-y-2">
                    <div className="w-10 h-1.5 bg-white/30 rounded" />
                    <div className="font-mono text-[14px] font-bold" style={{ color: sec }}>+1,294</div>
                  </div>
                  <div className="bg-white/[0.02] border border-[#1F2128] rounded-lg p-3 space-y-2">
                    <div className="w-12 h-1.5 bg-white/30 rounded" />
                    <div className="font-mono text-[14px] font-bold text-emerald-400">99.8%</div>
                  </div>
                </div>

                {/* Micro Chart lines */}
                <div className="flex-1 bg-white/[0.01] border border-[#1F2128] rounded-lg p-2 flex items-end justify-between gap-1">
                  <div className="w-full bg-white/10 rounded-t h-[40%]" />
                  <div className="w-full bg-white/10 rounded-t h-[60%]" />
                  <div className="w-full rounded-t h-[80%]" style={{ backgroundColor: pri }} />
                  <div className="w-full bg-white/10 rounded-t h-[50%]" />
                  <div className="w-full rounded-t h-[90%]" style={{ backgroundColor: sec }} />
                </div>
              </div>
            </div>
          )}

          {assetConfig.type === 'marketing' && (
            <div className="w-full bg-brand-surface border border-brand-whisper-border rounded-xl p-6 relative overflow-hidden flex flex-col justify-between h-52">
              {/* Tech boundary indicator */}
              <div className="absolute top-0 right-0 border-b border-l border-brand-whisper-border px-2 py-0.5 font-mono text-[8px] text-brand-text-muted">
                REF: MB-2026
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: `${pri}15`, color: pri }}>
                  Branding System
                </span>
                <h3 className={`${fontClass} text-2xl font-bold leading-none text-brand-text max-w-xs`}>
                  Strategic Creative Excellence.
                </h3>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5 text-[10px] text-brand-text-muted font-mono">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sec }} />
                  HURGHADA &middot; EGYPT
                </div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: pri }}>
                  <ArrowRight size={10} />
                </div>
              </div>
            </div>
          )}

          {assetConfig.type === 'component' && (
            <div className="w-full bg-brand-surface border border-brand-whisper-border rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Custom Button State */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-brand-text-muted uppercase">Interactive CTA</label>
                  <button 
                    className="w-full py-2 text-xs font-bold rounded-lg text-white shadow-sm transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
                    style={{ backgroundColor: pri }}
                  >
                    <span>Press Button</span>
                  </button>
                </div>

                {/* Custom Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-brand-text-muted uppercase">Text Input Focus</label>
                  <input 
                    type="text" 
                    value="Cairo display font" 
                    readOnly
                    style={{ outlineColor: pri }}
                    className="w-full px-3 py-1.5 text-xs border border-brand-whisper-border rounded-lg bg-brand-canvas focus:outline focus:outline-2"
                  />
                </div>
              </div>

              {/* Progress indicator */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-bold text-brand-text-muted uppercase">
                  <span>Task Progress</span>
                  <span className="font-mono text-brand-text">78%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-brand-canvas overflow-hidden border border-brand-whisper-border">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: '78%', backgroundColor: pri }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Configuration Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-brand-text-muted mb-3">Asset Type</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {assetTypes.map((type) => {
              const IconComponent = type.icon
              const isSelected = assetConfig.type === type.value
              return (
                <button
                  key={type.value}
                  onClick={() => setAssetConfig(prev => ({ ...prev, type: type.value as any }))}
                  className={`p-3 rounded-xl border transition-all duration-200 text-start flex flex-col justify-between h-20 active:scale-95 ${
                    isSelected
                      ? 'border-[#FFC107] bg-[#FFC107]/[0.05] shadow-[0_2px_8px_rgba(255,193,7,0.1)]'
                      : 'border-brand-whisper-border hover:border-[#2196F3] bg-brand-surface'
                  }`}
                >
                  <IconComponent size={18} className={isSelected ? 'text-[#FFC107]' : 'text-brand-text-muted'} />
                  <span className="text-[12px] font-semibold text-brand-text">{type.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t border-brand-whisper-border pt-5 space-y-4">
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-brand-text-muted mb-3">Primary Accent</h4>
            <div className="grid grid-cols-2 gap-2">
              {brandColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setBrandConfig(prev => ({ ...prev, primaryColor: color.value }))}
                  className={`p-2.5 rounded-xl border transition-all duration-200 text-start flex items-center gap-3 bg-brand-surface active:scale-95 ${
                    brandConfig.primaryColor === color.value
                      ? 'border-[#FFC107] shadow-[0_2px_8px_rgba(255,193,7,0.1)]'
                      : 'border-brand-whisper-border hover:border-[#2196F3]'
                  }`}
                >
                  <div 
                    className="w-3.5 h-3.5 rounded-full border border-brand-whisper-border shrink-0" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-brand-text truncate">{color.label}</div>
                    <div className="text-[9px] text-brand-text-muted truncate">{color.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-brand-text-muted mb-3">Secondary Accent</h4>
            <div className="grid grid-cols-2 gap-2">
              {brandColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setBrandConfig(prev => ({ ...prev, secondaryColor: color.value }))}
                  className={`p-2.5 rounded-xl border transition-all duration-200 text-start flex items-center gap-3 bg-brand-surface active:scale-95 ${
                    brandConfig.secondaryColor === color.value
                      ? 'border-[#FFC107] shadow-[0_2px_8px_rgba(255,193,7,0.1)]'
                      : 'border-brand-whisper-border hover:border-[#2196F3]'
                  }`}
                >
                  <div 
                    className="w-3.5 h-3.5 rounded-full border border-brand-whisper-border shrink-0" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-brand-text truncate">{color.label}</div>
                    <div className="text-[9px] text-brand-text-muted truncate">{color.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-brand-whisper-border pt-5 space-y-4">
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-brand-text-muted mb-3">Typography System</h4>
            <div className="grid grid-cols-3 gap-2">
              {['modern', 'classic', 'minimal'].map((style) => (
                <button
                  key={style}
                  onClick={() => setBrandConfig(prev => ({ ...prev, typographyStyle: style as any }))}
                  className={`p-3 rounded-xl border transition-all text-start bg-brand-surface active:scale-95 ${
                    brandConfig.typographyStyle === style
                      ? 'border-[#FFC107] bg-[#FFC107]/[0.02]'
                      : 'border-brand-whisper-border hover:border-[#2196F3]'
                  }`}
                >
                  <div className="text-[11px] font-bold text-brand-text capitalize">{style}</div>
                  <div className="text-[9px] text-brand-text-muted mt-1 leading-tight">
                    {style === 'modern' && 'Poppins/Cairo Bold'}
                    {style === 'classic' && 'SemiBold scale'}
                    {style === 'minimal' && 'Inter UI base'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-brand-text-muted mb-3">Layout Grid Style</h4>
            <div className="grid grid-cols-3 gap-2">
              {['asymmetric', 'centered', 'grid'].map((style) => (
                <button
                  key={style}
                  onClick={() => setBrandConfig(prev => ({ ...prev, layoutStyle: style as any }))}
                  className={`p-3 rounded-xl border transition-all text-start bg-brand-surface active:scale-95 ${
                    brandConfig.layoutStyle === style
                      ? 'border-[#FFC107] bg-[#FFC107]/[0.02]'
                      : 'border-brand-whisper-border hover:border-[#2196F3]'
                  }`}
                >
                  <div className="text-[11px] font-bold text-brand-text capitalize">{style}</div>
                  <div className="text-[9px] text-brand-text-muted mt-1 leading-tight">
                    {style === 'asymmetric' && 'Offset layouts'}
                    {style === 'centered' && 'Symmetric clean'}
                    {style === 'grid' && 'Auto CSS columns'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-brand-text-muted mb-3">Layout Constraints</h4>
            <div className="grid grid-cols-3 gap-2">
              {/* Density options */}
              {['low', 'medium', 'high'].map((density) => (
                <button
                  key={density}
                  onClick={() => setAssetConfig(prev => ({ ...prev, density: density as any }))}
                  className={`p-2.5 rounded-xl border transition-all text-center bg-brand-surface active:scale-95 ${
                    assetConfig.density === density
                      ? 'border-[#FFC107] bg-[#FFC107]/[0.02]'
                      : 'border-brand-whisper-border hover:border-[#2196F3]'
                  }`}
                >
                  <div className="text-[11px] font-bold text-brand-text capitalize">{density}</div>
                  <div className="text-[9px] text-brand-text-muted mt-0.5">Density</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Output Panel and Preview */}
      <div className="lg:col-span-7 space-y-6">
        <VisualDNAPreview />

        {/* Generated Prompt */}
        {generatedPrompt && (
          <div className="bg-brand-surface border border-brand-whisper-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-[14px] font-bold text-brand-text">Generated Agent Prompt</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2196F3] text-white text-[11px] font-bold hover:bg-[#1976D2] active:scale-95 transition-all"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={downloadPrompt}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-canvas dark:bg-white/[0.04] text-brand-text text-[11px] font-bold hover:bg-[#E8E8E8] dark:hover:bg-white/10 active:scale-95 transition-all border border-brand-whisper-border"
                >
                  <Download size={13} />
                  Download
                </button>
              </div>
            </div>
            <div className="bg-brand-canvas border border-brand-whisper-border rounded-lg p-4 font-mono text-[11px] text-brand-text whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
              {generatedPrompt}
            </div>
          </div>
        )}

        {/* Custom Prompt Area */}
        <div className="bg-brand-canvas border border-brand-whisper-border rounded-xl p-5">
          <h3 className="text-[14px] font-bold text-brand-text mb-3">Custom Prompt Override</h3>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Enter custom specifications. Brand constraints will still be appended automatically..."
            className="w-full h-24 p-3 border border-[#E8E8E8] dark:border-white/10 rounded-lg font-mono text-[11px] text-brand-text bg-brand-surface resize-none focus:outline-none focus:border-[#2196F3]"
          />
          <div className="flex gap-2.5 mt-3">
            <button
              onClick={() => {
                const finalPrompt = customPrompt || generatedPrompt
                onPromptGenerated(finalPrompt)
              }}
              className="px-4 py-2 rounded-lg bg-[#FFC107] text-[#0D0F12] text-[12px] font-bold hover:bg-[#FFB300] active:scale-95 transition-all shadow-sm"
            >
              Use Custom Prompt
            </button>
            <button
              onClick={() => setCustomPrompt('')}
              className="px-4 py-2 rounded-lg bg-brand-surface text-brand-text-muted text-[12px] font-bold hover:text-brand-text active:scale-95 transition-all border border-brand-whisper-border"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}