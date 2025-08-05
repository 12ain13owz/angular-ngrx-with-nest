import { Component, inject } from '@angular/core'
import { map } from 'rxjs'
import { Store } from '@ngrx/store'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { AuthForm } from '../../components/auth-form/auth-form'
import { Navigation } from '../../../../services/navigations/navigation.service'
import { AuthFormPayload, AuthFormValue } from '../../../../store/auth/auth.model'
import { selectAuthState } from '../../../../store/auth/auth.selectors'
import { AuthActions } from '../../../../store/auth/auth.actions'
import { AsyncPipe } from '@angular/common'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-login',
  imports: [AsyncPipe, AuthForm],
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
      this.message.add({ severity: 'error', summary: 'Error', detail: error })
    })
  }

  onSubmit(formValue: AuthFormValue) {
    const payload = formValue as AuthFormPayload
    this.store.dispatch(AuthActions.login(payload))
  }
}
