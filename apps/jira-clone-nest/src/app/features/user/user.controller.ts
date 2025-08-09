import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getProfile(@Request() req) {
    return 'profile'
  }
}
