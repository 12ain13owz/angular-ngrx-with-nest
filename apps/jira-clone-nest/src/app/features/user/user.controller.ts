import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterDto } from './dto/register.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async create(@Body() registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto)
    const result = { data: { uid: user.uid, email: user.email } }

    return result
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findByEmail(req.user.email)
    const result = { uid: user.uid, email: user.email }

    return result
  }
}
