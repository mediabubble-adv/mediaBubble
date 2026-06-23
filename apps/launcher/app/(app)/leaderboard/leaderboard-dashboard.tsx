'use client'

import { useMemo, useState } from 'react'
import {
  Trophy,
  Flame,
  Award,
  Zap,
  Clock,
  CheckCircle2,
  Lock,
  Users as UsersIcon,
  Globe,
} from 'lucide-react'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'

interface LeaderboardUser {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  role: string
  department: string
  xp: number
  level: number
  streak: number
  completedTasks: number
  comments: number
  hoursLogged: number
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export function LeaderboardDashboard({
  currentUserId,
  data,
}: {
  currentUserId: string
  data: LeaderboardUser[]
}) {
  const [filterMode, setFilterMode] = useState<'global' | 'department'>('global')

  // Find current user's details
  const currentUser = useMemo(() => {
    return data.find((u) => u.id === currentUserId)
  }, [data, currentUserId])

  // Filter and sort users by XP desc
  const rankedUsers = useMemo(() => {
    let list = data
    if (filterMode === 'department' && currentUser) {
      list = data.filter((u) => u.department === currentUser.department)
    }
    return [...list].sort((a, b) => b.xp - a.xp)
  }, [data, filterMode, currentUser])

  // Top 3 users for the podium
  const podium = useMemo(() => {
    const top3 = rankedUsers.slice(0, 3)
    // Arrange as: [2nd, 1st, 3rd] for visual presentation
    const result: (LeaderboardUser | null)[] = [null, null, null]
    if (top3[1]) result[0] = top3[1] // 2nd place on the left
    if (top3[0]) result[1] = top3[0] // 1st place in middle
    if (top3[2]) result[2] = top3[2] // 3rd place on the right
    return result
  }, [rankedUsers])

  // XP calculations for current user card
  const xpMetrics = useMemo(() => {
    if (!currentUser) return { currentLevelXp: 0, nextLevelXp: 100, progressPercent: 0, needed: 100 }
    const L = currentUser.level
    const currentThreshold = Math.pow(L - 1, 2) * 100
    const nextThreshold = Math.pow(L, 2) * 100
    const levelXp = currentUser.xp - currentThreshold
    const levelRange = nextThreshold - currentThreshold
    const progressPercent = Math.min(100, Math.max(0, (levelXp / levelRange) * 100))
    const needed = Math.max(0, nextThreshold - currentUser.xp)

    return {
      currentLevelXp: Math.min(levelXp, levelRange),
      nextLevelXp: levelRange,
      progressPercent,
      needed,
    }
  }, [currentUser])

  // Achievements Definition & Check for Current User
  const achievements = useMemo(() => {
    if (!currentUser) return []

    const list = [
      {
        id: 'first_task',
        title: 'First Flight',
        description: 'Complete your first task on the board',
        condition: currentUser.completedTasks >= 1,
        stat: `${currentUser.completedTasks}/1 task`,
        icon: CheckCircle2,
      },
      {
        id: 'deep_work',
        title: 'Deep Work Champion',
        description: 'Log 5+ hours of time in task timers',
        condition: currentUser.hoursLogged >= 5,
        stat: `${currentUser.hoursLogged}/5 hrs`,
        icon: Clock,
      },
      {
        id: 'collaborator',
        title: 'Active Collaborator',
        description: 'Write 3+ comments on tasks',
        condition: currentUser.comments >= 3,
        stat: `${currentUser.comments}/3 comments`,
        icon: Award,
      },
      {
        id: 'streak_3',
        title: 'Hot Streak',
        description: 'Maintain a 4+ day login streak',
        condition: currentUser.streak >= 4,
        stat: `${currentUser.streak}/4 days`,
        icon: Flame,
      },
      {
        id: 'centurion',
        title: 'Centurion',
        description: 'Accumulate 1,000 XP',
        condition: currentUser.xp >= 1000,
        stat: `${currentUser.xp}/1,000 XP`,
        icon: Zap,
      },
      {
        id: 'sweep',
        title: 'Clean Sweep',
        description: 'Complete 10+ tasks',
        condition: currentUser.completedTasks >= 10,
        stat: `${currentUser.completedTasks}/10 tasks`,
        icon: Trophy,
      },
    ]

    return list
  }, [currentUser])

  const unlockedCount = useMemo(() => {
    return achievements.filter((a) => a.condition).length
  }, [achievements])

  return (
    <PageFrame>
      <PageHeader
        icon={Trophy}
        title="Team Leaderboard"
        description="Earn XP by completing tasks, logging time, and collaborating."
        actions={
          <div className="flex rounded-lg border border-border bg-card p-1">
            <button
              onClick={() => setFilterMode('global')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold transition-[transform,background-color,color,border-color,opacity] ${
                filterMode === 'global'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Globe size={14} />
              Global
            </button>
            <button
              onClick={() => setFilterMode('department')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold transition-[transform,background-color,color,border-color,opacity] ${
                filterMode === 'department'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <UsersIcon size={14} />
              {currentUser?.department || 'Department'}
            </button>
          </div>
        }
      />

      <div className="mt-8 space-y-8">

        {/* Top Section: User Profile Card & Hot Streak */}
        {currentUser && (
          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4 2xl:gap-8">
            {/* XP Profile Card */}
            <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-border bg-card p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-[14px] font-extrabold text-primary">
                    {initials(currentUser.name)}
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-foreground">{currentUser.name}</h2>
                    <p className="text-[12px] text-muted-foreground">
                      Level {currentUser.level} · {currentUser.department}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-primary tabular-nums">{currentUser.xp}</span>
                  <span className="text-[11px] font-bold text-muted-foreground block uppercase tracking-wider">
                    Total XP
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
                  <span>LEVEL {currentUser.level}</span>
                  <span className="tabular-nums">
                    {xpMetrics.needed > 0
                      ? `${xpMetrics.currentLevelXp} / ${xpMetrics.nextLevelXp} XP · ${xpMetrics.needed} to Level ${currentUser.level + 1}`
                      : 'Ready to level up'}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-background overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-700 ease-[var(--ease-out)]"
                    style={{ width: `${xpMetrics.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Hot Streak Flame Card */}
            <div className="rounded-2xl border border-border bg-card p-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="relative">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#CA8A04]/10 text-[#CA8A04]">
                  <Flame size={36} className="fill-[#CA8A04] text-[#CA8A04]" />
                </div>
                <p className="mt-3 text-3xl font-black text-foreground tabular-nums">
                  {currentUser.streak}
                </p>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mt-1">
                  Active Login Streak
                </h3>
                <p className="text-[11px] text-muted-foreground/80 mt-1 max-w-[200px]">
                  Log in daily to keep your multiplier active and fuel the streak flame!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Podium (Visual 1st, 2nd, 3rd place columns) */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-[15px] font-bold text-foreground mb-6 text-center">Podium Standings</h2>
          <div className="flex items-end justify-center gap-4 pt-10 pb-4 max-w-lg mx-auto">
            {/* 2nd Place (Left) */}
            <div className="flex flex-col items-center flex-1">
              {podium[0] ? (
                <>
                  <div className="relative mb-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-border text-[12px] font-bold text-foreground border border-border">
                      {initials(podium[0].name)}
                    </div>
                    <span className="absolute -top-3 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-400 text-[10px] font-extrabold text-white">
                      2
                    </span>
                  </div>
                  <span className="text-[12px] font-bold text-foreground text-center truncate max-w-[90px]">
                    {podium[0].name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">Lvl {podium[0].level}</span>
                  <span className="text-[11px] font-extrabold text-muted-foreground/70 tabular-nums">
                    {podium[0].xp} XP
                  </span>
                </>
              ) : (
                <div className="h-10 w-10 rounded-full border border-dashed border-border" />
              )}
              <div className="mt-3 w-full bg-secondary border border-border rounded-t-xl h-24 flex items-center justify-center">
                <span className="text-xl font-black text-muted-foreground/70">2nd</span>
              </div>
            </div>

            {/* 1st Place (Center - tallest) */}
            <div className="flex flex-col items-center flex-1">
              {podium[1] ? (
                <>
                  <div className="relative mb-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-[14px] font-black text-primary border-2 border-primary">
                      {initials(podium[1].name)}
                    </div>
                    <span className="absolute -top-3 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-extrabold text-white">
                      1
                    </span>
                  </div>
                  <span className="text-[13px] font-extrabold text-foreground text-center truncate max-w-[100px]">
                    {podium[1].name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-primary font-bold">Lvl {podium[1].level}</span>
                  <span className="text-[11px] font-black text-primary tabular-nums">{podium[1].xp} XP</span>
                </>
              ) : (
                <div className="h-10 w-10 rounded-full border border-dashed border-border" />
              )}
              <div className="mt-3 w-full bg-primary/10 border border-primary/30 rounded-t-xl h-32 flex items-center justify-center">
                <span className="text-2xl font-black text-primary/70">1st</span>
              </div>
            </div>

            {/* 3rd Place (Right) */}
            <div className="flex flex-col items-center flex-1">
              {podium[2] ? (
                <>
                  <div className="relative mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border text-[11px] font-bold text-foreground border border-border">
                      {initials(podium[2].name)}
                    </div>
                    <span className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-700 text-[9px] font-extrabold text-white">
                      3
                    </span>
                  </div>
                  <span className="text-[12px] font-bold text-foreground text-center truncate max-w-[90px]">
                    {podium[2].name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">Lvl {podium[2].level}</span>
                  <span className="text-[11px] font-extrabold text-muted-foreground/70 tabular-nums">
                    {podium[2].xp} XP
                  </span>
                </>
              ) : (
                <div className="h-10 w-10 rounded-full border border-dashed border-border" />
              )}
              <div className="mt-3 w-full bg-secondary/60 border border-border rounded-t-xl h-16 flex items-center justify-center">
                <span className="text-lg font-black text-muted-foreground/60">3rd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ranked Table & Achievements */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Rankings Table */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-[15px] font-bold text-foreground mb-4">Rankings</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-bold">
                    <th className="py-2.5 pr-3 w-12 text-center">Rank</th>
                    <th className="px-3 py-2.5">User</th>
                    <th className="px-3 py-2.5">Department</th>
                    <th className="px-3 py-2.5 text-center">Level</th>
                    <th className="py-2.5 pl-3 text-right">XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rankedUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-muted-foreground">
                        No teammates here yet. Complete a task to earn your first XP.
                      </td>
                    </tr>
                  )}
                  {rankedUsers.map((u, idx) => {
                    const isMe = u.id === currentUserId
                    const rank = idx + 1

                    return (
                      <tr
                        key={u.id}
                        className={`hover:bg-border/20 ${
                          isMe ? 'bg-primary/5 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3 pr-3 text-center tabular-nums font-bold">
                          {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-border/50 text-[10px] font-bold">
                              {initials(u.name)}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-foreground flex items-center gap-1.5">
                                {u.name}
                                {isMe && (
                                  <span className="rounded bg-primary/15 px-1 py-0.5 text-[9px] font-bold text-primary uppercase">
                                    You
                                  </span>
                                )}
                              </span>
                              {u.streak > 0 && (
                                <div className="flex items-center gap-0.5 text-[#CA8A04] text-[10px] font-bold mt-0.5">
                                  <Flame size={10} className="fill-[#CA8A04]" />
                                  <span>{u.streak} day streak</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground truncate max-w-[120px]">
                          {u.department}
                        </td>
                        <td className="px-3 py-3 text-center font-bold text-muted-foreground tabular-nums">
                          {u.level}
                        </td>
                        <td className="py-3 pl-3 text-right font-bold text-foreground tabular-nums">
                          {u.xp}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-[15px] font-bold text-foreground">My Achievements</h2>
              <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-extrabold text-primary">
                {unlockedCount} / {achievements.length}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {achievements.map((a) => {
                const Icon = a.icon
                return (
                  <div
                    key={a.id}
                    className={`relative rounded-xl border p-3 flex gap-3 transition-[transform,background-color,color,border-color,opacity] duration-200 ease-[var(--ease-out)] overflow-hidden ${
                      a.condition
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-border bg-background/40 opacity-60'
                    }`}
                  >
                    {/* Icon wrapper */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        a.condition ? 'bg-primary/15 text-primary' : 'bg-border text-muted-foreground'
                      }`}
                    >
                      {a.condition ? <Icon size={18} /> : <Lock size={16} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[12px] font-bold text-foreground truncate">{a.title}</h4>
                        <span className="text-[10px] font-bold text-muted-foreground tabular-nums">
                          {a.stat}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                        {a.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </PageFrame>
  )
}
