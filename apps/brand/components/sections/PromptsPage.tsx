'use client'

import { useState } from 'react'
import { Wand2, Copy, CheckCircle, AlertCircle, Info, Palette, Type, Layout, Layers } from 'lucide-react'
import { PageHero } from './PageHero'
import { PromptTemplateLibrary } from './PromptTemplateLibrary'
import { InteractivePromptBuilder } from './InteractivePromptBuilder'
import { UseCaseExamples } from './UseCaseExamples'
import { BrandDNAFoundation } from './BrandDNAFoundation'
import { PromptValidator } from './PromptValidator'
import { useI18n } from '@/lib/i18n/provider'

export const PromptsPage = () => {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState('foundation')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)

  const tabs = [
    { id: 'foundation', label: t('Brand Profile', 'Brand Profile'), icon: Info },
    { id: 'templates', label: t('Templates', 'Templates'), icon: Layers },
    { id: 'builder', label: t('Prompt Builder', 'Prompt Builder'), icon: Wand2 },
    { id: 'examples', label: t('Examples', 'Examples'), icon: Layout },
    { id: 'validator', label: t('Validator', 'Validator'), icon: CheckCircle },
  ]

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'foundation':
        return <BrandDNAFoundation onPromptGenerated={setGeneratedPrompt} />
      case 'templates':
        return <PromptTemplateLibrary onPromptGenerated={setGeneratedPrompt} />
      case 'builder':
        return <InteractivePromptBuilder onPromptGenerated={setGeneratedPrompt} />
      case 'examples':
        return <UseCaseExamples onPromptGenerated={setGeneratedPrompt} />
      case 'validator':
        return <PromptValidator prompt={generatedPrompt} />
      default:
        return <BrandDNAFoundation onPromptGenerated={setGeneratedPrompt} />
    }
  }

  return (
    <div>
      <PageHero
        icon={Wand2}
        kicker={t('AI Prompt Generator', 'AI Prompt Generator')}
        title={t('Prompts for AI Tools', 'Prompts for AI Tools')}
        titleHighlight={t('AI', 'AI')}
        description={t(
          'Write prompts that make AI tools produce MediaBubble-consistent output. Powered by your brand colors, fonts, voice, and layout rules.',
          'Write prompts that make AI tools produce MediaBubble-consistent output. Powered by your brand colors, fonts, voice, and layout rules.',
        )}
      />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto space-y-8">
      {/* Generated Prompt Display */}
      {generatedPrompt && (
        <div className="bg-brand-canvas border border-brand-whisper-border dark:border-brand-light-border rounded-xl p-6 animate-fade-in-up">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2196F3]/[0.1] flex items-center justify-center">
                <Type size={16} className="text-[#2196F3]" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-brand-text">{t('Your Prompt', 'Your Prompt')}</h3>
                <p className="text-[11px] text-brand-text-muted">
                  {t(
                    'Copy and paste into ChatGPT, Midjourney, DALL-E, or any AI tool',
                    'Copy and paste into ChatGPT, Midjourney, DALL-E, or any AI tool',
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={copyPromptToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2196F3] text-white text-[12px] font-medium hover:bg-[#1976D2] transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle size={14} />
                  {t('Copied!', 'Copied!')}
                </>
              ) : (
                <>
                  <Copy size={14} />
                  {t('Copy', 'Copy')}
                </>
              )}
            </button>
          </div>
          <div className="bg-[#FFFFFF] border border-brand-whisper-border dark:border-brand-light-border rounded-lg p-4 font-mono text-[12px] text-brand-text whitespace-pre-wrap">
            {generatedPrompt}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#FFFFFF] border border-brand-whisper-border dark:border-brand-light-border rounded-xl p-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#FFC107]/[0.1] text-brand-text shadow-[inset_0_0_0_1px_rgba(255,193,7,0.12)]'
                  : 'text-brand-text-muted hover:text-brand-text hover:bg-black/[0.02] dark:hover:bg-white/[0.04]'
              }`}
            >
              <IconComponent size={14} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="animate-fade-in-up">
        {renderContent()}
      </div>
    </div>
    </div>
  )
}