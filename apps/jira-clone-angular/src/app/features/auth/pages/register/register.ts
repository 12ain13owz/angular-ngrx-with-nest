import { Component, inject } from '@angular/core'
import { finalize } from 'rxjs'

import { AuthForm } from '../../components/auth-form/auth-form'
import { AuthService } from '../../../../store/auth/auth.service'
import { Navigation } from '../../../../services/navigations/navigation.service'
import { AuthFormValue } from '../../../../store/auth/auth.model'

@Component({
  selector: 'app-register',
  imports: [AuthForm],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService)
  private navigation = inject(Navigation)

  isLoading = false
  routes = this.navigation.ROUTES

  onSubmit(formValue: AuthFormValue) {
    this.isLoading = true
    this.authService
      .login(formValue)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(res => this.authService.setAuthDate(res.data, res.accessToken))
  }
}
