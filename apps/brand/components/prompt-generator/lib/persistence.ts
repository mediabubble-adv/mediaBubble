// Client-side persistence (localStorage) with graceful degradation.
// Wrapped in try/catch for private mode / quota; falls back to in-memory so the
// UI never crashes. Share links serialise config to a versioned base64 hash.

import type { GeneratorConfig, HistoryEntry, Mode, Model, SavedTemplate } from './types'

const NS = 'mb.promptgen'
const TEMPLATES_KEY = `${NS}.savedTemplates`
const HISTORY_KEY = `${NS}.history`
const HISTORY_CAP = 25
const SHARE_VERSION = 1

const memory = new Map<string, string>()

export let storageAvailable = true

function read(key: string): string | null {
  try {
    const v = window.localStorage.getItem(key)
    return v
  } catch {
    storageAvailable = false
    return memory.get(key) ?? null
  }
}

function write(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    storageAvailable = false
    memory.set(key, value)
  }
}

function parse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

// --- Saved templates ---

export function loadTemplates(): SavedTemplate[] {
  return parse<SavedTemplate[]>(read(TEMPLATES_KEY), [])
}

export function saveTemplate(name: string, config: GeneratorConfig): SavedTemplate[] {
  const templates = loadTemplates()
  const entry: SavedTemplate = {
    id: `tpl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim() || 'Untitled template',
    config,
    createdAt: Date.now(),
  }
  const next = [entry, ...templates]
  write(TEMPLATES_KEY, JSON.stringify(next))
  return next
}

export function deleteTemplate(id: string): SavedTemplate[] {
  const next = loadTemplates().filter((t) => t.id !== id)
  write(TEMPLATES_KEY, JSON.stringify(next))
  return next
}

// --- History ---

export function loadHistory(): HistoryEntry[] {
  return parse<HistoryEntry[]>(read(HISTORY_KEY), [])
}

export function pushHistory(entry: Omit<HistoryEntry, 'id' | 'createdAt'>): HistoryEntry[] {
  const next: HistoryEntry[] = [
    { ...entry, id: `h_${Date.now()}`, createdAt: Date.now() },
    ...loadHistory(),
  ].slice(0, HISTORY_CAP)
  write(HISTORY_KEY, JSON.stringify(next))
  return next
}

// --- Share links ---

/** Encode config into a URL hash fragment (versioned). */
export function encodeShare(config: GeneratorConfig): string {
  const payload = JSON.stringify({ v: SHARE_VERSION, config })
  try {
    return `#pg=${btoa(encodeURIComponent(payload))}`
  } catch {
    return ''
  }
}

const KNOWN_MODES = new Set<Mode>(['image', 'video'])
const KNOWN_MODELS = new Set<Model>(['midjourney', 'flux', 'grok', 'runway', 'kling'])

/** Reject share payloads whose enum fields aren't recognised values. */
function isValidConfig(c: unknown): c is GeneratorConfig {
  if (!c || typeof c !== 'object') return false
  const cfg = c as Partial<GeneratorConfig>
  return KNOWN_MODES.has(cfg.mode as Mode) && KNOWN_MODELS.has(cfg.model as Model)
}

/** Decode a share hash back into config, or null if absent/invalid/old. */
export function decodeShare(hash: string): GeneratorConfig | null {
  const match = hash.match(/pg=([^&]+)/)
  if (!match) return null
  try {
    const decoded = decodeURIComponent(atob(match[1]))
    const data = JSON.parse(decoded) as { v: number; config: GeneratorConfig }
    if (data.v !== SHARE_VERSION || !isValidConfig(data.config)) return null
    return data.config
  } catch {
    return null
  }
}
