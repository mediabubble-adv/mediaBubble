# Task Manager Phase 2 Implementation Plan

**Goal:** Multi-assignee tasks, grouped dashboard assignments, save-as-template, ClickUp-dense board, avatars, and assignee activity notifications.

**Architecture:** `task_assignees` junction table; `lib/tasks/assignees.ts` for sync + notification diffs; extend dashboard query; shared `UserAvatar`.

**Tech Stack:** Next.js App Router, Prisma, Zod, Tailwind, existing `notifications` table.

---

### Task 1: Schema + assignees lib
- Migration `task_assignees` + backfill from `assigned_to`
- `lib/tasks/assignees.ts`, `lib/dashboard/assignments.ts` + tests

### Task 2: APIs
- Create/update tasks with `assignee_ids`
- `PATCH /api/tasks/[id]/assignees`
- Activity notification fan-out
- `POST /api/tasks/templates` save-from-task

### Task 3: Dashboard
- Server query via `task_assignees`
- Grouped subtask rows in `DashboardView`

### Task 4: UI
- `UserAvatar` component
- Dense `TaskCard`, board filters by assignee membership
- Workspace multi-assignee, comment avatars, save template
- `?task=` deep link on board

**Verify:** `npm run test:launcher`
