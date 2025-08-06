/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import morgan from 'morgan'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api/v1'
  app.enableCors()
  app.setGlobalPrefix(globalPrefix)
  app.use(morgan('dev'))

  const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
