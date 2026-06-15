#!/usr/bin/env npx tsx
import { cpSync, existsSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(__dirname, '..')
const SRC = join(ROOT, 'apps/web-eg')
const DST = join(ROOT, 'apps/web-ae')
const DIRS = ['app', 'components', 'lib', 'public'] as const

for (const dir of DIRS) {
  const target = join(DST, dir)
  if (existsSync(target)) rmSync(target, { recursive: true, force: true })
  cpSync(join(SRC, dir), target, { recursive: true })
  console.log(`Cloned ${dir}/ → apps/web-ae/${dir}/`)
}

const singleFiles = ['instrumentation.ts', 'postcss.config.js', 'app/globals.css'] as const
for (const file of singleFiles) {
  const srcFile = join(SRC, file)
  if (existsSync(srcFile)) {
    cpSync(srcFile, join(DST, file))
    console.log(`Copied ${file}`)
  }
}

console.log('\nDone. Next: customize web-ae i18n + metadata for UAE.')
