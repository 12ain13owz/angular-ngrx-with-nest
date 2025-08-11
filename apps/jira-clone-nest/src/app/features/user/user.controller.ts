import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.findAll()
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findOne(id)
  }
}
