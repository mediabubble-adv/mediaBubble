// Prisma seed — idempotent baseline data for local/staging.
// Run: `npm run db:seed` (configured via package.json "prisma.seed").
//
// Seeds the MediaBubble departments and one user per RBAC role so the auth
// flows, proxy gate, and upcoming module UIs have something to render.
// Re-running is safe: users upsert on their unique email; departments are
// guarded by a name lookup (the schema has no unique constraint on name).

import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth/password'

const prisma = new PrismaClient()

// Shared dev password for every seeded account. Override via env for staging.
const DEV_PASSWORD = process.env['SEED_PASSWORD'] ?? 'Launch@2026'

// MediaBubble service-line departments (match the live ops data so re-seeding
// is idempotent against an existing instance).
const DEPARTMENTS = [
  'Strategic Consulting',
  'Branding',
  'Social Media',
  'Paid Advertising',
  'Email Marketing',
  'SEO',
  'Media Production',
  'Analytics & Reporting',
  'Client Services',
] as const

interface SeedUser {
  email: string
  name: string
  role: 'Admin' | 'Manager' | 'Contributor' | 'Viewer'
  department: (typeof DEPARTMENTS)[number]
}

const USERS: SeedUser[] = [
  { email: 'yasser@mediabubble.co', name: 'Yasser Dorgham', role: 'Admin', department: 'Strategic Consulting' },
  { email: 'manager@mediabubble.co', name: 'Project Manager', role: 'Manager', department: 'Client Services' },
  { email: 'creative@mediabubble.co', name: 'Creative Staff', role: 'Contributor', department: 'Social Media' },
  { email: 'viewer@mediabubble.co', name: 'Read Only', role: 'Viewer', department: 'Analytics & Reporting' },
]

/** Find a department by name, or create it. (No unique constraint on name.) */
async function ensureDepartment(name: string): Promise<string> {
  const existing = await prisma.departments.findFirst({ where: { name } })
  if (existing) return existing.id
  const created = await prisma.departments.create({ data: { name } })
  return created.id
}

async function main(): Promise<void> {
  const password_hash = hashPassword(DEV_PASSWORD)

  const departmentIds = new Map<string, string>()
  for (const name of DEPARTMENTS) {
    departmentIds.set(name, await ensureDepartment(name))
  }

  for (const u of USERS) {
    await prisma.users.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role, status: 'active', department_id: departmentIds.get(u.department) },
      create: {
        email: u.email,
        name: u.name,
        role: u.role,
        status: 'active',
        password_hash,
        department_id: departmentIds.get(u.department),
      },
    })
  }

  // eslint-disable-next-line no-console -- seed scripts report their summary to stdout
  console.log(
    `Seeded ${DEPARTMENTS.length} departments and ${USERS.length} users ` +
      `(password: "${DEV_PASSWORD}").`,
  )
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
