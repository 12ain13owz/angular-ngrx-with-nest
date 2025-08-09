import { ModelDefinition } from '@nestjs/mongoose'
import { User, UserSchema } from '../schemas/user.schema'

export const UserModel: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
}
