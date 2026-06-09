import { taxonomyTree, learningTracks, branchColors, countLeaves, type SkillNode } from '@/data/arabic-taxonomy'

function nodeToMarkdown(node: SkillNode, depth = 0): string {
  const indent = '  '.repeat(depth)
  let md = `${indent}- **${node.label}**${node.labelAr ? ` (${node.labelAr})` : ''}`
  if (node.description) md += ` — ${node.description}`
  if (node.gateLevel) md += ` [L${node.gateLevel}]`
  md += '\n'
  if (node.children) {
    for (const child of node.children) {
      md += nodeToMarkdown(child, depth + 1)
    }
  }
  return md
}

export function exportAsMarkdown(): string {
  let md = '# Arabic Competency Taxonomy\n\n'
  md += `> ${countLeaves(taxonomyTree)} leaf skills across ${taxonomyTree.length} branches\n\n`

  for (const branch of taxonomyTree) {
    md += nodeToMarkdown(branch, 0)
    md += '\n'
  }

  md += '---\n\n# Learning Paths\n\n'
  for (const track of learningTracks) {
    md += `## Track ${track.id}: ${track.name}\n\n`
    md += `${track.description}\n\n`
    for (const node of track.nodes) {
      md += `- ${node.label} (Required: L${node.requiredLevel})\n`
    }
    if (track.tracksUnlocked.length > 0) {
      md += `\n*Unlocks: ${track.tracksUnlocked.join(', ')}*\n`
    }
    md += '\n'
  }

  return md
}

export function exportAsJSON(pretty = true): string {
  const data = {
    taxonomy: taxonomyTree,
    tracks: learningTracks,
    branchColors,
    stats: {
      totalLeaves: countLeaves(taxonomyTree),
      branchCount: taxonomyTree.length,
      trackCount: learningTracks.length,
    },
  }
  return JSON.stringify(data, null, pretty ? 2 : undefined)
}

export function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
