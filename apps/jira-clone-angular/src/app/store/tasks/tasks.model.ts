type Status = 'To Do' | 'In Progress' | 'Done'

export interface Task {
  _id: string
  title: string
  description: string
  status: Status
  reporterId: string
  assigneeId?: string
}

export interface TasksState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
}
