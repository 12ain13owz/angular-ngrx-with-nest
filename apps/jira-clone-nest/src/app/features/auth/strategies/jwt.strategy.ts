import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { ERROR_MESSAGES } from '../../../common/const/error-message.const'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: any) {
    if (!payload) throw new UnauthorizedException(ERROR_MESSAGES.TOKEN_INVALID)
    return { uid: payload.uid, email: payload.email }
  }
}
