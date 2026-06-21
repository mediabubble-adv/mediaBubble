// Resolve launcher env files without relying on a second loadEnvConfig call.
// Next.js loads .env.local once at startup; stripping placeholder DATABASE_URL
// and calling loadEnvConfig again is a no-op (cached), which breaks Prisma init.

import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const DB_ENV_KEYS = ['DATABASE_URL', 'DIRECT_URL'] as const
const FALLBACK_ENV_KEYS = [...DB_ENV_KEYS, 'JWT_SECRET'] as const

export type LauncherEnvKey = (typeof FALLBACK_ENV_KEYS)[number]

function hasDatabasePlaceholder(value: string): boolean {
  return value.includes('[PROJECT_REF]') || value.includes('[YOUR-PASSWORD]')
}

function hasJwtPlaceholder(value: string): boolean {
  return value === 'change-me-in-production'
}

export function isPlaceholderEnvValue(key: LauncherEnvKey, value: string): boolean {
  if (DB_ENV_KEYS.includes(key as (typeof DB_ENV_KEYS)[number])) {
    return hasDatabasePlaceholder(value)
  }
  if (key === 'JWT_SECRET') return hasJwtPlaceholder(value)
  return false
}

export function resolveLauncherRoot(startDir = __dirname): string {
  const candidates = [
    path.resolve(startDir, '../..'),
    path.resolve(startDir, '../../..'),
    process.cwd(),
    path.join(process.cwd(), 'apps/launcher'),
  ]
  for (const dir of candidates) {
    if (existsSync(path.join(dir, 'prisma', 'schema.prisma'))) {
      return dir
    }
  }
  return path.resolve(startDir, '../..')
}

export function parseEnvFile(filePath: string): Record<string, string> {
  if (!existsSync(filePath)) return {}

  const out: Record<string, string> = {}
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[key] = value
  }
  return out
}

/** Merge non-placeholder values from launcher env files into process.env. */
export function applyLauncherEnv(launcherRoot = resolveLauncherRoot()): string {
  const envFiles = [
    path.join(launcherRoot, '.env.local'),
    path.join(launcherRoot, 'prisma', '.env'),
  ]

  for (const filePath of envFiles) {
    const parsed = parseEnvFile(filePath)
    for (const key of FALLBACK_ENV_KEYS) {
      const value = parsed[key]
      if (!value || isPlaceholderEnvValue(key, value)) continue
      process.env[key] = value
    }
  }

  return launcherRoot
}

export function assertDatabaseUrl(): string {
  const url = process.env['DATABASE_URL']
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Add Supabase pooler URLs to apps/launcher/.env.local (or apps/launcher/prisma/.env for Prisma CLI).',
    )
  }
  if (hasDatabasePlaceholder(url)) {
    throw new Error(
      'DATABASE_URL still contains template placeholders. Replace [PROJECT_REF] and [YOUR-PASSWORD] in apps/launcher/.env.local with your Supabase project ref and database password.',
    )
  }
  return url
}
