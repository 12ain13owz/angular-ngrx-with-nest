import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator'
import { UserDocument } from '../../../databases/schemas/user.schema'

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  @IsNotEmpty()
  name: string
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class UserResponseDto {
  _id: string
  email: string
  name: string

  constructor(user: UserDocument) {
    this._id = user._id.toString()
    this.email = user.email
    this.name = user.name
  }
}

export class AuthResponseDto {
  user: UserResponseDto
  accessToken: string

  constructor(user: UserDocument, token: string) {
    this.user = new UserResponseDto(user)
    this.accessToken = token
  }
}
