import type { Metadata } from 'next'
import { Trophy } from 'lucide-react'
import { ModulePlaceholder } from '../_shell/module-placeholder'

export const metadata: Metadata = { title: 'Leaderboard' }

export default function LeaderboardPage() {
  return (
    <ModulePlaceholder
      icon={Trophy}
      title="Leaderboard"
      description="XP levels, hot streaks, Top 3 podium, achievements."
      status="Week 4"
    />
  )
}
