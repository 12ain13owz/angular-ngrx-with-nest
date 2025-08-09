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
          map(res => TasksActions.loadTasksSuccess({ tasks: res.tasks })),
          catchError(error => of(TasksActions.loadTasksFailure({ error: error.message })))
        )
      )
    )
  )

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      switchMap(({ task }) =>
        this.tasksServiec.addTask(task).pipe(
          map(task => TasksActions.addTaskSuccess({ task })),
          catchError(error => of(TasksActions.addTaskFailure({ error: error.message })))
        )
      )
    )
  )

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      switchMap(({ task }) =>
        this.tasksServiec.updateTask(task).pipe(
          map(task => TasksActions.updateTaskSuccess({ task })),
          catchError(error => of(TasksActions.updateTaskFailure({ error: error.message })))
        )
      )
    )
  )

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      switchMap(({ _id }) =>
        this.tasksServiec.deleteTask(_id).pipe(
          map(() => TasksActions.deleteTaskSuccess({ _id })),
          catchError(error => of(TasksActions.deleteTaskFailure({ error: error.message })))
        )
      )
    )
  )
}
