'use client'

import * as React from 'react'
import { useState } from 'react'

export interface TabbedShowcaseTab {
  id: string
  label: string
  content: React.ReactNode
}

export interface TabbedShowcaseProps {
  tabs: TabbedShowcaseTab[]
  defaultTabId?: string
  className?: string
  'aria-label'?: string
}

export function TabbedShowcase({
  tabs,
  defaultTabId,
  className = '',
  'aria-label': ariaLabel = 'Showcase tabs',
}: TabbedShowcaseProps) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id ?? '')

  if (tabs.length === 0) {
    return null
  }

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0]

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-wrap gap-2 mb-6"
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeTab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className={[
                'rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
                selected
                  ? 'bg-brand-navy text-white dark:bg-brand-yellow dark:text-brand-navy'
                  : 'bg-brand-navy/[0.06] text-brand-navy dark:bg-white/10 dark:text-brand-off-white hover:bg-brand-navy/10',
              ].join(' ')}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeTab.id}`}
        aria-labelledby={`tab-${activeTab.id}`}
        className="rounded-2xl border border-brand-whisper-border dark:border-white/10 bg-brand-surface dark:bg-brand-navy/40 p-6"
      >
        {activeTab.content}
      </div>
    </div>
  )
}
