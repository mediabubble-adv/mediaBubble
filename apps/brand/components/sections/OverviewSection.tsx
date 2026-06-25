import React, { useEffect } from 'react'
import { ArrowRight, BookOpen, Layers, MessageSquare, Package, Palette, Search, Square, Type } from 'lucide-react'
import { brand } from '../constants'
import { PageHero } from './PageHero'
import { BrandPageContent, BrandSectionHeading } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

export function OverviewHero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { t } = useI18n()

  return (
    <PageHero
      showLogo
      icon={BookOpen}
      kicker={t('overview.hero.kicker', 'Design System Hub')}
      title={t('brand.tagline', brand.tagline)}
      titleHighlight="brand"
      description={t(
        'overview.hero.description',
        'Start here to find the approved system first, then drill into components, patterns, and assets. The goal is speed, consistency, and fewer one-off decisions.',
      )}
      stats={[
        { label: t('overview.stats.foundations', 'Foundations'), value: t('overview.stats.foundationsValue', 'Color, type, RTL') },
        { label: t('overview.stats.components', 'Components'), value: t('overview.stats.componentsValue', 'Buttons, cards, inputs') },
        { label: t('overview.stats.patterns', 'Patterns'), value: t('overview.stats.patternsValue', 'Hero, tables, CTAs') },
        { label: t('overview.stats.assets', 'Assets'), value: t('overview.stats.assetsValue', 'Logos, downloads') },
      ]}
      statsTone="yellow"
    />
  )
}

export function OverviewBody({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { t } = useI18n()

  const quickActions = [
    {
      label: t('copyColor', 'Copy a Color'),
      desc: t('copyColorDesc', 'Jump to the palette and copy HEX values instantly.'),
      page: 'colors',
      shortcut: '⌘1',
    },
    {
      label: t('previewFont', 'Preview a Font'),
      desc: t('previewFontDesc', 'See Poppins, Inter, JetBrains Mono, and Cairo at every weight.'),
      page: 'typography',
      shortcut: '⌘2',
    },
    {
      label: t('buildFromComponent', 'Build from a Component'),
      desc: t('buildFromComponentDesc', 'Copy button, input, card, and badge code with all states included.'),
      page: 'components',
      shortcut: '⌘3',
    },
  ]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return
      const map: Record<string, string> = { '1': 'colors', '2': 'typography', '3': 'components' }
      const page = map[e.key]
      if (page) {
        e.preventDefault()
        onNavigate(page)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onNavigate])

  return (
    <BrandPageContent>
      <section className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <BrandSectionHeading icon={BookOpen} title={t('quickStartSteps', 'Start Here')} />
          <div className="text-xs font-mono text-brand-text-muted bg-brand-canvas dark:bg-black/20 border border-brand-whisper-border px-2.5 py-1 rounded-md self-start">
            System reference first
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            {
              id: 'logo',
              icon: Layers,
              title: t('nav.logo.label', 'Logo'),
              desc: t('nav.logo.desc', 'Mark, variants, clear space, and approved placements.'),
            },
            {
              id: 'colors',
              icon: Palette,
              title: t('nav.colors.label', 'Color'),
              desc: t('nav.colors.desc', 'Palette, semantic tokens, and theme behavior.'),
            },
            {
              id: 'components',
              icon: Square,
              title: t('nav.components.label', 'Components'),
              desc: t('nav.components.desc', 'Buttons, cards, inputs, and shared interface building blocks.'),
            },
            {
              id: 'typography',
              icon: Type,
              title: t('nav.typography.label', 'Typography'),
              desc: t('nav.typography.desc', 'Poppins, Inter, and Cairo with clear usage rules.'),
            },
            {
              id: 'assets',
              icon: Package,
              title: t('nav.assets.label', 'Assets'),
              desc: t('nav.assets.desc', 'Downloads, templates, and production-ready brand files.'),
            },
            {
              id: 'voice',
              icon: MessageSquare,
              title: t('nav.voice.label', 'Rules'),
              desc: t('nav.voice.desc', 'Tone, do and do not guidance, and Arabic usage notes.'),
            },
          ].map((card) => {
            const IconComp = card.icon
            return (
              <button
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="group text-start bg-brand-surface border border-brand-whisper-border rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/30"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-canvas border border-brand-whisper-border text-brand-blue transition-colors group-hover:border-brand-blue/30">
                    <IconComp size={18} />
                  </span>
                  <ArrowRight size={15} className="text-brand-text-muted transition-transform duration-150 group-hover:translate-x-0.5" />
                </div>
                <h3 className="font-display text-[15px] font-bold text-brand-text mb-1">{card.title}</h3>
                <p className="text-[12px] text-brand-text-secondary leading-relaxed">{card.desc}</p>
              </button>
            )
          })}
        </div>
      </section>

      <section className="mb-14">
        <BrandSectionHeading icon={Search} title={t('overview.search.title', 'Search and shortcuts')} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-brand-surface border border-brand-whisper-border rounded-xl p-5 sm:p-6">
            <p className="text-sm text-brand-text-secondary leading-relaxed mb-4 max-w-2xl">
              {t(
                'overview.search.body',
                'Search by item, token, or asset name. Use this when you know what you need and want the approved version fast.',
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.page}
                  onClick={() => onNavigate(action.page)}
                  className="rounded-lg border border-brand-whisper-border bg-brand-canvas px-4 py-4 text-start transition-all duration-150 hover:border-brand-blue/30 hover:-translate-y-0.5"
                >
                  <span className="block text-[11px] font-mono text-brand-text-muted mb-2">{action.shortcut}</span>
                  <span className="block text-[13px] font-semibold text-brand-text">{action.label}</span>
                  <span className="mt-1 block text-[11px] text-brand-text-secondary leading-relaxed">{action.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-brand-surface border border-brand-whisper-border rounded-xl p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue mb-3">
              {t('overview.legend.title', 'Read this first')}
            </p>
            <ul className="space-y-3 text-[12px] text-brand-text-secondary leading-relaxed">
              <li><span className="font-semibold text-brand-text">Canonical:</span> approved system rules and assets.</li>
              <li><span className="font-semibold text-brand-text">Illustrative:</span> examples that show usage, not new standards.</li>
              <li><span className="font-semibold text-brand-text">Searchable:</span> items, tokens, and files should be discoverable by name.</li>
              <li><span className="font-semibold text-brand-text">RTL-ready:</span> Arabic examples should appear in every relevant section.</li>
            </ul>
          </div>
        </div>
      </section>
    </BrandPageContent>
  )
}

export function OverviewSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div>
      <OverviewHero onNavigate={onNavigate} />
      <OverviewBody onNavigate={onNavigate} />
    </div>
  )
}
