import { Status } from '../task.model'

export class CreateTaskDto {
  readonly title: string
  readonly description: string
  readonly status: Status
  readonly reporterId: string
  readonly assigneeId?: string
}
