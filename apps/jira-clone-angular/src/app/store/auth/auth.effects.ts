import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from './auth.service'
import { AuthActions } from './auth.actions'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { Navigation } from '../../services/navigations/navigation.service'
import { AuthFormValue } from './auth.model'

@Injectable()
export class AuthEffects {
  private action$ = inject(Actions)
  private navigation = inject(Navigation)
  private authService = inject(AuthService)

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.login),
      switchMap((formValue: AuthFormValue) =>
        this.authService.login(formValue).pipe(
          map(res => AuthActions.loginSuccess(res.data)),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  )

  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.register),
      switchMap((formValue: AuthFormValue) =>
        this.authService.register(formValue).pipe(
          map(res => AuthActions.registerSuccess(res.data)),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          tap(() => this.navigation.goToLogin()),
          catchError(error => of(AuthActions.logoutFailure({ error: error.message })))
        )
      )
    )
  )

  authSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => this.navigation.goToBoard())
      ),
    { dispatch: false }
  )
}
