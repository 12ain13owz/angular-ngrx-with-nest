import { createActionGroup, props } from '@ngrx/store'

import { Comment } from './comments.model'

export const CommentsActions = createActionGroup({
  source: 'Comments',
  events: {
    LoadComments: props<{ taskId: string }>(),
    LoadCommentsSuccess: props<{ comments: Comment[] }>(),
    LoadCommentsFailure: props<{ error: string }>(),

    AddComment: props<{ taskId: string; content: string }>(),
    AddCommentSuccess: props<{ comment: Comment }>(),
    AddCommentFailure: props<{ error: string }>(),

    UpdateComment: props<{ taskId: string; commentId: string; content: string }>(),
    UpdateCommentSuccess: props<{ comment: Comment }>(),
    UpdateCommentFailure: props<{ error: string }>(),

    DeleteComment: props<{ taskId: string; commentId: string }>(),
    DeleteCommentSuccess: props<{ comment: Comment }>(),
    DeleteCommentFailure: props<{ error: string }>(),
  },
})
