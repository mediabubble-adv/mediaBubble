#!/usr/bin/env npx tsx
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve, basename } from 'node:path'

const ROOT = resolve(import.meta.dirname, '../../..')
const EG_DATA = join(ROOT, 'apps/web-eg/lib/data')
const AE_DATA = join(ROOT, 'apps/web-ae/lib/data')
const EG_SERVICES = join(ROOT, 'apps/web-eg/lib/services-data.ts')

export async function localizeForUAE(text: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[content-pipeline] OPENAI_API_KEY not set — passthrough localization for:',
        text.slice(0, 60),
      )
    }
    return text
  }

  // Stub: production pipeline can call an AI gateway here.
  return text
}

async function mirrorJsonSidecars() {
  if (!existsSync(EG_DATA)) {
    console.warn('[content-pipeline] Missing source data dir:', EG_DATA)
    return
  }

  mkdirSync(AE_DATA, { recursive: true })

  for (const file of readdirSync(EG_DATA)) {
    if (!file.endsWith('.json')) continue
    const src = join(EG_DATA, file)
    const dest = join(AE_DATA, file)
    const raw = readFileSync(src, 'utf8')
    const parsed = JSON.parse(raw) as Record<string, unknown>

    const localized: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(parsed)) {
      localized[key] =
        typeof value === 'string' ? await localizeForUAE(value) : value
    }

    writeFileSync(dest, `${JSON.stringify(localized, null, 2)}\n`, 'utf8')
    console.log(`Localized ${basename(file)} → apps/web-ae/lib/data/${file}`)
  }
}

async function main() {
  console.log('[content-pipeline] Starting UAE localization pass')
  await mirrorJsonSidecars()

  if (existsSync(EG_SERVICES)) {
    console.log(
      '[content-pipeline] services-data.ts detected — JSON sidecar export recommended for full pipeline coverage.',
    )
  }

  console.log('[content-pipeline] Done.')
}

const isDirectRun = process.argv[1]?.includes('localize-for-uae')
if (isDirectRun) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
