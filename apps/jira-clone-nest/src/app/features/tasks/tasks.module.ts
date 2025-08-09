import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from './schemas/user.schema'

const model: ModelDefinition[] = [{ name: Task.name, schema: TaskSchema }]

@Module({
  imports: [MongooseModule.forFeature(model)],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
