#!/usr/bin/env node
/**
 * Compare EN vs AR locale key trees per market app.
 * Exits 1 when keys are missing on either side.
 */
import fs from 'fs'
import path from 'path'

const root = path.resolve(import.meta.dirname, '..')

const APPS = [
  { name: 'web-eg', en: 'apps/web-eg/public/locales/en/translation.json', ar: 'apps/web-eg/public/locales/ar/translation.json' },
  { name: 'web-ae', en: 'apps/web-ae/public/locales/en/translation.json', ar: 'apps/web-ae/public/locales/ar/translation.json' },
]

function collectKeys(obj, prefix = '') {
  const keys = new Set()
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return keys
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      for (const child of collectKeys(v, p)) keys.add(child)
    } else {
      keys.add(p)
    }
  }
  return keys
}

function diff(a, b) {
  return [...a].filter((k) => !b.has(k)).sort()
}

let failed = false

for (const app of APPS) {
  const enPath = path.join(root, app.en)
  const arPath = path.join(root, app.ar)
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
  const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'))
  const enKeys = collectKeys(en)
  const arKeys = collectKeys(ar)
  const missingInAr = diff(enKeys, arKeys)
  const missingInEn = diff(arKeys, enKeys)

  if (missingInAr.length || missingInEn.length) {
    failed = true
    console.error(`\n✗ ${app.name} locale key mismatch`)
    if (missingInAr.length) {
      console.error(`  Missing in AR (${missingInAr.length}):`)
      for (const k of missingInAr.slice(0, 40)) console.error(`    - ${k}`)
      if (missingInAr.length > 40) console.error(`    … and ${missingInAr.length - 40} more`)
    }
    if (missingInEn.length) {
      console.error(`  Missing in EN (${missingInEn.length}):`)
      for (const k of missingInEn.slice(0, 40)) console.error(`    - ${k}`)
      if (missingInEn.length > 40) console.error(`    … and ${missingInEn.length - 40} more`)
    }
  } else {
    console.log(`✓ ${app.name}: ${enKeys.size} keys in sync (EN ↔ AR)`)
  }
}

if (failed) {
  console.error('\nLocale parity check failed.')
  process.exit(1)
}

console.log('\nAll locale trees are in parity.')
