// Prisma seed — idempotent baseline data for local/staging.
// Run: `npm run db:seed` (configured via package.json "prisma.seed").
//
// Seeds the MediaBubble departments and one user per RBAC role so the auth
// flows, proxy gate, and upcoming module UIs have something to render.
// Re-running is safe: users upsert on their unique email; departments are
// guarded by a name lookup (the schema has no unique constraint on name).

import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth/password'
import { HOLIDAY_SEED_2026, HOLIDAY_SEED_NAMES } from '../lib/time/holidays-data'

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

// Software-cost ledger (LAUNCHER_PLAN_V2.md §4.3). Monthly recurring outflows
// in USD. The duplicate Hostinger "openclaw" tier is intentional — the Finance
// AI brief flags it as the ~$25/mo cost-recovery opportunity.
const SOFTWARE_COSTS = [
  { description: 'Supabase', category: 'Hosting & Servers', usd: 25 },
  { description: 'Vercel', category: 'Hosting & Servers', usd: 20 },
  { description: 'Hostinger', category: 'Hosting & Servers', usd: 10 },
  { description: 'Hostinger (openclaw)', category: 'Hosting & Servers', usd: 25 },
  { description: 'Claude', category: 'AI & Dev', usd: 20 },
  { description: 'Cursor', category: 'AI & Dev', usd: 20 },
  { description: 'Gmail Workspace', category: 'Comms', usd: 12 },
  { description: 'SendGrid', category: 'Comms', usd: 20 },
  { description: 'Domain (mediabubble.co)', category: 'Domains', usd: 1.5 },
] as const

const CLIENTS = [
  {
    name: 'Cairo Retail Group',
    primary_contact_name: 'Nadia Hassan',
    primary_contact_email: 'accounts@cairoretail.eg',
    primary_contact_phone: '+201012345678',
    contract_type: 'retainer',
    monthly_budget: 15000,
    status: 'active',
  },
  {
    name: 'Dubai Lifestyle Co',
    primary_contact_name: 'Omar Al Ketbi',
    primary_contact_email: 'finance@dubailifestyle.ae',
    primary_contact_phone: '+971501234567',
    contract_type: 'project',
    status: 'active',
  },
  {
    name: 'Nile F&B Holdings',
    primary_contact_name: 'Sara Mahmoud',
    primary_contact_email: 'sara@nilefnb.co',
    contract_type: 'hourly',
    monthly_budget: 8000,
    status: 'active',
  },
] as const

// Rows written by the seed carry this marker so re-seeding is idempotent and
// never disturbs manually-entered transactions.
const SEED_MARKER = 'seed'

/** First-of-month dates for the trailing `count` months, oldest first. */
function recentMonths(count: number): Date[] {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (count - 1 - i), 1))
    return d
  })
}

async function seedFinance(): Promise<number> {
  await prisma.transactions.deleteMany({ where: { payment_method: SEED_MARKER } })

  const months = recentMonths(6)
  const rows: {
    date: Date
    category: string
    type: string
    amount: number
    currency: string
    description: string
    payment_method: string
    recurring: boolean
  }[] = []

  for (const month of months) {
    // Recurring software costs (USD outflows).
    for (const c of SOFTWARE_COSTS) {
      rows.push({
        date: month,
        category: c.category,
        type: 'outflow',
        amount: c.usd,
        currency: 'USD',
        description: c.description,
        payment_method: SEED_MARKER,
        recurring: true,
      })
    }
    // Monthly client retainer inflow (EGP) — gives the cash-flow chart a topline.
    rows.push({
      date: month,
      category: 'Revenue',
      type: 'inflow',
      amount: 120_000,
      currency: 'EGP',
      description: 'Client retainers',
      payment_method: SEED_MARKER,
      recurring: false,
    })
  }

  await prisma.transactions.createMany({ data: rows })
  return rows.length
}

async function seedHolidays(): Promise<number> {
  await prisma.holidays.deleteMany({ where: { name: { in: [...HOLIDAY_SEED_NAMES] } } })

  await prisma.holidays.createMany({
    data: HOLIDAY_SEED_2026.map((h) => ({
      date: new Date(`${h.date}T00:00:00.000Z`),
      name: h.name,
      country: h.country,
      is_working_day: h.is_working_day,
    })),
  })
  return HOLIDAY_SEED_2026.length
}

async function seedClients(): Promise<number> {
  let count = 0
  for (const client of CLIENTS) {
    await prisma.clients.upsert({
      where: { name: client.name },
      update: {
        primary_contact_name: client.primary_contact_name,
        primary_contact_email: client.primary_contact_email,
        primary_contact_phone: client.primary_contact_phone ?? null,
        contract_type: client.contract_type,
        monthly_budget: client.monthly_budget ?? null,
        status: client.status,
        deleted_at: null,
      },
      create: {
        name: client.name,
        primary_contact_name: client.primary_contact_name,
        primary_contact_email: client.primary_contact_email,
        primary_contact_phone: client.primary_contact_phone ?? null,
        contract_type: client.contract_type,
        monthly_budget: client.monthly_budget ?? null,
        status: client.status,
      },
    })
    count += 1
  }
  return count
}

const BILLING_SEED_INVOICE = 'INV-SEED-0001'
const BILLING_SEED_QUOTATION = 'QUO-SEED-0001'

async function seedBilling(managerId: string): Promise<{ invoices: number; quotations: number }> {
  const cairo = await prisma.clients.findFirst({ where: { name: 'Cairo Retail Group' } })
  const dubai = await prisma.clients.findFirst({ where: { name: 'Dubai Lifestyle Co' } })
  if (!cairo || !dubai) return { invoices: 0, quotations: 0 }

  await prisma.invoices.deleteMany({ where: { invoice_number: BILLING_SEED_INVOICE } })
  await prisma.quotations.deleteMany({ where: { quotation_number: BILLING_SEED_QUOTATION } })

  const due = new Date()
  due.setUTCDate(due.getUTCDate() + 14)

  await prisma.invoices.create({
    data: {
      invoice_number: BILLING_SEED_INVOICE,
      client_id: cairo.id,
      status: 'Sent',
      currency: 'EGP',
      subtotal: 15_000,
      discount_percentage: 0,
      discount_amount: 0,
      vat_percentage: 14,
      vat_amount: 2_100,
      total: 17_100,
      due_date: due,
      sent_at: new Date(),
      created_by: managerId,
      invoice_items: {
        create: [
          {
            description: 'Monthly retainer — social + performance',
            quantity: 1,
            unit_price: 15_000,
            amount: 15_000,
          },
        ],
      },
    },
  })

  const validUntil = new Date()
  validUntil.setUTCDate(validUntil.getUTCDate() + 30)

  await prisma.quotations.create({
    data: {
      quotation_number: BILLING_SEED_QUOTATION,
      client_id: dubai.id,
      status: 'Sent',
      currency: 'AED',
      subtotal: 28_000,
      total: 28_000,
      valid_until: validUntil,
      created_by: managerId,
      quotation_items: {
        create: [
          {
            description: 'Brand refresh + launch campaign',
            quantity: 1,
            unit_price: 28_000,
            amount: 28_000,
          },
        ],
      },
    },
  })

  return { invoices: 1, quotations: 1 }
}

const PROMPT_SEED_NAMES = ['SEO meta brief', 'Client check-in email'] as const

async function seedPrompts(managerId: string): Promise<number> {
  await prisma.prompts.deleteMany({ where: { name: { in: [...PROMPT_SEED_NAMES] } } })

  const templates = [
    {
      name: 'SEO meta brief',
      description: 'Generate title and meta description for a service page.',
      category: 'seo',
      template:
        'Write an SEO title (max 60 chars) and meta description (max 155 chars) for {{brand}} in {{market}}. Primary keyword: {{keyword}}.',
      variables: [
        { name: 'brand', label: 'Brand' },
        { name: 'market', label: 'Market' },
        { name: 'keyword', label: 'Keyword' },
      ],
      is_public: true,
    },
    {
      name: 'Client check-in email',
      description: 'Short monthly client update email.',
      category: 'sales',
      template:
        'Draft a concise check-in email to {{contact_name}} at {{client_name}}. Highlight wins: {{wins}}. Tone: professional, warm.',
      variables: [
        { name: 'contact_name', label: 'Contact' },
        { name: 'client_name', label: 'Client' },
        { name: 'wins', label: 'Wins' },
      ],
      is_public: true,
    },
  ] as const

  for (const item of templates) {
    await prisma.prompts.create({
      data: {
        name: item.name,
        description: item.description,
        category: item.category,
        template: item.template,
        variables: item.variables,
        created_by: managerId,
        is_public: item.is_public,
        status: 'Active',
        version: 1,
        prompt_versions: {
          create: {
            version: 1,
            template: item.template,
            changes: 'Seed template',
            created_by: managerId,
          },
        },
      },
    })
  }

  return templates.length
}

const CHANNEL_SEED_NAMES = ['#general', '#client-delivery'] as const

async function seedComms(
  managerId: string,
  contributorId: string,
): Promise<{ channels: number; messages: number }> {
  await prisma.messages.deleteMany({
    where: { channels: { name: { in: [...CHANNEL_SEED_NAMES] } } },
  })
  await prisma.channels.deleteMany({ where: { name: { in: [...CHANNEL_SEED_NAMES] } } })

  const general = await prisma.channels.create({
    data: {
      name: '#general',
      description: 'Company-wide announcements and async updates.',
      type: 'Public',
      created_by: managerId,
      members: [managerId, contributorId],
    },
  })

  const delivery = await prisma.channels.create({
    data: {
      name: '#client-delivery',
      description: 'Private coordination for active client work.',
      type: 'Private',
      created_by: managerId,
      members: [managerId, contributorId],
    },
  })

  const seedMessages = [
    {
      channel_id: general.id,
      user_id: managerId,
      content:
        'Welcome to the MediaBubble Communication Hub — refresh to see new messages (live updates coming later).',
    },
    {
      channel_id: general.id,
      user_id: contributorId,
      content: "Got it. I'll log blockers here instead of scattered DMs.",
    },
    {
      channel_id: delivery.id,
      user_id: managerId,
      content:
        'Cairo Retail retainer review is Friday — drop draft assets in Tasks before EOD Thursday.',
    },
  ]

  for (const item of seedMessages) {
    await prisma.messages.create({ data: item })
  }

  return { channels: 2, messages: seedMessages.length }
}

const WORKFLOW_SEED_NAMES = ['Review nudge', 'Timesheet reminder'] as const
const WORKFLOW_TEMPLATE_NAMES = ['Task review nudge', 'Time entry approval ping'] as const

async function seedAutomation(
  managerId: string,
  generalChannelId: string | null,
): Promise<{ workflows: number; templates: number }> {
  await prisma.workflow_executions.deleteMany({
    where: { workflows: { name: { in: [...WORKFLOW_SEED_NAMES] } } },
  })
  await prisma.workflows.deleteMany({ where: { name: { in: [...WORKFLOW_SEED_NAMES] } } })
  await prisma.workflow_templates.deleteMany({
    where: { name: { in: [...WORKFLOW_TEMPLATE_NAMES] } },
  })

  await prisma.workflows.create({
    data: {
      name: 'Review nudge',
      description: 'Log when a task should move to Review (manual test with task_id).',
      trigger: { type: 'task.status_changed', conditions: { status: 'In Progress' } },
      steps: [
        { action: 'log_message', params: { message: 'Task ready for review — notify PM.' } },
        { action: 'update_task_status', params: { status: 'Review' } },
      ],
      enabled: true,
      created_by: managerId,
    },
  })

  const steps = [
    { action: 'log_message', params: { message: 'Timesheet submitted — pending manager approval.' } },
  ]
  if (generalChannelId) {
    steps.push({
      action: 'post_channel_message',
      params: {
        channel_id: generalChannelId,
        content: 'A timesheet entry was submitted and awaits approval.',
      },
    })
  }

  await prisma.workflows.create({
    data: {
      name: 'Timesheet reminder',
      description: 'Notify #general when a time entry is submitted (test with channel in seed).',
      trigger: { type: 'time_entry.submitted' },
      steps,
      enabled: false,
      created_by: managerId,
    },
  })

  await prisma.workflow_templates.create({
    data: {
      name: 'Task review nudge',
      category: 'Operations',
      description: 'Move stalled in-progress tasks to Review and log the handoff.',
      workflow_config: {
        trigger: { type: 'task.status_changed' },
        steps: [
          { action: 'log_message', params: { message: 'Handoff to review' } },
          { action: 'update_task_status', params: { status: 'Review' } },
        ],
      },
      created_by: managerId,
      usage_count: 0,
    },
  })

  await prisma.workflow_templates.create({
    data: {
      name: 'Time entry approval ping',
      category: 'HR',
      description: 'Log a reminder when contributors submit timesheet hours.',
      workflow_config: {
        trigger: { type: 'time_entry.submitted' },
        steps: [
          {
            action: 'log_message',
            params: { message: 'Notify manager: timesheet pending approval.' },
          },
        ],
      },
      created_by: managerId,
      usage_count: 0,
    },
  })

  return { workflows: 2, templates: 2 }
}

const CAMPAIGN_SEED_PROPOSAL = 'PRP-SEED-0001'
const CAMPAIGN_SEED_NAME = 'Dubai Lifestyle — Summer Social'

async function seedCampaignsHub(managerId: string): Promise<{ proposals: number; campaigns: number }> {
  const dubai = await prisma.clients.findFirst({ where: { name: 'Dubai Lifestyle Co' } })
  const cairo = await prisma.clients.findFirst({ where: { name: 'Cairo Retail Group' } })
  if (!dubai || !cairo) return { proposals: 0, campaigns: 0 }

  await prisma.campaigns.deleteMany({ where: { name: CAMPAIGN_SEED_NAME } })
  await prisma.proposals.deleteMany({ where: { proposal_number: CAMPAIGN_SEED_PROPOSAL } })

  await prisma.proposals.create({
    data: {
      proposal_number: CAMPAIGN_SEED_PROPOSAL,
      client_id: cairo.id,
      title: 'Cairo Retail — Q3 omnichannel push',
      summary: 'SEO + paid social bundle for back-to-school season.',
      objectives: ['Lift foot traffic', 'Grow Instagram engagement'],
      deliverables: [
        { title: 'Paid social flight', description: '6-week Meta campaign' },
        { title: 'SEO landing refresh', description: 'Category pages + schema' },
      ],
      timeline_weeks: 10,
      budget_estimate: 42000,
      currency: 'EGP',
      status: 'Sent',
      created_by: managerId,
    },
  })

  await prisma.campaigns.create({
    data: {
      client_id: dubai.id,
      name: CAMPAIGN_SEED_NAME,
      brief: 'Always-on social + PPC for UAE lifestyle vertical.',
      market: 'ae',
      channels: ['social', 'ppc'],
      budget: 55000,
      currency: 'AED',
      status: 'Active',
      start_date: new Date(),
      created_by: managerId,
    },
  })

  return { proposals: 1, campaigns: 1 }
}

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

  const financeRows = await seedFinance()
  const holidayRows = await seedHolidays()
  const clientRows = await seedClients()
  const manager = await prisma.users.findUnique({ where: { email: 'manager@mediabubble.co' } })
  const contributor = await prisma.users.findUnique({ where: { email: 'creative@mediabubble.co' } })
  const billingRows = manager ? await seedBilling(manager.id) : { invoices: 0, quotations: 0 }
  const promptRows = manager ? await seedPrompts(manager.id) : 0
  const commsRows =
    manager && contributor ? await seedComms(manager.id, contributor.id) : { channels: 0, messages: 0 }
  const generalChannel = await prisma.channels.findFirst({ where: { name: '#general' } })
  const automationRows = manager
    ? await seedAutomation(manager.id, generalChannel?.id ?? null)
    : { workflows: 0, templates: 0 }
  const campaignsRows = manager ? await seedCampaignsHub(manager.id) : { proposals: 0, campaigns: 0 }

  // eslint-disable-next-line no-console -- seed scripts report their summary to stdout
  console.log(
    `Seeded ${DEPARTMENTS.length} departments, ${USERS.length} users ` +
      `(password: "${DEV_PASSWORD}"), ${financeRows} finance transactions, ` +
      `${holidayRows} holidays (Egypt + UAE), ${clientRows} CRM clients, ` +
      `${billingRows.invoices} invoice(s), ${billingRows.quotations} quotation(s), ` +
      `${promptRows} AI prompt(s), ${commsRows.channels} chat channel(s), ` +
      `${commsRows.messages} message(s), ${automationRows.workflows} workflow(s), ` +
      `${automationRows.templates} automation template(s), ${campaignsRows.proposals} proposal(s), ` +
      `and ${campaignsRows.campaigns} campaign(s).`,
  )
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
