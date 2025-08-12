import { TasksDocument } from '../../../databases/schemas/tasks.schema'
import { TaskStatus } from '../../../databases/types/tasks.type'

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
