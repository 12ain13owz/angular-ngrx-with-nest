import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../../databases/schemas/user.schema'
import { Model } from 'mongoose'
import { UserResponseDto } from '../auth/dto/auth.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(id: string): Promise<UserResponseDto | NotFoundException> {
    const user = await this.userModel.findById(id).exec()
    if (!user) throw new NotFoundException(`User with ID "${id}" not found.`)

    return new UserResponseDto(user)
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().exec()
    return users.map(user => new UserResponseDto(user))
  }
}
