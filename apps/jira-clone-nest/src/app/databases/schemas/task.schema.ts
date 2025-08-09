import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { TaskStatus } from '../types/task.type'

@Schema({ timestamps: true })
export class Task {
  _id?: Types.ObjectId

  @Prop()
  title: string

  @Prop()
  description: string

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus

  @Prop()
  reporterId: string

  @Prop()
  assigneeId?: string

  createdAt?: Date
  updatedAt?: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)
export type TaskDocument = Task & Document
