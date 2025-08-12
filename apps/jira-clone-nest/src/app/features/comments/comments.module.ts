import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CommentsModel } from '../../databases/models/comments.model'

@Module({
  imports: [MongooseModule.forFeature([CommentsModel])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
