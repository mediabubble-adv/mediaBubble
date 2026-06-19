'use client'

import { Palette, MessageSquare, ArrowUpRight, Trash2, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { brandDNA } from '../lib/brand-dna'
import { presets, type Preset } from '../lib/templates'
import type { GeneratorConfig, SavedTemplate } from '../lib/types'

interface ContextPaneProps {
  config: GeneratorConfig
  onToggleColor: (cssVar: string) => void
  onApplyConfig: (config: GeneratorConfig) => void
  onNavigate: (section: string) => void
  savedTemplates: SavedTemplate[]
  onDeleteTemplate: (id: string) => void
}

const Heading = ({ icon: Icon, children, action }: {
  icon: typeof Palette
  children: React.ReactNode
  action?: React.ReactNode
}) => (
  <div className="flex items-center justify-between mb-2.5">
    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
      <Icon size={13} /> {children}
    </span>
    {action}
  </div>
)

export const ContextPane = ({
  config,
  onToggleColor,
  onApplyConfig,
  onNavigate,
  savedTemplates,
  onDeleteTemplate,
}: ContextPaneProps) => {
  const { t } = useI18n()

  const editLink = (section: string, label: string) => (
    <button
      type="button"
      onClick={() => onNavigate(section)}
      className="flex items-center gap-0.5 text-[11px] font-semibold text-brand-blue hover:underline"
    >
      {t(label, label)} <ArrowUpRight size={12} />
    </button>
  )

  return (
    <div className="space-y-6">
      {/* Brand DNA — colors */}
      <section>
        <Heading icon={Palette} action={editLink('colors', 'Edit')}>
          {t('Brand colors', 'Brand colors')}
        </Heading>
        <div className="grid grid-cols-2 gap-1.5">
          {brandDNA.colors.map((c) => {
            const on = config.colorEmphasis.includes(c.cssVar)
            return (
              <button
                key={c.cssVar}
                type="button"
                aria-pressed={on}
                onClick={() => onToggleColor(c.cssVar)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border text-start transition-all ${
                  on ? 'border-brand-blue bg-brand-blue/[0.06]' : 'border-brand-whisper-border hover:border-brand-blue/30'
                }`}
              >
                <span
                  className="w-4 h-4 rounded shrink-0 border border-black/10"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold text-brand-text truncate">{c.name}</span>
                  <span className="block text-[9px] font-mono text-brand-text-muted">{c.hex}</span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Brand DNA — voice */}
      <section>
        <Heading icon={MessageSquare} action={editLink('voice', 'Edit')}>
          {t('Voice & anti-values', 'Voice & anti-values')}
        </Heading>
        <div className="flex flex-wrap gap-1 mb-2">
          {brandDNA.voice.map((v) => (
            <span key={v} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-brand-blue/[0.08] text-brand-blue">
              {v}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {brandDNA.negatives.slice(0, 6).map((n) => (
            <span key={n} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-brand-error/[0.08] text-brand-error">
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* Presets */}
      <section>
        <Heading icon={Sparkles}>{t('Presets', 'Presets')}</Heading>
        <div className="space-y-1.5">
          {presets.map((p: Preset) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onApplyConfig(p.config)}
              className="w-full text-start px-3 py-2 rounded-lg border border-brand-whisper-border hover:border-brand-blue/30 transition-all"
            >
              <span className="block text-[12px] font-bold text-brand-text">{t(p.name, p.name)}</span>
              <span className="block text-[10.5px] text-brand-text-muted">{t(p.description, p.description)}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Saved templates */}
      {savedTemplates.length > 0 && (
        <section>
          <Heading icon={Sparkles}>{t('Saved templates', 'Saved templates')}</Heading>
          <div className="space-y-1.5">
            {savedTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-whisper-border"
              >
                <button
                  type="button"
                  onClick={() => onApplyConfig(tpl.config)}
                  className="flex-1 text-start text-[12px] font-bold text-brand-text hover:text-brand-blue truncate"
                >
                  {tpl.name}
                </button>
                <button
                  type="button"
                  aria-label={t('Delete template', 'Delete template')}
                  onClick={() => onDeleteTemplate(tpl.id)}
                  className="text-brand-text-muted hover:text-brand-error shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
