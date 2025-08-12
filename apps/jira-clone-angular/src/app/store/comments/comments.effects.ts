import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs'

import { CommentsActions } from './comments.actions'
import { selectAuthUser } from '../auth/auth.selectors'
import { TasksService } from '../tasks/tasks.service'

@Injectable()
export class CommentsEffects {
  private actions$ = inject(Actions)
  private store = inject(Store)
  private tasksService = inject(TasksService)

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.loadComments),
      switchMap(({ taskId }) =>
        this.tasksService.getComments(taskId).pipe(
          map(comments => CommentsActions.loadCommentsSuccess({ comments })),
          catchError(error => of(CommentsActions.loadCommentsFailure({ error: error.message })))
        )
      )
    )
  )

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.addComment),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([{ taskId, content }, user]) => {
        if (!user || !user._id || !user.email)
          return of(CommentsActions.addCommentFailure({ error: 'User not found' }))

        return this.tasksService
          .addComment(taskId, {
            content,
            authorId: user._id as string,
            authorEmail: user.email as string,
          })
          .pipe(
            map(comment => CommentsActions.addCommentSuccess({ comment })),
            catchError(error => of(CommentsActions.addCommentFailure({ error: error.message })))
          )
      })
    )
  )

  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.updateComment),
      switchMap(({ taskId, commentId, content }) =>
        this.tasksService.updateComment(taskId, commentId, content).pipe(
          map(comment => CommentsActions.updateCommentSuccess({ comment })),
          catchError(error => of(CommentsActions.updateCommentFailure({ error: error.message })))
        )
      )
    )
  )

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.deleteComment),
      switchMap(({ taskId, commentId }) =>
        this.tasksService.deleteComment(taskId, commentId).pipe(
          map(comment => CommentsActions.deleteCommentSuccess({ comment })),
          catchError(error => of(CommentsActions.deleteCommentFailure({ error: error.message })))
        )
      )
    )
  )
}
