import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { map } from 'rxjs'

import { AuthService } from '../../../store/auth/auth.service'

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const authService = inject(AuthService)

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) return true
      return router.createUrlTree(['/auth/login'])
    })
  )
}
