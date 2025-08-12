import { Module } from '@nestjs/common'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './features/auth/auth.module'
import { UserModule } from './features/user/user.module'
import { TasksModule } from './features/tasks/tasks.module'
import { CommentsModule } from './features/comments/comments.module'

const configOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  isGlobal: true,
}

const mongooseUri = process.env.MONGODB_URI
const mongooseOptions: MongooseModuleOptions = {
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASS,
  dbName: process.env.MONGODB_DB,
}

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRoot(mongooseUri, mongooseOptions),
    AuthModule,
    UserModule,
    TasksModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
