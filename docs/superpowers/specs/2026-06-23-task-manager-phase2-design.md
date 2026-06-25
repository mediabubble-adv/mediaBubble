# Task Manager Phase 2 — Design Spec

**Product:** MediaBubble Launcher  
**Date:** 2026-06-23  
**Status:** Approved for implementation  
**Builds on:** `2026-06-23-task-manager-v2-design.md` (Phase 1)

---

## 1. Goals

ClickUp-grade assignment UX: multiple assignees per parent/subtask, rich dashboard context for subtask work, save-as-template, dense task board with avatars, and activity notifications for assignees.

## 2. Decisions log

| Topic | Decision |
|-------|----------|
| Multi-assignee | `task_assignees` junction on parent + subtasks |
| Dashboard subtasks | Grouped: `N subtasks of [title] for [client]` |
| Save template | Personal default; optional `is_public` |
| Notifications | Assign/unassign + status/assignee/subtask activity |
| Board polish | ClickUp-inspired dense cards |
| Avatars | `users.avatar_url` + initials fallback |

## 3. Data model

### `task_assignees`

- `task_id`, `user_id` unique
- `assigned_by`, `created_at`
- Indexes on `user_id`, `task_id`

Migration backfills from `tasks.assigned_to`. APIs write assignees via junction; `assigned_to` synced to **first** assignee for legacy profile/leaderboard counts until those queries migrate.

### Template save payload

From live task: name, description, default_priority, default_tags, subtasks `[{ title, assignee_ids? }]`, `is_public`.

## 4. Dashboard

Query parent tasks + subtasks where user ∈ `task_assignees`. Group subtasks by parent. Render grouped rows linking to `/tasks?task={parentId}`.

## 5. UI

- **Board cards:** client, avatar stack, progress, dense metadata
- **Workspace:** multi-assignee chips; comment avatars; Save as template menu
- **`UserAvatar`:** shared component xs/sm/md

## 6. Notifications

| Event | Recipients |
|-------|------------|
| Added/removed assignee | Affected user |
| Status change | All task assignees |
| Subtask completed | Parent assignees |
| Assignee change (activity) | New assignees on task |
| @mention | Mentioned users |

## 7. APIs

- `assignee_ids` on create/update task & subtask
- `PATCH /api/tasks/[id]/assignees` replace set
- `POST /api/tasks/templates` with `{ task_id, name, is_public? }` save-as-template
- Task responses include `assignees: { id, name, avatar_url }[]`

## 8. Out of scope

Due-date email/push, list view toggle, client portal, campaign links.
