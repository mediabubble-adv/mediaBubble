'use client'

import { useState, useRef, useEffect } from 'react'
import { TreePine, Map, Info, BarChart3, Download, RotateCcw } from 'lucide-react'
import { PageHero } from './PageHero'
import { TaxonomyTree } from '../skill-tree/TaxonomyTree'
import { LearningPathView } from '../skill-tree/LearningPathView'
import { SkillTreeStats } from '../skill-tree/SkillTreeStats'
import { totalNodeCount, taxonomyTree } from '@/data/arabic-taxonomy'
import { exportAsMarkdown, exportAsJSON, downloadBlob } from '@/utils/taxonomy-export'
import { useProgress } from '@/utils/use-progress'

const tabs = [
  { id: 'taxonomy', label: 'Categories', labelAr: 'التصنيف', icon: TreePine },
  { id: 'paths', label: 'Learning Paths', labelAr: 'مسارات التعلم', icon: Map },
  { id: 'stats', label: 'Stats', labelAr: 'الإحصائيات', icon: BarChart3 },
  { id: 'about', label: 'About', labelAr: 'حول', icon: Info },
]

function TabContent({ activeTab, children }: { activeTab: string; children: React.ReactNode }) {
  const prevTab = useRef(activeTab)
  const [direction, setDirection] = useState<'in' | 'out'>('in')

  useEffect(() => {
    if (prevTab.current !== activeTab) {
      prevTab.current = activeTab
      setDirection('out')
      const t = setTimeout(() => {
        setDirection('in')
        setTimeout(() => setDirection('out'), 20)
      }, 150)
      return () => clearTimeout(t)
    }
  }, [activeTab])

  return (
    <div
      className={`transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        direction === 'out' ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
      }`}
    >
      {children}
    </div>
  )
}

export function SkillTreePage({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState('taxonomy')
  const [menuOpen, setMenuOpen] = useState(false)
  const { completedIds, toggle, reset, completed, totalLeaves, percent } = useProgress()

  const branchCount = taxonomyTree.length

  const heroStats = [
    { label: 'Individual Skills', value: String(totalNodeCount) },
    { label: 'Branches', value: String(branchCount) },
    { label: 'Learning Tracks', value: '15' },
    { label: 'Skill Levels', value: '4' },
  ]

  return (
    <div>
      <PageHero
        kicker="Arabic Proficiency"
        title="Skill Tree"
        titleHighlight="Skill"
        description="A complete map of Arabic language and cultural skills. Use it to plan learning paths and track your progress."
        stats={heroStats}
        onNavigate={onNavigate}
      />

      <div className="border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-[12px] font-medium border-b-2 transition-all shrink-0
                    ${isActive
                      ? 'border-[#FFC107] text-gray-900'
                      : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
                    }
                  `}
                >
                  <Icon size={14} />
                  {tab.label}
                  <span className="text-[10px] text-gray-400 font-normal hidden sm:inline">{tab.labelAr}</span>
                </button>
              )
            })}

            <div className="ms-auto flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-gray-400">
                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="tabular-nums">{completed}/{totalLeaves}</span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                  title="Export"
                >
                  <Download size={14} />
                </button>
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden min-w-[160px]">
                      <button
                        onClick={() => { downloadBlob(exportAsJSON(true), 'arabic-taxonomy.json', 'application/json'); setMenuOpen(false) }}
                        className="w-full text-left px-3 py-2 text-[11px] text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Export as JSON
                      </button>
                      <button
                        onClick={() => { downloadBlob(exportAsMarkdown(), 'arabic-taxonomy.md', 'text/markdown'); setMenuOpen(false) }}
                        className="w-full text-left px-3 py-2 text-[11px] text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Export as Markdown
                      </button>
                      <div className="border-t border-gray-50" />
                      <button
                        onClick={() => { reset(); setMenuOpen(false) }}
                        className="w-full text-left px-3 py-2 text-[11px] text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <RotateCcw size={11} />
                        Reset progress
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 lg:py-12">
        <TabContent activeTab={activeTab}>
          {activeTab === 'taxonomy' && (
            <TaxonomyTree
              completedIds={completedIds}
              onToggle={toggle}
            />
          )}
          {activeTab === 'paths' && <LearningPathView />}
          {activeTab === 'stats' && <SkillTreeStats completedIds={completedIds} />}
          {activeTab === 'about' && (
            <div className="max-w-3xl space-y-6">
              <div className="animate-fade-in-up">
                <h3 className="text-base font-semibold text-gray-900 mb-2">About This Skill Map</h3>
                <p className="text-[12px] leading-relaxed text-gray-600">
                  This Arabic language and cultural competency taxonomy was designed as a comprehensive framework
                  for MediaBubble's internal skill tracking, learning path planning, and proficiency assessment.
                  It covers 14 top-level branches spanning dialectal variations, religious and classical studies,
                  lexicography, cultural literacy, aesthetics, historical context, esoteric sciences,
                  core linguistics, literature, translation, computational Arabic, TAFL, manuscripts, and media.
                  The 15 learning tracks form a dependency tree with prerequisites.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Proficiency Scale</h3>
                <div className="space-y-2">
                  {[
                    { level: 'L1 — Novice', desc: 'Can recognize and recall basic concepts with guidance.' },
                    { level: 'L2 — Intermediate', desc: 'Can apply concepts in familiar contexts with some independence.' },
                    { level: 'L3 — Advanced', desc: 'Can analyze, compare, and apply concepts across varied contexts.' },
                    { level: 'L4 — Superior', desc: 'Can evaluate, synthesize, and teach concepts to others.' },
                    { level: 'L5 — Distinguished', desc: 'Can create new knowledge, critique existing frameworks, and lead in the domain.' },
                  ].map((s, i) => (
                    <div key={s.level} className="flex items-start gap-3 animate-fade-in-up-stagger" style={{ animationDelay: `${i * 0.04}s` }}>
                      <span className="text-[11px] font-semibold text-gray-900 w-32 shrink-0">{s.level}</span>
                      <span className="text-[11px] text-gray-600">{s.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Learning Path Model</h3>
                <p className="text-[12px] leading-relaxed text-gray-600">
                  The 15 learning tracks (A–O) form a dependency tree with prerequisites.
                  Track A (Foundational Linguistics) is the universal gateway. Persona-based sequences
                  recommend optimal track ordering for different learner goals. Each track node specifies
                  a required proficiency level that must be met before the node is considered complete.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Sources &amp; Methodology</h3>
                <p className="text-[12px] leading-relaxed text-gray-600">
                  The taxonomy was constructed by cross-referencing ACTFL Arabic proficiency guidelines,
                  CEFR Arabic descriptors, the American Association of Teachers of Arabic (AATA) standards,
                  classical Arabic pedagogical curricula (al-Ajurrūmiyya, Alfiyya Ibn Mālik), modern
                  university Arabic programs, and subject-matter expert input across linguistics,
                  Islamic studies, literature, translation studies, and computational linguistics.
                </p>
              </div>
            </div>
          )}
        </TabContent>
      </div>
    </div>
  )
}
