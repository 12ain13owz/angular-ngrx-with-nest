import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/v1/auth/login')
  getData() {
    return this.appService.getData()
  }

  @Post('/v1/auth/login')
  postData() {
    return this.appService.getData()
  }
}
