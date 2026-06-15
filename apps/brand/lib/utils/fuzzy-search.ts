/**
 * Simple fuzzy search — returns true if all characters of `query`
 * appear in order within `text`, allowing gaps.
 */
export function fuzzyMatch(text: string, query: string): boolean {
  if (!query) return true
  const t = text.toLowerCase()
  const q = query.toLowerCase()

  let ti = 0
  for (let qi = 0; qi < q.length; qi++) {
    const found = t.indexOf(q[qi], ti)
    if (found === -1) return false
    ti = found + 1
  }
  return true
}

/**
 * Fuzzy match across multiple fields (OR). Returns true if any field matches.
 */
export function fuzzyMatchAny(fields: (string | undefined)[], query: string): boolean {
  if (!query) return true
  return fields.some(f => f ? fuzzyMatch(f, query) : false)
}

/**
 * Score how well the query matches the text. Lower is better.
 * Returns -1 if no match.
 */
export function fuzzyScore(text: string, query: string): number {
  if (!query) return 0
  const t = text.toLowerCase()
  const q = query.toLowerCase()

  let ti = 0
  let score = 0
  for (let qi = 0; qi < q.length; qi++) {
    const found = t.indexOf(q[qi], ti)
    if (found === -1) return -1
    score += found - ti
    ti = found + 1
  }
  return score + t.length
}
