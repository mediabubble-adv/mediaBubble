import { fuzzyMatchAny, fuzzyScore } from '@/lib/utils/fuzzy-search'
import {
  getFeaturedSearchItems,
  GUIDELINE_SEARCH_INDEX,
  type GuidelineSearchItem,
} from '@/lib/guideline-search-index'

export type { GuidelineSearchItem, GuidelineSearchKind } from '@/lib/guideline-search-index'
export { FEATURED_SEARCH_ITEM_IDS, getFeaturedSearchItems } from '@/lib/guideline-search-index'

function itemMatches(item: GuidelineSearchItem, query: string): boolean {
  const fields = [item.label, item.context, item.section, ...item.keywords]
  if (fuzzyMatchAny(fields, query)) return true
  const q = query.toLowerCase()
  return fields.some((field) => field.toLowerCase().includes(q))
}

function itemScore(item: GuidelineSearchItem, query: string): number {
  const fields = [item.label, item.context, ...item.keywords]
  const scores = fields.map((field) => fuzzyScore(field, query)).filter((score) => score >= 0)
  if (scores.length) return Math.min(...scores)
  const q = query.toLowerCase()
  if (item.label.toLowerCase().startsWith(q)) return 0
  if (item.label.toLowerCase().includes(q)) return 5
  if (item.kind === 'page') return 50
  return 10
}

export function searchGuidelineItems(query: string, limit = 14): GuidelineSearchItem[] {
  const trimmed = query.trim()
  if (!trimmed) return getFeaturedSearchItems()

  return GUIDELINE_SEARCH_INDEX.filter((item) => itemMatches(item, trimmed))
    .map((item) => ({ item, score: itemScore(item, trimmed) }))
    .sort((a, b) => a.score - b.score || a.item.label.localeCompare(b.item.label))
    .slice(0, limit)
    .map(({ item }) => item)
}
