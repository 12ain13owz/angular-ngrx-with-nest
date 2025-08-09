import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Task, TaskDocument } from './schemas/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await this.taskModel.create(createTaskDto)
    return newTask
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec()
    return tasks
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec()
    if (!task) throw new NotFoundException(`Task with ID "${id}" not found.`)

    return task
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec()
    if (!updatedTask) throw new NotFoundException(`Task with ID "${id}" not found.`)

    return updatedTask
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec()
    if (!deletedTask) throw new NotFoundException(`Task with ID "${id}" not found.`)

    return deletedTask
  }
}
