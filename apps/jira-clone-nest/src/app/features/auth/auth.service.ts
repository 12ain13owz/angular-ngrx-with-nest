import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { compareSync } from 'bcrypt'
import { UserResponse } from '../user/user.types'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<UserResponse | null> {
    const user = await this.userService.findByEmail(email)

    if (!user) return null
    if (!compareSync(password, user.password)) return null

    const result = { uid: user.uid, email: user.email }
    return result
  }

  async login(user: UserResponse): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.uid }
    return { accessToken: this.jwtService.sign(payload) }
  }
}
