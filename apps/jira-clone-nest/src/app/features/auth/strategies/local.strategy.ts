import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { UserResponse } from '../../user/user.types'
import { ERROR_MESSAGES } from '../../../common/const/error-message.const'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<UserResponse | UnauthorizedException> {
    const user = await this.authService.validateUser(email, password)
    if (!user) throw new UnauthorizedException(ERROR_MESSAGES.AUTH_FAILED)

    return user
  }
}
