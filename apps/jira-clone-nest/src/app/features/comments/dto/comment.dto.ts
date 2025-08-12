import { CommentsDocument } from '../../../databases/schemas/comments.schema'

export class CreateCommentDto {
  authorId: string
  authorEmail: string
  content: string
}

export type UpdateCommentDto = Pick<CreateCommentDto, 'content'>

export class CommentResponseDto {
  _id: string
  taskId: string
  authorId: string
  authorEmail: string
  content: string
  createdAt?: Date

  constructor(comment: CommentsDocument) {
    this._id = comment._id.toString()
    this.taskId = comment.taskId
    this.authorId = comment.authorId
    this.authorEmail = comment.authorEmail
    this.content = comment.content
    this.createdAt = comment.createdAt
  }
}
