import { ModelDefinition } from '@nestjs/mongoose'
import { Comments, CommentsSchema } from '../schemas/comments.schema'

export const CommentsModel: ModelDefinition = {
  name: Comments.name,
  schema: CommentsSchema,
}
