import { Component, inject } from '@angular/core'
import { finalize } from 'rxjs'

import { AuthForm } from '../../components/auth-form/auth-form'
import { AuthService } from '../../../../store/auth/auth.service'
import { Navigation } from '../../../../services/navigations/navigation.service'
import { AuthFormValue } from '../../../../store/auth/auth.model'

@Component({
  selector: 'app-login',
  imports: [AuthForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService)
  private natigation = inject(Navigation)

  isLoading = false
  routes = this.natigation.ROUTES

  onSubmit(formValue: AuthFormValue) {
    this.isLoading = true
    this.authService
      .login(formValue)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(res => this.authService.setAuthDate(res.data, res.accessToken))
  }
}
