export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  _id: string
  title: string
  description: string
  status: TaskStatus
  reporterId: string
  assigneeId?: string
}

export interface TasksState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
}

export interface TaskResponse {
  tasks: Task[]
  count: number
}
