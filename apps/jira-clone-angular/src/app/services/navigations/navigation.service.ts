import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class Navigation {
  private router = inject(Router)

  readonly ROUTES = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
    },
    BOARD: '/board',
  } as const

  private navigate(path: string) {
    this.router.navigate([path])
  }

  goToLogin() {
    this.navigate(this.ROUTES.AUTH.LOGIN)
  }

  goToRegister() {
    this.navigate(this.ROUTES.AUTH.REGISTER)
  }

  goToBoard() {
    this.navigate(this.ROUTES.BOARD)
  }
}
