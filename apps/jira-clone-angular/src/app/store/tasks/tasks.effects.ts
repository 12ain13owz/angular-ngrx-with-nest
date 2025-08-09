import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'

import { TasksActions } from './tasks.actions'
import { TasksService } from './tasks.service'

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions)
  private tasksServiec = inject(TasksService)

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() =>
        this.tasksServiec.getTasks().pipe(
          map(tasks => TasksActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TasksActions.loadTasksFailure({ error: error.message })))
        )
      )
    )
  )
}
