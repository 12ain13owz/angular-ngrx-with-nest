import { TasksDocument } from '../../../databases/schemas/tasks.schema'
import { TaskStatus } from '../../../databases/types/task.type'

export class CreateTaskDto {
  title: string
  description: string
  status: TaskStatus
  reporterId: string
  assigneeId?: string
}

export type UpdateTaskDto = Partial<CreateTaskDto>

export class TaskResponseDto {
  _id: string
  title: string
  description: string
  status: TaskStatus
  reporterId: string
  assigneeId?: string

  constructor(task: TasksDocument) {
    this._id = task._id.toString()
    this.title = task.title
    this.description = task.description
    this.status = task.status
    this.reporterId = task.reporterId
    this.assigneeId = task.assigneeId
  }
}

export class TasksResponseDto {
  tasks: TaskResponseDto[]
  count: number

  constructor(tasks: TasksDocument[]) {
    this.tasks = tasks.map(task => new TaskResponseDto(task))
    this.count = tasks.length
  }
}
