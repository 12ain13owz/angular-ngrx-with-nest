import { ModelDefinition } from '@nestjs/mongoose'
import { Task, TaskSchema } from '../schemas/task.schema'

export const TaskModel: ModelDefinition = {
  name: Task.name,
  schema: TaskSchema,
}
