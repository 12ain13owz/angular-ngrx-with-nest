import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'

import { UserResponse } from '../../user/user.types'

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
    return { userId: payload.sub, username: payload.username }
  }

  async login(user: UserResponse) {
    // const payload = { email: user.email, sub: user.uid }
    // return { accessToken: this.jwt}
  }
}
