import { test, expect } from '@playwright/test'

test.describe('Launcher E2E Flow', () => {
  test('should login, navigate to tasks, create a task, log time, and drag between columns', async ({
    page,
  }) => {
    // 1. Login
    await page.goto('/login')
    await page.fill('input[name="email"]', 'creative@mediabubble.co')
    await page.fill('input[name="password"]', 'Launch@2026')
    await page.click('button[type="submit"]')

    // Verify redirected to Dashboard (increase timeout for Next.js dev compilation)
    await expect(page).toHaveURL('/', { timeout: 20000 })
    await expect(page.locator('text=Welcome')).toBeVisible({ timeout: 15000 })

    // 2. Navigate to Tasks
    await page.click('text=Tasks')
    await expect(page).toHaveURL('/tasks', { timeout: 15000 })

    // 3. Create a unique task in Backlog
    const uniqueTitle = `E2E Auto Task ${Date.now()}`
    const taskInput = page.getByPlaceholder('Add a task…')
    await expect(taskInput).toBeVisible({ timeout: 15000 })
    await taskInput.fill(uniqueTitle)
    await taskInput.press('Enter')

    // Verify task is created in Backlog column
    const taskCard = page.locator('article').filter({ hasText: uniqueTitle })
    await expect(taskCard).toBeVisible({ timeout: 10000 })

    // 4. Start & Stop the inline timer
    const playBtn = taskCard.locator('button[aria-label="Start timer"]')
    await expect(playBtn).toBeVisible()
    await playBtn.click()

    // Verify active/running state (Stop timer action becomes visible)
    const stopBtn = taskCard.locator('button[aria-label="Stop timer"]')
    await expect(stopBtn).toBeVisible()

    // Wait for a second so timer ticks
    await page.waitForTimeout(1500)

    // Stop timer
    await stopBtn.click()

    // Verify timer returns to start state
    await expect(playBtn).toBeVisible()

    // 5. Drag task to "In Progress" column
    const targetColumn = page
      .locator('div')
      .filter({ has: page.locator('span', { hasText: 'In Progress' }) })
      .first()

    await taskCard.dragTo(targetColumn)

    // Verify task is now inside the "In Progress" column
    const movedTask = targetColumn.locator('article').filter({ hasText: uniqueTitle })
    await expect(movedTask).toBeVisible()
  })
})
