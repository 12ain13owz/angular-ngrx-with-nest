import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'

const model: ModelDefinition[] = [{ name: User.name, schema: UserSchema }]

@Module({
  imports: [MongooseModule.forFeature(model)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
