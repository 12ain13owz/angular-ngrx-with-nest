import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

@Schema({ timestamps: true })
export class Comments {
  _id?: ObjectId

  @Prop()
  taskId: string

  @Prop()
  authorId: string

  @Prop()
  authorEmail: string

  @Prop()
  content: string

  createdAt?: Date
  updatedAt?: Date
}

export const CommentsSchema = SchemaFactory.createForClass(Comments)
export type CommentsDocument = Comments & Document
