import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { ERROR_MESSAGES } from '../../../common/const/error-message.const'
import { UserDocument } from '../../../databases/schemas/user.schema'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<UserDocument | UnauthorizedException> {
    const user = await this.authService.validateUser(email, password)
    if (!user) throw new UnauthorizedException(ERROR_MESSAGES.AUTH_FAILED)

    return user
  }
}
