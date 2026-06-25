import { computeUserGamificationStats } from './user-stats'

describe('computeUserGamificationStats', () => {
  it('computes level from XP', () => {
    const stats = computeUserGamificationStats({
      id: 'abc',
      last_login_at: null,
      completedTasksCount: 10,
      commentsCount: 5,
      totalDurationMinutes: 120,
    })
    expect(stats.completedTasks).toBe(10)
    expect(stats.comments).toBe(5)
    expect(stats.hoursLogged).toBe(2)
    expect(stats.xp).toBe(10 * 150 + 100 + 5 * 20)
    expect(stats.level).toBeGreaterThanOrEqual(1)
  })
})
