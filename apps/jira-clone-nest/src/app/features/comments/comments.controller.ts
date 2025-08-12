import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Param('taskId') taskId: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(taskId, createCommentDto)
  }

  @Get()
  findAll(@Param('taskId') taskId: string) {
    return this.commentsService.findAll(taskId)
  }

  @Patch(':commentId')
  update(
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return this.commentsService.update(taskId, commentId, updateCommentDto)
  }

  @Delete(':commentId')
  remove(@Param('taskId') taskId: string, @Param('commentId') commentId: string) {
    return this.commentsService.delete(taskId, commentId)
  }
}
