import { ModelDefinition } from '@nestjs/mongoose'
import { Tasks, TasksSchema } from '../schemas/tasks.schema'

export const TasksModel: ModelDefinition = {
  name: Tasks.name,
  schema: TasksSchema,
}
