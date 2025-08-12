import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'

import { TasksActions } from './tasks.actions'
import { TasksService } from './tasks.service'

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions)
  private tasksService = inject(TasksService)

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() =>
        this.tasksService.getTasks().pipe(
          map(res => TasksActions.loadTasksSuccess({ tasks: res })),
          catchError(error => of(TasksActions.loadTasksFailure({ error: error.message })))
        )
      )
    )
  )

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTasks),
      switchMap(({ tasks }) =>
        this.tasksService.addTask(tasks).pipe(
          map(tasks => TasksActions.addTasksSuccess({ tasks })),
          catchError(error => of(TasksActions.addTasksFailure({ error: error.message })))
        )
      )
    )
  )

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTasks),
      switchMap(({ tasks }) =>
        this.tasksService.updateTask(tasks).pipe(
          map(tasks => TasksActions.updateTasksSuccess({ tasks })),
          catchError(error => of(TasksActions.updateTasksFailure({ error: error.message })))
        )
      )
    )
  )

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTasks),
      switchMap(({ _id }) =>
        this.tasksService.deleteTask(_id).pipe(
          map(() => TasksActions.deleteTasksSuccess({ _id })),
          catchError(error => of(TasksActions.deleteTasksFailure({ error: error.message })))
        )
      )
    )
  )
}
