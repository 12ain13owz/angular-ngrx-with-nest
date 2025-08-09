import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { TasksModel } from '../../databases/models/tasks.model'

@Module({
  imports: [MongooseModule.forFeature([TasksModel])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
