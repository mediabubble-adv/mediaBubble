import type { ProfileUser } from '@/components/account/profile-form'

/** Shared Prisma select for profile detail pages (own + teammate). */
export const PROFILE_DETAIL_SELECT = {
  id: true,
  name: true,
  email: true,
  avatar_url: true,
  role: true,
  bio: true,
  linkedin_url: true,
  instagram_url: true,
  behance_url: true,
  website_url: true,
  last_login_at: true,
  departments_users_department_idTodepartments: { select: { name: true } },
  _count: {
    select: {
      tasks_tasks_assigned_toTousers: {
        where: { status: 'Done', deleted_at: null },
      },
      task_comments: { where: { deleted_at: null } },
    },
  },
  time_entries: { select: { duration_minutes: true } },
} as const

type ProfileDetailRow = {
  id: string
  name: string
  email: string
  avatar_url: string | null
  role: string
  bio: string | null
  linkedin_url: string | null
  instagram_url: string | null
  behance_url: string | null
  website_url: string | null
  last_login_at: Date | null
  departments_users_department_idTodepartments: { name: string } | null
  _count: {
    tasks_tasks_assigned_toTousers: number
    task_comments: number
  }
  time_entries: Array<{ duration_minutes: number | null }>
}

export function toProfileUser(row: ProfileDetailRow): ProfileUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    avatar_url: row.avatar_url,
    role: row.role,
    department: row.departments_users_department_idTodepartments?.name ?? null,
    bio: row.bio,
    linkedin_url: row.linkedin_url,
    instagram_url: row.instagram_url,
    behance_url: row.behance_url,
    website_url: row.website_url,
  }
}

export function gamificationInputFromProfileRow(row: ProfileDetailRow) {
  return {
    id: row.id,
    last_login_at: row.last_login_at,
    completedTasksCount: row._count.tasks_tasks_assigned_toTousers,
    commentsCount: row._count.task_comments,
    totalDurationMinutes: row.time_entries.reduce(
      (sum, entry) => sum + (entry.duration_minutes ?? 0),
      0,
    ),
  }
}
