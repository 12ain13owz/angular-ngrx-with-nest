import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../../../store/auth/auth.service'
import { Navigation } from '../../../services/navigations/navigation.service'

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const navigation = inject(Navigation)
  const authService = inject(AuthService)

  if (!authService.isAuthenticated()) return router.createUrlTree([navigation.ROUTES.AUTH.LOGIN])
  return true
}
