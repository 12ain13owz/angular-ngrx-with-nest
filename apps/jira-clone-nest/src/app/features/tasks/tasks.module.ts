import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskModel } from '../../databases/models/task.model'

@Module({
  imports: [MongooseModule.forFeature([TaskModel])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
