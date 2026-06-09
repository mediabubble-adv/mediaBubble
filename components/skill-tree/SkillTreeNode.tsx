'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, FileText, Folder, CheckCircle, Circle, User, List } from 'lucide-react'
import type { SkillNode } from '@/data/arabic-taxonomy'
import { getAgent, getSkills } from '@/utils/enrich-node'
import { fuzzyMatchAny } from '@/utils/fuzzy-search'

interface SkillTreeNodeProps {
  node: SkillNode
  branchColor: string
  searchQuery?: string
  depth?: number
  defaultExpanded?: boolean
  completedIds?: Set<string>
  onToggle?: (id: string) => void
}

function highlightText(text: string, query?: string) {
  if (!query || !query.trim()) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <span key={i} className="bg-yellow-200 text-[#0D0F12] rounded px-0.5">{part}</span>
      : part
  )
}

function Collapsible({ expanded, children }: { expanded: boolean; children: React.ReactNode }) {
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

export function SkillTreeNode({ node, branchColor, searchQuery, depth = 0, defaultExpanded = false, completedIds, onToggle }: SkillTreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded || depth < 1)
  const [detailOpen, setDetailOpen] = useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isLeaf = !hasChildren
  const isCompleted = completedIds?.has(node.id)

  const agentInfo = getAgent(node)
  const skills = getSkills(node)

  const matchesSearch = searchQuery
    ? fuzzyMatchAny([node.label, node.labelAr, node.description, agentInfo?.agent], searchQuery)
    : false

  const childMatches = hasChildren && searchQuery
    ? node.children!.some(c => matchesSearchInTree(c, searchQuery))
    : true

  const show = !searchQuery || matchesSearch || childMatches
  if (searchQuery && !show) return null

  const autoExpand = searchQuery && (matchesSearch || childMatches)

  return (
    <div className="select-none">
      <div className={`flex items-start gap-1 rounded-lg transition-all duration-150 ${
        isCompleted ? 'opacity-60' : ''
      } ${matchesSearch && searchQuery ? 'bg-blue-50 ring-1 ring-blue-200' : ''}`}>
        <div className="flex-1 min-w-0">
          <button
            onClick={() => hasChildren && setExpanded(!expanded)}
            className={`
              flex items-center gap-2 w-full text-left rounded-lg transition-all duration-150
              ${depth === 0
                ? 'px-3 py-2.5 text-[13px] font-semibold'
                : 'px-1 py-1.5 text-[12px]'
              }
              hover:bg-gray-50 active:bg-gray-100
            `}
            style={depth === 0 ? { color: branchColor } : {}}
          >
            <span className="shrink-0 w-4 flex justify-center transition-transform duration-150" style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              {hasChildren ? (
                <ChevronRight size={13} className="text-gray-400" />
              ) : (
                isLeaf ? <FileText size={12} className="text-gray-300" /> : null
              )}
            </span>

            {depth === 0 ? (
              <Folder size={14} className="shrink-0" fill={branchColor + '20'} color={branchColor} />
            ) : (
              <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: branchColor }} />
            )}

            <span className={`truncate flex-1 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
              {highlightText(node.label, searchQuery)}
            </span>

            {agentInfo && isLeaf && (
              <span
                className="text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 whitespace-nowrap truncate max-w-[120px] border transition-colors cursor-help"
                style={{ borderColor: branchColor + '40', color: branchColor, backgroundColor: branchColor + '10' }}
                title={`${agentInfo.agent} — ${agentInfo.description}`}
              >
                <User size={9} className="inline mr-0.5 -mt-0.5" />
                {agentInfo.agent}
              </span>
            )}

            {node.gateLevel && depth === 1 && (
              <span className={`
                text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0
                ${node.gateLevel >= 4 ? 'bg-red-100 text-red-700' :
                  node.gateLevel >= 3 ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'}
              `}>
                L{node.gateLevel}
              </span>
            )}

            {hasChildren && (
              <span className="text-[10px] text-gray-400 tabular-nums shrink-0">
                {node.children!.length}
              </span>
            )}
          </button>

          {isLeaf && skills.length > 0 && (
            <Collapsible expanded={detailOpen}>
              <div className="pl-7 pr-3 pb-2 pt-1 space-y-1">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-start gap-2 text-[10.5px] leading-relaxed text-gray-600">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: branchColor }} />
                    {skill}
                  </div>
                ))}
              </div>
            </Collapsible>
          )}
        </div>

        <div className="flex items-start gap-0.5 pt-1 pr-1 shrink-0">
          {isLeaf && skills.length > 0 && (
            <button
              onClick={() => setDetailOpen(!detailOpen)}
              className="p-1 text-gray-300 hover:text-blue-500 transition-colors rounded"
              title={detailOpen ? 'Hide skills' : 'Show measurable skills'}
            >
              <List size={12} />
            </button>
          )}

          {isLeaf && onToggle && (
            <button
              onClick={() => onToggle(node.id)}
              className="p-1 text-gray-300 hover:text-blue-500 transition-colors rounded"
              title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
            >
              {isCompleted
                ? <CheckCircle size={13} className="text-green-500" />
                : <Circle size={13} />
              }
            </button>
          )}
        </div>
      </div>

      {hasChildren && (
        <Collapsible expanded={expanded}>
          <div className={`ml-${depth === 0 ? '2' : '3'} border-l border-gray-100 pl-1`}>
            {node.children!.map((child) => (
              <SkillTreeNode
                key={child.id}
                node={child}
                branchColor={branchColor}
                searchQuery={searchQuery}
                depth={depth + 1}
                defaultExpanded={autoExpand}
                completedIds={completedIds}
                onToggle={onToggle}
              />
            ))}
          </div>
        </Collapsible>
      )}
    </div>
  )
}

function matchesSearchInTree(node: SkillNode, query: string): boolean {
  if (fuzzyMatchAny([node.label, node.labelAr, node.description, getAgent(node)?.agent], query)) return true
  if (node.children) return node.children.some(c => matchesSearchInTree(c, query))
  return false
}
