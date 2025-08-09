import { AsyncPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Store } from '@ngrx/store'
import { MessageService } from 'primeng/api'
import { map } from 'rxjs'

import { Navigation } from '../../../../services/navigations/navigation.service'
import { AuthActions } from '../../../../store/auth/auth.actions'
import { AuthFormPayload, AuthFormValue } from '../../../../store/auth/auth.model'
import { selectAuthState } from '../../../../store/auth/auth.selectors'
import { AuthForm } from '../../components/auth-form/auth-form'

@Component({
  selector: 'app-register',
  imports: [AsyncPipe, AuthForm],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
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
    this.store.dispatch(AuthActions.register(payload))
  }
}
