import { createFeatureSelector, createSelector } from '@ngrx/store'

import { CommentState, CommentWithAuthName } from './comments.model'
import { selectAllUsers } from '../users/users.selectors'

export const selectCommentsState = createFeatureSelector<CommentState>('comments')
export const selectAllComments = createSelector(
  selectCommentsState,
  (state: CommentState) => state.comments
)
export const selectCommentsWithAuthorDetails = createSelector(
  selectAllComments,
  selectAllUsers,
  (comments, users): CommentWithAuthName[] => {
    const userMap = new Map(users.map(user => [user._id, user.name]))
    return comments.map(comment => ({
      ...comment,
      authorName: userMap.get(comment.authorId),
    }))
  }
)
