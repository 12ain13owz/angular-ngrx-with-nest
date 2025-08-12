import { Injectable } from '@nestjs/common'
import { CommentResponseDto, CreateCommentDto, UpdateCommentDto } from './dto/comment.dto'
import { InjectModel } from '@nestjs/mongoose'
import { CommentsDocument, Comments } from '../../databases/schemas/comments.schema'
import { Model } from 'mongoose'

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments.name) private readonly commentModel: Model<CommentsDocument>) {}

  async create(taskId: string, createCommentDto: CreateCommentDto): Promise<CommentResponseDto> {
    const payload = { ...createCommentDto, taskId }
    const newComment = await this.commentModel.create(payload)
    return new CommentResponseDto(newComment)
  }

  async findAll(taskId: string): Promise<CommentResponseDto[]> {
    const comments = await this.commentModel.find({ taskId }).exec()
    return comments.map(comment => new CommentResponseDto(comment))
  }

  async update(taskId: string, commentId: string, updateCommentDto: UpdateCommentDto) {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate({ _id: commentId, taskId }, updateCommentDto, { new: true })
      .exec()
    return new CommentResponseDto(updatedComment)
  }

  async delete(taskId: string, commentId: string): Promise<CommentResponseDto> {
    const deletedComment = await this.commentModel
      .findByIdAndDelete({ _id: commentId, taskId })
      .exec()
    return new CommentResponseDto(deletedComment)
  }
}
