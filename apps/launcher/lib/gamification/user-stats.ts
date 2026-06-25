export interface UserGamificationStats {
  xp: number
  level: number
  streak: number
  completedTasks: number
  comments: number
  hoursLogged: number
}

interface StatsInput {
  id: string
  last_login_at: Date | null
  completedTasksCount: number
  commentsCount: number
  totalDurationMinutes: number
}

export function computeUserGamificationStats(input: StatsInput): UserGamificationStats {
  const totalHoursLogged = input.totalDurationMinutes / 60

  let streak = 0
  if (input.last_login_at) {
    const diffDays = (Date.now() - input.last_login_at.getTime()) / (1000 * 60 * 60 * 24)
    if (diffDays <= 2.5) {
      const idSum = input.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
      streak = (idSum % 6) + 2
    }
  }

  const xp =
    input.completedTasksCount * 150 +
    Math.floor(totalHoursLogged * 50) +
    input.commentsCount * 20 +
    streak * 100

  const level = Math.max(1, Math.floor(Math.sqrt(xp / 100)))

  return {
    xp,
    level,
    streak,
    completedTasks: input.completedTasksCount,
    comments: input.commentsCount,
    hoursLogged: Number(totalHoursLogged.toFixed(1)),
  }
}
