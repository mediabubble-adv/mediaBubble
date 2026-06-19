import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface Stat {
  label: string
  value: string
}

interface PageHeroProps {
  kicker?: string
  title: string
  titleHighlight?: string
  description?: string
  showLogo?: boolean
  icon?: LucideIcon
  stats?: Stat[]
  statsTone?: 'dark' | 'yellow'
  onNavigate?: (id: string) => void
}

export function PageHero({
  kicker,
  title,
  titleHighlight,
  description,
  showLogo = false,
  icon: Icon,
  stats,
  statsTone = 'dark',
}: PageHeroProps) {
  const renderTitle = () => {
    if (!titleHighlight) {
      return <span className="text-white">{title}</span>
    }
    const highlightIndex = title.indexOf(titleHighlight)
    if (highlightIndex === -1) {
      return <span className="text-white">{title}</span>
    }
    const before = title.slice(0, highlightIndex)
    const after = title.slice(highlightIndex + titleHighlight.length)
    return (
      <>
        {before && <span className="text-white">{before}</span>}
        <span className="text-[#FFC107]">{titleHighlight}</span>
        {after && <span className="text-white">{after}</span>}
      </>
    )
  }

  return (
    <div className="bg-gradient-to-br from-[#0D0F12] via-[#07080A] to-[#040506] relative overflow-hidden border-b border-white/[0.08]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(33,150,243,0.15))_0%,_transparent_65%] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1 bg-[#FFC107] opacity-80" />
      <div className="px-10 sm:px-16 lg:ps-20 lg:pe-[60px] py-16 sm:py-24 max-w-[1400px] mx-auto relative z-10">
        <div className="flex items-start gap-10">
          {showLogo && (
            <>
              <img
                src="/assets/logo.svg"
                alt="MediaBubble"
                className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 dark:hidden"
              />
              <img
                src="/assets/Logo/mediaBubble_logo_horizontal_text_white.svg"
                alt="MediaBubble"
                className="hidden dark:block h-12 sm:h-16 w-auto max-w-[min(100%,280px)] sm:max-w-[320px] shrink-0"
              />
            </>
          )}
          {Icon && !showLogo && (
            <div className="shrink-0 pt-1">
              {React.createElement(Icon, { size: 40, className: 'text-[#FFC107]' })}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {kicker && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFC107] mb-4">{kicker}</p>
            )}
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight tracking-[-0.02em] mb-5">
              {renderTitle()}
            </h1>
            {description && (
              <p className="text-base text-white/70 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      {stats && stats.length > 0 && (
        <div className={statsTone === 'yellow' ? 'bg-[#FFC107]' : 'border-t border-white/[0.06]'}>
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-[1400px] mx-auto">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-6 lg:px-10 py-4 ${
                  statsTone === 'yellow'
                    ? `text-[#0D0F12]${i < stats.length - 1 ? ' border-e border-[#0D0F12]/15' : ''}`
                    : `${i < stats.length - 1 ? ' border-e border-white/[0.06]' : ''}`
                }`}
              >
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.12em] mb-1 ${
                    statsTone === 'yellow' ? 'text-[#0D0F12]/65' : 'text-white/35'
                  }`}
                >
                  {stat.label}
                </p>
                <p className={`text-base font-bold ${statsTone === 'yellow' ? 'text-[#0D0F12]' : 'text-white'}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}