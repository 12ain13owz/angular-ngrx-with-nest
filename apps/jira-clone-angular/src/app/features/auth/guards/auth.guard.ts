import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { filter, map, of, switchMap, take } from 'rxjs'

import { AuthActions } from '../../../store/auth/auth.actions'
import { selectIsLoggedIn } from '../../../store/auth/auth.selectors'
import { AuthService } from '../../../store/auth/auth.service'

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const store = inject(Store)
  const authService = inject(AuthService)
  const accessToken = authService.getAccessToken()

  return store.select(selectIsLoggedIn).pipe(
    take(1),
    switchMap(isLoggedIn => {
      if (isLoggedIn) return of(true)
      if (!accessToken) return of(router.createUrlTree(['/auth/login']))

      store.dispatch(AuthActions.loginWithToken({ token: accessToken }))
      return store.select(selectIsLoggedIn).pipe(
        filter(status => status !== null),
        take(1),
        map(isAuth => {
          if (isAuth) return true
          authService.removeAccessToken()
          return router.createUrlTree(['/auth/login'])
        })
      )
    })
  )
}
