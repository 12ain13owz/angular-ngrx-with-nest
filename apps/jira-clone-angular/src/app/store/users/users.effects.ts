import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'

import { UserActions } from './users.actions'
import { UsersService } from './users.service'

@Injectable()
export class UsersEffects {
  private action$ = inject(Actions)
  private usersService = inject(UsersService)

  constructor() {
    console.log('UsersEffects constructor has been called')
  }

  loadUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loadUsers),
      tap(() => console.log('Effects caught LoadUsers action')), // เพิ่มบรรทัดนี้
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map(users => UserActions.loadUserSuccess({ users })),
          catchError(error => of(UserActions.loadUserFailure({ error: error.message })))
        )
      )
    )
  )
}
