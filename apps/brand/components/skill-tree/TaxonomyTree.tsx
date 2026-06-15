'use client'

import { useState, useMemo } from 'react'
import { Search, X, Layers, Info } from 'lucide-react'
import { taxonomyTree, branchColors, countLeaves } from '@/lib/data/arabic-taxonomy'
import { SkillTreeNode } from './SkillTreeNode'
import { useDebounce } from '@mediabubble/shared/client'
import { fuzzyMatchAny, fuzzyScore } from '@/lib/utils/fuzzy-search'

interface TaxonomyTreeProps {
  completedIds?: Set<string>
  onToggle?: (id: string) => void
}

export function TaxonomyTree({ completedIds, onToggle }: TaxonomyTreeProps) {
  const [inputValue, setInputValue] = useState('')
  const [activeBranch, setActiveBranch] = useState<string | null>(null)

  const searchQuery = useDebounce(inputValue, 200)

  const totalLeaves = useMemo(() => countLeaves(taxonomyTree), [])
  const branchCount = taxonomyTree.length

  const filteredBranches = useMemo(() => {
    if (activeBranch) {
      return taxonomyTree.filter(b => b.id === activeBranch)
    }
    return taxonomyTree
  }, [activeBranch])

  const branchStats = useMemo(() => {
    return taxonomyTree.map(b => ({
      id: b.id,
      label: b.label,
      labelAr: b.labelAr,
      leafCount: countLeaves([b]),
    }))
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 animate-fade-in-up">
      <aside className="space-y-4">
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Branches</h3>
          <div className="space-y-0.5">
            <button
              onClick={() => setActiveBranch(null)}
              className={`
                w-full text-start px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-150 active:scale-[0.98]
                ${!activeBranch ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              <span className="flex items-center gap-2">
                <Layers size={13} />
                All Branches
                <span className="ms-auto text-[10px] text-gray-400 tabular-nums">{totalLeaves}</span>
              </span>
            </button>
            {branchStats.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActiveBranch(b.id)}
                className={`
                  w-full text-start px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-150 active:scale-[0.98] animate-fade-in-up-stagger
                  ${activeBranch === b.id ? 'text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}
                `}
                style={{
                  ...(activeBranch === b.id ? { backgroundColor: branchColors[b.id] ?? '#666' } : {}),
                  animationDelay: `${i * 0.03}s`,
                }}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: branchColors[b.id] ?? '#666' }}
                  />
                  <span className="truncate">{b.label}</span>
                  <span className="ml-auto text-[10px] tabular-nums" style={{ opacity: 0.7 }}>{b.leafCount}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-2">
            <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[11px] leading-relaxed text-blue-800">
              <strong className="text-blue-900">{totalLeaves}</strong> leaf skills across{' '}
              <strong className="text-blue-900">{branchCount}</strong> branches.
              Proficiency is rated L1 (Novice) through L5 (Distinguished).
            </p>
          </div>
        </div>
      </aside>

      <div className="space-y-4">
        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.04s' }}>
          <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Search skills across all branches..."
            className="w-full ps-9 pe-8 py-2.5 text-[13px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all bg-white"
          />
          {inputValue && (
            <button onClick={() => setInputValue('')} className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        <div
          className="bg-white border border-gray-100 rounded-xl overflow-hidden animate-fade-in-up"
          style={{ animationDelay: '0.06s' }}
        >
          <div className="max-h-[70vh] overflow-y-auto py-2 px-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {filteredBranches.map(branch => (
              <SkillTreeNode
                key={branch.id}
                node={branch}
                branchColor={branchColors[branch.id] ?? '#666'}
                searchQuery={searchQuery || undefined}
                depth={0}
                defaultExpanded={!!searchQuery}
                completedIds={completedIds}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
