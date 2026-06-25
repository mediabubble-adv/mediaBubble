export interface MentionCandidate {
  id: string
  name: string
}

export function parseMentionedUserIds(
  content: string,
  members: MentionCandidate[],
): string[] {
  const sorted = [...members].sort((a, b) => b.name.length - a.name.length)
  const mentioned = new Set<string>()
  let i = 0

  while (i < content.length) {
    if (content[i] !== '@') {
      i += 1
      continue
    }

    const rest = content.slice(i + 1)
    const match = sorted.find((m) => rest.toLowerCase().startsWith(m.name.toLowerCase()))
    if (match) {
      mentioned.add(match.id)
      i += 1 + match.name.length
    } else {
      i += 1
    }
  }

  return [...mentioned]
}

export interface NoteSegment {
  type: 'text' | 'mention'
  value: string
  userId?: string
}

export function segmentNoteContent(content: string, members: MentionCandidate[]): NoteSegment[] {
  const sorted = [...members].sort((a, b) => b.name.length - a.name.length)
  const segments: NoteSegment[] = []
  let cursor = 0

  while (cursor < content.length) {
    const at = content.indexOf('@', cursor)
    if (at === -1) {
      segments.push({ type: 'text', value: content.slice(cursor) })
      break
    }

    if (at > cursor) segments.push({ type: 'text', value: content.slice(cursor, at) })

    const rest = content.slice(at + 1)
    const match = sorted.find((m) => rest.toLowerCase().startsWith(m.name.toLowerCase()))
    if (match) {
      segments.push({ type: 'mention', value: match.name, userId: match.id })
      cursor = at + 1 + match.name.length
    } else {
      segments.push({ type: 'text', value: '@' })
      cursor = at + 1
    }
  }

  return segments
}
