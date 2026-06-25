export interface BoardClient {
  id: string
  name: string
}

export interface TaskAssignee {
  id: string
  name: string
  avatar_url: string | null
}

export interface BoardTask {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  assigned_to: string | null
  assignees: TaskAssignee[]
  tags: string[]
  due_date: string | null
  client_id: string | null
  client_name: string | null
  subtask_done: number
  subtask_total: number
}

export interface BoardMember {
  id: string
  name: string
  avatar_url?: string | null
}
