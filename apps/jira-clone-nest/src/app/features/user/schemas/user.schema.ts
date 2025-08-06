import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { hashSync } from 'bcrypt'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true, default: () => uuidv4() })
  uid: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) this.password = hashSync(this.password, 10)
  next()
})
