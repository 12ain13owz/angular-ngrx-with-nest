import { Component, inject, input, output } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'

import { Input } from '../../../../shared/components/forms/input/input'
import { validationMessages } from '../../../../shared/const/validations/validation.const'
import { LoginFormControls, LoginFormValue } from '../../../../store/auth/auth.model'

@Component({
  selector: 'app-login-form',
  imports: [RouterModule, ReactiveFormsModule, CardModule, ButtonModule, Input],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private fb = inject(FormBuilder)

  isLoading = input<boolean | null>(false)
  link = input('#')
  formSubmit = output<LoginFormValue>()

  loginForm: FormGroup<LoginFormControls>
  validationMessages = validationMessages

  constructor() {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get email(): FormControl<string> {
    return this.loginForm.controls.email
  }

  get password(): FormControl<string> {
    return this.loginForm.controls.password
  }

  onSubmit() {
    this.loginForm.markAllAsTouched()
    if (this.loginForm.invalid) return

    this.formSubmit.emit(this.loginForm.value)
  }
}
