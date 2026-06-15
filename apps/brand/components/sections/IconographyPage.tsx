import React from 'react'
import { Home, Search, Menu, ChevronRight, ArrowRight, Settings, Plus, Edit3, Trash2, Download, Copy, Send, Check, X, AlertCircle, Bell, Star, Heart, User, Mail, Bookmark, Package, Filter, Layers, Shapes } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'

export function IconographyPage() {
  const { t } = useI18n()

  const iconCategories = [
    {
      name: t('Navigation', 'Navigation'),
      color: '#2196F3',
      icons: [
        { name: 'Home', Icon: Home },
        { name: 'Search', Icon: Search },
        { name: 'Menu', Icon: Menu },
        { name: 'ChevronRight', Icon: ChevronRight },
        { name: 'ArrowRight', Icon: ArrowRight },
        { name: 'Settings', Icon: Settings },
      ],
    },
    {
      name: t('Actions', 'Actions'),
      color: '#1565C0',
      icons: [
        { name: 'Plus', Icon: Plus },
        { name: 'Edit', Icon: Edit3 },
        { name: 'Trash', Icon: Trash2 },
        { name: 'Download', Icon: Download },
        { name: 'Copy', Icon: Copy },
        { name: 'Send', Icon: Send },
      ],
    },
    {
      name: t('Status', 'Status'),
      color: '#FFC107',
      icons: [
        { name: 'Check', Icon: Check },
        { name: 'X', Icon: X },
        { name: 'Alert', Icon: AlertCircle },
        { name: 'Bell', Icon: Bell },
        { name: 'Star', Icon: Star },
        { name: 'Heart', Icon: Heart },
      ],
    },
    {
      name: t('Content', 'Content'),
      color: '#9E9E9E',
      icons: [
        { name: 'User', Icon: User },
        { name: 'Mail', Icon: Mail },
        { name: 'Bookmark', Icon: Bookmark },
        { name: 'Package', Icon: Package },
        { name: 'Filter', Icon: Filter },
        { name: 'Layers', Icon: Layers },
      ],
    },
  ]

  const sizeSteps = [
    { px: 16, use: t('Inline with text, dense UI labels', 'Inline with text, dense UI labels'), label: t('Small', 'Small') },
    { px: 20, use: t('Navigation items, button icons, badges', 'Navigation items, button icons, badges'), label: t('Base', 'Base') },
    { px: 24, use: t('Default — most UI contexts and cards', 'Default — most UI contexts and cards'), label: t('Default', 'Default') },
    { px: 32, use: t('Empty states, illustration accents', 'Empty states, illustration accents'), label: t('Large', 'Large') },
  ]

  return (
    <div>
      <PageHero icon={Shapes} kicker={t('Visual System', 'Visual System')} title={t('Iconography', 'Iconography')} titleHighlight={t('Iconography', 'Iconography')} description={t('Lucide React throughout: 24px default grid, 1.5px stroke weight, consistent optical centering. One library, one visual grammar, every screen.', 'Lucide React throughout: 24px default grid, 1.5px stroke weight, consistent optical centering. One library, one visual grammar, every screen.')} />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">
      {/* System card */}
      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Icon System', 'Icon System')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E8E8E8] rounded-xl overflow-hidden">
          {[
            { label: t('Library', 'Library'), value: t('Lucide React', 'Lucide React') },
            { label: t('Default size', 'Default size'), value: t('24px', '24px') },
            { label: t('Stroke weight', 'Stroke weight'), value: t('1.5px', '1.5px') },
            { label: t('Style', 'Style'), value: t('Outline, rounded caps', 'Outline, rounded caps') },
          ].map((spec) => (
            <div key={spec.label} className="bg-brand-surface px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-text-muted">{spec.label}</p>
              <p className="text-[14px] font-semibold text-brand-dark-blue mt-1">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Size scale */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Size Scale', 'Size Scale')}</h2>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border divide-y divide-brand-whisper-border">
          {sizeSteps.map((step) => (
            <div key={step.px} className="flex items-center gap-5 px-6 py-4 transition-all hover:bg-black/[0.015]">
              <div className="w-14 flex items-center justify-center shrink-0">
                <Settings size={step.px} strokeWidth={1.5} className="text-[#2196F3]" />
              </div>
              <div className="w-20 shrink-0">
                <p className="text-[13px] font-semibold text-brand-text">{step.px}px</p>
                <p className="text-[10px] font-mono text-brand-text-muted">{step.label}</p>
              </div>
              <p className="flex-1 text-sm text-brand-text-secondary">{step.use}</p>
              <code className="text-[10px] font-mono text-brand-text-muted hidden sm:block">size={`{${step.px}}`} strokeWidth={'{1.5}'}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Category grid */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="7.5" cy="7.5" r="1.5" fill="#2196F3"/><circle cx="16.5" cy="7.5" r="1.5" fill="#2196F3"/><circle cx="7.5" cy="16.5" r="1.5" fill="#2196F3"/><circle cx="16.5" cy="16.5" r="1.5" fill="#2196F3"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Icon Categories', 'Icon Categories')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {iconCategories.map((cat) => (
            <div
              key={cat.name}
              className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden transition-colors duration-150 hover:bg-black/[0.02] dark:hover:bg-white/[0.04]"
              style={{ borderTopColor: cat.color, borderTopWidth: '3px' }}
            >
              <div className="px-5 py-3.5 border-b border-[#F5F5F5]">
                <p className="text-[13px] font-semibold" style={{ color: cat.color }}>{cat.name}</p>
              </div>
              <div className="p-5 grid grid-cols-6 gap-3">
                {cat.icons.map(({ name, Icon }) => (
                  <div key={name} className="flex flex-col items-center gap-1.5 group cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-brand-canvas dark:bg-white/[0.04] group-hover:bg-[#E3F2FD] flex items-center justify-center transition-colors duration-150">
                      <Icon size={18} strokeWidth={1.5} className="text-brand-text-secondary group-hover:text-[#2196F3] transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono text-brand-text-muted text-center leading-tight">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Color rules do/don't */}
      <section className="mb-8">
        <div className="bg-brand-info-bg dark:bg-brand-navy/30 rounded-lg px-4 py-2.5 mb-5">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Color Rules', 'Color Rules')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E8E8E8] rounded-xl overflow-hidden">
          <div className="bg-brand-canvas px-5 py-4">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-[18px] h-[18px] rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
                <X size={9} className="text-[#DC2626]" strokeWidth={3} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#DC2626]/60">{t('Avoid', 'Avoid')}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-[11px] text-brand-muted-steel">
                <Star size={18} strokeWidth={1.5} style={{ color: '#FF00FF' }} /> {t('Arbitrary color', 'Arbitrary color')}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-brand-muted-steel">
                <Bell size={18} strokeWidth={1.5} style={{ color: '#FF6600' }} /> {t('Decoration-only tint', 'Decoration-only tint')}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-brand-muted-steel">
                <Settings size={18} strokeWidth={3} className="text-[#333]" /> {t('Wrong stroke weight', 'Wrong stroke weight')}
              </div>
            </div>
          </div>
          <div className="bg-brand-surface px-5 py-4">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-[18px] h-[18px] rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                <Check size={9} className="text-[#16A34A]" strokeWidth={3} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#16A34A]/60">{t('Correct', 'Correct')}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-[11px] text-brand-text">
                <Star size={18} strokeWidth={1.5} className="text-[#FFC107]" /> {t('Accent = yellow', 'Accent = yellow')}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-brand-text">
                <Bell size={18} strokeWidth={1.5} className="text-[#2196F3]" /> {t('Active = blue', 'Active = blue')}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-brand-text">
                <Settings size={18} strokeWidth={1.5} className="text-brand-text-muted" /> {t('Muted = steel', 'Muted = steel')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage rules */}
      <section className="mb-16">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Usage Rules', 'Usage Rules')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { rule: t('Consistent stroke', 'Consistent stroke'), detail: t('Always 1.5px strokeWidth. Never mix with filled icons or outline-only variants from other libraries.', 'Always 1.5px strokeWidth. Never mix with filled icons or outline-only variants from other libraries.') },
            { rule: t('Color from context', 'Color from context'), detail: t('Icons inherit text color. Use color for state (blue = active, yellow = accent), not arbitrary decoration.', 'Icons inherit text color. Use color for state (blue = active, yellow = accent), not arbitrary decoration.') },
            { rule: t('Optical alignment', 'Optical alignment'), detail: t('Align icons to the optical center of adjacent text, not the bounding box. A 1–2px offset is common at 16px.', 'Align icons to the optical center of adjacent text, not the bounding box. A 1–2px offset is common at 16px.') },
            { rule: t('Label pairings', 'Label pairings'), detail: t('Navigation icons always have a text label. Icon-only is permitted only in toolbars with persistent tooltips on hover.', 'Navigation icons always have a text label. Icon-only is permitted only in toolbars with persistent tooltips on hover.') },
            { rule: t('No library mixing', 'No library mixing'), detail: t('Do not combine Lucide with Heroicons, FontAwesome, or Feather. Different optical weights break consistency.', 'Do not combine Lucide with Heroicons, FontAwesome, or Feather. Different optical weights break consistency.') },
            { rule: t('Minimum contrast', 'Minimum contrast'), detail: t('Icons on color backgrounds need 3:1 minimum. Muted steel (#9E9E9E) is for supporting context only, not primary icons.', 'Icons on color backgrounds need 3:1 minimum. Muted steel (#9E9E9E) is for supporting context only, not primary icons.') },
          ].map((r) => (
            <div key={r.rule} className="bg-brand-canvas dark:bg-white/[0.04] rounded-xl p-5">
              <p className="text-[13px] font-semibold text-brand-dark-blue mb-2">{r.rule}</p>
              <p className="text-sm text-brand-text-secondary leading-relaxed">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}
