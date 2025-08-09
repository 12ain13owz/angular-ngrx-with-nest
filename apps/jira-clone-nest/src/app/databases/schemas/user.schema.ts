import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { hashSync } from 'bcrypt'

@Schema({ timestamps: true })
export class User {
  _id?: Types.ObjectId

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  name: string

  createdAt?: Date
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
export type UserDocument = User & Document

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) this.password = hashSync(this.password, 10)
  next()
})
