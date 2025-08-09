import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const { accessToken } = await this.authService.login(req.user)
    const result = { data: req.user, accessToken: accessToken }

    return result
  }

  @Post('/logout')
  async logout() {
    const result = await this.authService.logout()
    return result
  }
}
