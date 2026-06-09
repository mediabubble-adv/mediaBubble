'use client'

import { useMemo } from 'react'
import { CheckCircle, Circle, TrendingUp, BarChart3, Layers, Hash, Target, Award } from 'lucide-react'
import { taxonomyTree, branchColors, countLeaves, getLeafIds, getAllBranchLeafCounts } from '@/data/arabic-taxonomy'

interface SkillTreeStatsProps {
  completedIds: Set<string>
}

export function SkillTreeStats({ completedIds }: SkillTreeStatsProps) {
  const stats = useMemo(() => {
    const totalLeaves = countLeaves(taxonomyTree)
    const completed = completedIds.size
    const percent = totalLeaves > 0 ? Math.round((completed / totalLeaves) * 100) : 0

    const branchStats = getAllBranchLeafCounts().map(b => {
      const branchLeaves = getLeafIds(taxonomyTree.filter(n => n.id === b.id))
      const branchCompleted = branchLeaves.filter(id => completedIds.has(id)).length
      const branchPercent = branchLeaves.length > 0 ? Math.round((branchCompleted / branchLeaves.length) * 100) : 0
      return { ...b, total: branchLeaves.length, completed: branchCompleted, percent: branchPercent }
    })

    const sortedByPercent = [...branchStats].sort((a, b) => b.percent - a.percent)
    const topBranch = sortedByPercent[0]?.percent > 0 ? sortedByPercent[0] : null

    return { totalLeaves, completed, percent, branchStats, topBranch }
  }, [completedIds])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Hash, label: 'Total Skills', value: String(stats.totalLeaves), color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: CheckCircle, label: 'Completed', value: String(stats.completed), color: 'text-green-600', bg: 'bg-green-50' },
          { icon: Target, label: 'Completion', value: `${stats.percent}%`, color: 'text-purple-600', bg: 'bg-purple-50' },
          { icon: Layers, label: 'Branches', value: String(taxonomyTree.length), color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((card, i) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`${card.bg} rounded-xl p-4 animate-fade-in-up-stagger`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className={card.color} />
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{card.label}</span>
              </div>
              <span className="text-[22px] font-bold text-gray-900 tabular-nums">{card.value}</span>
            </div>
          )
        })}
      </div>

      {stats.topBranch && (
        <div className="bg-amber-50 rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
          <div className="flex items-start gap-3">
            <Award size={16} className="text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-[12px] font-semibold text-amber-900">Most Completed Branch</h3>
              <p className="text-[11px] text-amber-800 mt-0.5">
                <strong>{stats.topBranch.label}</strong> — {stats.topBranch.completed}/{stats.topBranch.total} skills ({stats.topBranch.percent}%)
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="animate-fade-in-up" style={{ animationDelay: '0.14s' }}>
        <h3 className="text-[12px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <BarChart3 size={14} />
          Per-Branch Breakdown
        </h3>
        <div className="space-y-2">
          {stats.branchStats.map((b, i) => (
            <div key={b.id} className="animate-fade-in-up-stagger" style={{ animationDelay: `${i * 0.03}s` }}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: branchColors[b.id] ?? '#666' }} />
                  <span className="text-gray-700 font-medium">{b.label}</span>
                </span>
                <span className="text-gray-400 tabular-nums">
                  {b.completed}/{b.total}
                  <span className="ml-1.5 font-medium" style={{ color: b.percent >= 50 ? '#16a34a' : b.percent > 0 ? '#ea580c' : '#9ca3af' }}>
                    {b.percent}%
                  </span>
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${b.percent}%`, backgroundColor: branchColors[b.id] ?? '#666' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
