// Prisma client singleton. In dev, Next.js hot-reload re-evaluates modules, so
// we cache the client on globalThis to avoid exhausting DB connections.
//
// Next loads .env.local once at startup. Placeholder DATABASE_URL values are
// stripped by applyLauncherEnv, which re-reads env files (including prisma/.env).

import { PrismaClient } from '@prisma/client'

import { applyLauncherEnv, assertDatabaseUrl } from './load-launcher-env'

applyLauncherEnv()

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
