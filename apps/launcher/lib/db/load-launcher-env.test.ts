import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import {
  applyLauncherEnv,
  assertDatabaseUrl,
  isPlaceholderEnvValue,
  parseEnvFile,
} from './load-launcher-env'

describe('load-launcher-env', () => {
  it('detects template placeholders', () => {
    expect(
      isPlaceholderEnvValue(
        'DATABASE_URL',
        'postgresql://postgres.[PROJECT_REF]:[YOUR-PASSWORD]@example.com:6543/postgres',
      ),
    ).toBe(true)
    expect(isPlaceholderEnvValue('JWT_SECRET', 'change-me-in-production')).toBe(true)
    expect(isPlaceholderEnvValue('JWT_SECRET', 'real-secret')).toBe(false)
  })

  it('prefers real prisma/.env values over placeholder .env.local', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'launcher-env-'))
    mkdirSync(path.join(dir, 'prisma'), { recursive: true })
    writeFileSync(
      path.join(dir, 'prisma', 'schema.prisma'),
      'generator client { provider = "prisma-client-js" }\n',
    )
    writeFileSync(
      path.join(dir, '.env.local'),
      'DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[YOUR-PASSWORD]@example.com:6543/postgres"\n',
    )
    writeFileSync(
      path.join(dir, 'prisma', '.env'),
      'DATABASE_URL="postgresql://postgres.real:secret@example.com:6543/postgres?pgbouncer=true"\nDIRECT_URL="postgresql://postgres.real:secret@example.com:5432/postgres"\n',
    )

    delete process.env.DATABASE_URL
    delete process.env.DIRECT_URL

    applyLauncherEnv(dir)

    expect(process.env['DATABASE_URL']).toContain('postgres.real')
    expect(assertDatabaseUrl()).toContain('postgres.real')

    rmSync(dir, { recursive: true, force: true })
  })

  it('parses quoted env values', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'launcher-env-parse-'))
    const filePath = path.join(dir, '.env')
    writeFileSync(filePath, 'JWT_SECRET="abc-123"\n')
    expect(parseEnvFile(filePath)).toEqual({ JWT_SECRET: 'abc-123' })
    rmSync(dir, { recursive: true, force: true })
    expect(existsSync(filePath)).toBe(false)
  })
})
