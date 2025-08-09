import { ConflictException, Injectable } from '@nestjs/common'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AuthResponseDto, RegisterDto, UserResponseDto } from './dto/auth.dto'
import { ERROR_MESSAGES } from '../../common/const/error-message.const'
import { User, UserDocument } from '../../databases/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email }).exec()
    if (!user) return null
    if (!compareSync(password, user.password)) return null

    return user
  }

  async register(registerDto: RegisterDto): Promise<UserResponseDto> {
    const { email, password, name } = registerDto
    const existingUser = await this.userModel.findOne({ email }).exec()
    if (existingUser) throw new ConflictException(ERROR_MESSAGES.EMAIL_EXISTS)

    const newUser = await this.userModel.create({ email, password, name })
    return new UserResponseDto(newUser)
  }

  async login(user: UserDocument): Promise<AuthResponseDto> {
    const { _id, email } = user
    const accesstoken = this.jwtService.sign({ sub: _id, email })

    return new AuthResponseDto(user, accesstoken)
  }

  async logout(): Promise<{ message: string }> {
    return { message: 'ok' }
  }

  async getProfile(_id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(_id).exec()
    return new UserResponseDto(user)
  }
}
