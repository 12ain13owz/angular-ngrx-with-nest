import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { RegisterDto } from './dto/register.dto'
import { ERROR_MESSAGES } from '../../common/const/error-message.const'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: registerDto.email }).exec()
    if (existingUser) throw new ConflictException(ERROR_MESSAGES.EMAIL_EXISTS)

    const newUser = new this.userModel(registerDto)
    return newUser.save()
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec()
  }
}
