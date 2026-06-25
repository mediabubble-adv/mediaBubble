import { prisma } from '@/lib/db/prisma'

export const TOOL_ORDER_KEY = 'dashboard_tool_order'
export const MODULE_USAGE_KEY = 'dashboard_module_usage'

export type ModuleUsageMap = Record<string, number>

export async function getDashboardPrefs(userId: string) {
  const rows = await prisma.settings.findMany({
    where: {
      user_id: userId,
      key: { in: [TOOL_ORDER_KEY, MODULE_USAGE_KEY] },
    },
    select: { key: true, value: true },
  })

  let toolOrder: string[] | null = null
  let moduleUsage: ModuleUsageMap = {}

  for (const row of rows) {
    if (row.key === TOOL_ORDER_KEY && Array.isArray(row.value)) {
      toolOrder = row.value.filter((v): v is string => typeof v === 'string')
    }
    if (row.key === MODULE_USAGE_KEY && row.value && typeof row.value === 'object' && !Array.isArray(row.value)) {
      moduleUsage = Object.fromEntries(
        Object.entries(row.value as Record<string, unknown>).filter(
          (entry): entry is [string, number] => typeof entry[1] === 'number',
        ),
      )
    }
  }

  return { toolOrder, moduleUsage }
}

export async function saveToolOrder(userId: string, order: string[]) {
  await prisma.settings.upsert({
    where: { user_id_key: { user_id: userId, key: TOOL_ORDER_KEY } },
    update: { value: order, updated_at: new Date() },
    create: { user_id: userId, key: TOOL_ORDER_KEY, value: order },
  })
}

export async function recordModuleVisit(userId: string, moduleId: string) {
  const current = await prisma.settings.findUnique({
    where: { user_id_key: { user_id: userId, key: MODULE_USAGE_KEY } },
    select: { value: true },
  })

  const usage: ModuleUsageMap =
    current?.value && typeof current.value === 'object' && !Array.isArray(current.value)
      ? Object.fromEntries(
          Object.entries(current.value as Record<string, unknown>).filter(
            (entry): entry is [string, number] => typeof entry[1] === 'number',
          ),
        )
      : {}

  usage[moduleId] = (usage[moduleId] ?? 0) + 1

  await prisma.settings.upsert({
    where: { user_id_key: { user_id: userId, key: MODULE_USAGE_KEY } },
    update: { value: usage, updated_at: new Date() },
    create: { user_id: userId, key: MODULE_USAGE_KEY, value: usage },
  })

  return usage
}
