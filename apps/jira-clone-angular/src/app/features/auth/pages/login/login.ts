import { AsyncPipe } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Store } from '@ngrx/store'
import { MessageService } from 'primeng/api'
import { map } from 'rxjs'

import { Navigation } from '../../../../services/navigations/navigation.service'
import { AuthActions } from '../../../../store/auth/auth.actions'
import { LoginFormPayload, LoginFormValue } from '../../../../store/auth/auth.model'
import { selectAuthState } from '../../../../store/auth/auth.selectors'
import { LoginForm } from '../../components/login-form/login-form'

@Component({
  selector: 'app-login',
  imports: [AsyncPipe, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private store = inject(Store)
  private navigation = inject(Navigation)
  private message = inject(MessageService)

  isLoading$ = this.store.select(selectAuthState).pipe(map(state => state.isLoading))
  error$ = this.store.select(selectAuthState).pipe(map(state => state.error))
  routes = this.navigation.ROUTES

  constructor() {
    this.error$.pipe(takeUntilDestroyed()).subscribe(error => {
      if (!error) return

      const err = error as unknown as HttpErrorResponse
      this.message.add({ severity: 'error', summary: 'Error', detail: err.message })
    })
  }

  onSubmit(formValue: LoginFormValue) {
    const payload = formValue as LoginFormPayload
    this.store.dispatch(AuthActions.login(payload))
  }
}
