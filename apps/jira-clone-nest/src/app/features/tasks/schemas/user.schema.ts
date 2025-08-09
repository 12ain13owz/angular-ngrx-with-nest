import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { TaskStatus } from '../task.model'

export type TaskDocument = Task & Document

@Schema()
export class Task {
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
}

export const TaskSchema = SchemaFactory.createForClass(Task)
