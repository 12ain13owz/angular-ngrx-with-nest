import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto, TaskResponseDto, TasksResponseDto, UpdateTaskDto } from './dto/task.dto'
import { InjectModel } from '@nestjs/mongoose'
import { isValidObjectId, Model } from 'mongoose'
import { Task, TaskDocument } from '../../databases/schemas/task.schema'

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const newTask = await this.taskModel.create(createTaskDto)
    return new TaskResponseDto(newTask)
  }

  async findAll(): Promise<TasksResponseDto | []> {
    const tasks = await this.taskModel.find().exec()
    return new TasksResponseDto(tasks)
  }

  async findOne(id: string): Promise<TaskResponseDto | null | NotFoundException> {
    const task = await this.taskModel.findById(id).exec()
    if (!task) throw new NotFoundException(`Task with ID "${id}" not found.`)

    return new TaskResponseDto(task)
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<TaskResponseDto | NotFoundException> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec()
    if (!updatedTask) throw new NotFoundException(`Task with ID "${id}" not found.`)

    return new TaskResponseDto(updatedTask)
  }

  async remove(id: string): Promise<TaskResponseDto | NotFoundException> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec()
    if (!deletedTask) throw new NotFoundException(`Task with ID "${id}" not found.`)

    return new TaskResponseDto(deletedTask)
  }
}
