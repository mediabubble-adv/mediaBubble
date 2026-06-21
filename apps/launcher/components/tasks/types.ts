export interface BoardTask {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  assigned_to: string | null
  tags: string[]
  due_date: string | null
}

export interface BoardMember {
  id: string
  name: string
}
