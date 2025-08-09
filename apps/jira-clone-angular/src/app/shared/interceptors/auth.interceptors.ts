import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, throwError } from 'rxjs'

import { Navigation } from '../../services/navigations/navigation.service'
import { AuthService } from '../../store/auth/auth.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const navigation = inject(Navigation)
  const allowedPaths = ['login', 'register']

  if (allowedPaths.some(path => req.url.toLowerCase().includes(path))) return next(req)

  const token = authService.getAccessToken()
  if (!token) {
    authService.clearAuthData()
    navigation.goToLogin()
    return throwError(() => new Error('No access token available, redirecting to login'))
  }

  const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.clearAuthData()
        navigation.goToLogin()
        return throwError(() => new Error('Unauthorized access, redirected to login'))
      }

      return throwError(() => error)
    })
  )
}
