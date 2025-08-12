import { createReducer, on } from '@ngrx/store'

import { CommentsActions } from './comments.actions'
import { CommentState } from './comments.model'

export const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: null,
}
export const commentsReducer = createReducer(
  initialState,
  on(CommentsActions.loadComments, state => ({
    ...state,
    comments: [],
    isLoading: true,
    error: null,
  })),
  on(CommentsActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments,
    isLoading: false,
    error: null,
  })),
  on(
    CommentsActions.addComment,
    CommentsActions.updateComment,
    CommentsActions.deleteComment,
    state => ({
      ...state,
      comments: [...state.comments],
      isLoading: true,
    })
  ),
  on(CommentsActions.addCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: [...state.comments, comment],
    isLoading: false,
    error: null,
  })),
  on(CommentsActions.updateCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: state.comments.map(c => (c._id === comment._id ? comment : c)),
    isLoading: false,
    error: null,
  })),
  on(CommentsActions.deleteCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: state.comments.filter(c => c._id !== comment._id),
    isLoading: false,
    error: null,
  })),
  on(
    CommentsActions.loadCommentsFailure,
    CommentsActions.addCommentFailure,
    CommentsActions.updateCommentFailure,
    CommentsActions.deleteCommentFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })
  )
)
