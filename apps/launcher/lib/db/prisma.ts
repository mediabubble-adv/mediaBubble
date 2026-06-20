// Prisma client singleton. In dev, Next.js hot-reload re-evaluates modules, so
// we cache the client on globalThis to avoid exhausting DB connections.
//
// Load launcher env explicitly — Nx/Turbopack can evaluate this module before
// Next's automatic .env.local load, leaving DATABASE_URL unset or stale.
// A placeholder DATABASE_URL exported in the shell is not overridden by
// loadEnvConfig, so strip those before loading apps/launcher/.env.local.

import { existsSync } from 'node:fs'
import path from 'node:path'
import { loadEnvConfig } from '@next/env'
import { PrismaClient } from '@prisma/client'

const DB_ENV_KEYS = ['DATABASE_URL', 'DIRECT_URL'] as const

function resolveLauncherRoot(): string {
  const candidates = [
    path.resolve(__dirname, '../..'),
    process.cwd(),
    path.join(process.cwd(), 'apps/launcher'),
  ]
  for (const dir of candidates) {
    if (existsSync(path.join(dir, 'prisma', 'schema.prisma'))) {
      return dir
    }
  }
  return path.resolve(__dirname, '../..')
}

function hasDatabasePlaceholder(value: string): boolean {
  return value.includes('[PROJECT_REF]') || value.includes('[YOUR-PASSWORD]')
}

function stripPlaceholderDatabaseEnv(): void {
  for (const key of DB_ENV_KEYS) {
    const value = process.env[key]
    if (value && hasDatabasePlaceholder(value)) {
      delete process.env[key]
    }
  }
}

const launcherRoot = resolveLauncherRoot()
stripPlaceholderDatabaseEnv()
loadEnvConfig(launcherRoot)

function assertDatabaseUrl(): string {
  const url = process.env['DATABASE_URL']
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Copy apps/launcher/.env.example to apps/launcher/.env.local and add your Supabase pooler URLs.',
    )
  }
  if (hasDatabasePlaceholder(url)) {
    throw new Error(
      'DATABASE_URL still contains template placeholders. Replace [PROJECT_REF] and [YOUR-PASSWORD] in apps/launcher/.env.local with your Supabase project ref and database password.',
    )
  }
  return url
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
  prismaDbUrl?: string
}

function createClient(): PrismaClient {
  return new PrismaClient({
    log: process.env['NODE_ENV'] === 'development' ? ['error', 'warn'] : ['error'],
  })
}

const dbUrl = assertDatabaseUrl()
if (!globalForPrisma.prisma || globalForPrisma.prismaDbUrl !== dbUrl) {
  void globalForPrisma.prisma?.$disconnect()
  globalForPrisma.prisma = createClient()
  globalForPrisma.prismaDbUrl = dbUrl
}

export const prisma = globalForPrisma.prisma!

if (process.env['NODE_ENV'] !== 'production') globalForPrisma.prisma = prisma
