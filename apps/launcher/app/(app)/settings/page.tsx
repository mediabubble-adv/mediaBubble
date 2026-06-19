import type { Metadata } from 'next'
import { Settings } from 'lucide-react'
import { ModulePlaceholder } from '../_shell/module-placeholder'

export const metadata: Metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <ModulePlaceholder
      icon={Settings}
      title="Settings"
      description="Profile, team, and workspace preferences."
      status="Phase 2"
    />
  )
}
