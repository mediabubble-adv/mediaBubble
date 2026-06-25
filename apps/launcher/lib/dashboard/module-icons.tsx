'use client'

import {
  CheckSquare,
  Wallet,
  Trophy,
  Clock,
  Building2,
  Bot,
  MessageSquare,
  Workflow,
  Megaphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { ModuleIconId } from '@/lib/dashboard/modules'

export const MODULE_ICONS: Record<ModuleIconId, LucideIcon> = {
  'check-square': CheckSquare,
  clock: Clock,
  'building-2': Building2,
  megaphone: Megaphone,
  wallet: Wallet,
  sparkles: Sparkles,
  bot: Bot,
  workflow: Workflow,
  'message-square': MessageSquare,
  trophy: Trophy,
}

export function getModuleIcon(iconId: ModuleIconId): LucideIcon {
  return MODULE_ICONS[iconId]
}
