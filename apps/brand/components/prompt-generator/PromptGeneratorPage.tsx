'use client'

import { useEffect, useMemo, useState } from 'react'
import { Wand2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { PageHero } from '../sections/PageHero'
import { ConfigPane } from './panes/ConfigPane'
import { PreviewPane } from './panes/PreviewPane'
import { ContextPane } from './panes/ContextPane'
import { brandDNA } from './lib/brand-dna'
import { compose } from './lib/prompt-composer'
import { validate } from './lib/validator'
import { defaultConfig } from './lib/templates'
import {
  decodeShare,
  deleteTemplate,
  loadTemplates,
  pushHistory,
  saveTemplate,
  storageAvailable as storageOk,
} from './lib/persistence'
import type { GeneratorConfig, SavedTemplate } from './lib/types'

interface PromptGeneratorPageProps {
  /** Navigate to another guidelines section (e.g. 'colors', 'voice'). */
  onNavigate?: (section: string) => void
}

export const PromptGeneratorPage = ({ onNavigate }: PromptGeneratorPageProps) => {
  const { t } = useI18n()
  const [config, setConfig] = useState<GeneratorConfig>(defaultConfig)
  const [templates, setTemplates] = useState<SavedTemplate[]>([])
  const [storageAvailable, setStorageAvailable] = useState(true)

  // Hydrate from a share link (if present) and load saved templates — client only.
  useEffect(() => {
    const fromShare = decodeShare(window.location.hash)
    if (fromShare) setConfig(fromShare)
    setTemplates(loadTemplates())
    setStorageAvailable(storageOk)
  }, [])

  // Derived — never stored, so no sync bugs.
  const prompt = useMemo(() => compose(config, brandDNA), [config])
  const validation = useMemo(() => validate(prompt), [prompt])

  const patch = (p: Partial<GeneratorConfig>) =>
    setConfig((prev) => ({ ...prev, ...p }))

  const toggleColor = (cssVar: string) =>
    setConfig((prev) => ({
      ...prev,
      colorEmphasis: prev.colorEmphasis.includes(cssVar)
        ? prev.colorEmphasis.filter((c) => c !== cssVar)
        : [...prev.colorEmphasis, cssVar],
    }))

  const handleSaveTemplate = (name: string) => {
    setTemplates(saveTemplate(name, config))
    setStorageAvailable(storageOk)
  }

  const handleDeleteTemplate = (id: string) =>
    setTemplates(deleteTemplate(id))

  const handleCopied = () => {
    pushHistory({ prompt, model: config.model, mode: config.mode })
  }

  return (
    <div>
      <PageHero
        icon={Wand2}
        kicker={t('AI Prompt Generator', 'AI Prompt Generator')}
        title={t('Brand Prompt Generator', 'Brand Prompt Generator')}
        titleHighlight={t('Prompt', 'Prompt')}
        description={t(
          'Configure image and video prompts that bake in MediaBubble colors, voice, and constraints — ready to paste into Midjourney, Flux, Runway, and more.',
          'Configure image and video prompts that bake in MediaBubble colors, voice, and constraints — ready to paste into Midjourney, Flux, Runway, and more.',
        )}
      />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_320px] gap-6">
          <ConfigPane config={config} onChange={patch} />
          <PreviewPane
            prompt={prompt}
            validation={validation}
            config={config}
            storageAvailable={storageAvailable}
            onSaveTemplate={handleSaveTemplate}
            onCopied={handleCopied}
          />
          <ContextPane
            config={config}
            onToggleColor={toggleColor}
            onApplyConfig={setConfig}
            onNavigate={onNavigate ?? (() => {})}
            savedTemplates={templates}
            onDeleteTemplate={handleDeleteTemplate}
          />
        </div>
      </div>
    </div>
  )
}
