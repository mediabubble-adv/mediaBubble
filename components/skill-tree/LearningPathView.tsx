'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { ArrowRight, GraduationCap, User, BookOpen, ChevronDown, Map } from 'lucide-react'
import { learningTracks, getNodeById } from '@/data/arabic-taxonomy'
import type { Track } from '@/data/arabic-taxonomy'

const personaPaths: { id: string; name: string; tracks: string[] }[] = [
  { id: 'translator', name: 'Translator / Interpreter', tracks: ['A', 'B', 'G', 'J', 'F', 'I', 'C', 'E', 'K'] },
  { id: 'academic', name: 'Academic Researcher', tracks: ['A', 'C', 'D', 'E', 'F', 'M', 'N', 'O', 'J'] },
  { id: 'journalist', name: 'Journalist / Media Professional', tracks: ['A', 'B', 'I', 'G', 'K', 'N', 'F'] },
  { id: 'diplomat', name: 'Diplomat / Policy Analyst', tracks: ['A', 'B', 'N', 'I', 'G', 'K', 'C', 'E'] },
  { id: 'teacher', name: 'Arabic Teacher (TAFL)', tracks: ['A', 'B', 'H', 'G', 'F', 'K', 'J'] },
  { id: 'developer', name: 'NLP / Computational Linguist', tracks: ['A', 'J', 'B', 'G', 'M'] },
  { id: 'cultural', name: 'Cultural Heritage Specialist', tracks: ['A', 'N', 'F', 'L', 'M', 'K', 'O', 'C', 'D', 'E'] },
  { id: 'general', name: 'General Advanced Learner', tracks: ['A', 'B', 'N', 'K', 'F', 'C', 'I', 'L'] },
]

function CollapsibleSection({ expanded, children }: { expanded: boolean; children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [children])

  return (
    <div
      className="overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ maxHeight: expanded ? height : 0, opacity: expanded ? 1 : 0 }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  )
}

function TrackCard({ track, allTracks, index }: { track: Track; allTracks: Track[]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const unlockedTracks = track.tracksUnlocked
    .map(id => allTracks.find(t => t.id === id))
    .filter(Boolean) as Track[]

  return (
    <div
      className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-sm hover:border-gray-200 animate-fade-in-up-stagger"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3 group"
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white text-[11px] font-bold transition-transform duration-150 group-hover:scale-105"
          style={{ backgroundColor: track.color }}
        >
          {track.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-semibold text-gray-900 transition-colors group-hover:text-gray-700">{track.name}</span>
            <span className="text-[10px] text-gray-400">{track.nameAr}</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{track.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] text-gray-400">
              {track.nodes.length} nodes
            </span>
            {unlockedTracks.length > 0 && (
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <ArrowRight size={10} />
                Unlocks {unlockedTracks.map(t => t.id).join(', ')}
              </span>
            )}
          </div>
        </div>
        <div
          className="shrink-0 text-gray-300 mt-1 transition-transform duration-200"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronDown size={15} />
        </div>
      </button>

      <CollapsibleSection expanded={expanded}>
        <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-2">
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Nodes in this track</h4>
          <div className="space-y-1">
            {track.nodes.map(n => {
              const treeNode = getNodeById(n.id)
              return (
                <div key={n.id} className="flex items-center gap-2 text-[11px] py-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: track.color }}
                  />
                  <span className="text-gray-700">{n.label}</span>
                  <span className="text-[10px] text-gray-400 ml-auto">
                    Required: L{n.requiredLevel}
                  </span>
                </div>
              )
            })}
          </div>

          {unlockedTracks.length > 0 && (
            <>
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 pt-1">Unlocks</h4>
              <div className="flex flex-wrap gap-1.5">
                {unlockedTracks.map(t => (
                  <span
                    key={t.id}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white transition-transform duration-150 hover:scale-105"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.id}: {t.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </CollapsibleSection>
    </div>
  )
}

export function LearningPathView() {
  const [activePersona, setActivePersona] = useState<string | null>(null)
  const [showAllTracks, setShowAllTracks] = useState(true)

  const displayedTracks = useMemo(() => {
    if (showAllTracks) {
      return learningTracks
    }
    if (activePersona) {
      const persona = personaPaths.find(p => p.id === activePersona)
      if (!persona) return learningTracks
      return persona.tracks
        .map(id => learningTracks.find(t => t.id === id))
        .filter(Boolean) as Track[]
    }
    return learningTracks
  }, [showAllTracks, activePersona])

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 bg-blue-50 rounded-xl p-4 animate-fade-in-up">
        <GraduationCap size={20} className="text-blue-500 mt-0.5 shrink-0" />
        <div>
          <h3 className="text-[13px] font-semibold text-blue-900">How learning paths work</h3>
          <p className="text-[11px] leading-relaxed text-blue-800 mt-1">
            There are <strong>15 tracks (A–O)</strong>. Track A (Foundational Linguistics) is the gateway to all others.
            Each track node has a proficiency gate level (1–5). You must meet all prerequisite gates before
            a track is considered unlocked. Persona-based sequences show recommended track order for specific learner goals.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '0.04s' }}>
        <button
          onClick={() => { setShowAllTracks(true); setActivePersona(null) }}
          className={`text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 ${
            showAllTracks ? 'bg-gray-900 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Tracks
        </button>
        {personaPaths.map(p => (
          <button
            key={p.id}
            onClick={() => { setShowAllTracks(false); setActivePersona(p.id) }}
            className={`text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 flex items-center gap-1.5 ${
              activePersona === p.id ? 'bg-gray-900 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <User size={12} />
            {p.name}
          </button>
        ))}
      </div>

      {!showAllTracks && activePersona && (
        <div
          className="bg-amber-50 rounded-xl p-4 animate-fade-in-up"
          style={{ animationDelay: '0.06s' }}
        >
          <h3 className="text-[12px] font-semibold text-amber-900 flex items-center gap-2">
            <Map size={14} />
            Recommended Sequence: {personaPaths.find(p => p.id === activePersona)?.name}
          </h3>
          <p className="text-[11px] text-amber-800 mt-1">
            Complete tracks in order. Each track builds on the previous one.
            Track A is the universal prerequisite.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {displayedTracks.map((track, i) => (
          <TrackCard
            key={track.id}
            track={track}
            allTracks={learningTracks}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
