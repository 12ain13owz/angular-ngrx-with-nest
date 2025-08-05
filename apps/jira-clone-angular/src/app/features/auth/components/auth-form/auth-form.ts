import { Component, inject, input, output } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import {
  PATTERN_PASSWORD,
  validationMessages,
} from '../../../../shared/const/validations/validation.const'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { Input } from '../../../../shared/components/forms/input/input'
import { AuthFormControls, AuthFormValue } from '../../../../store/auth/auth.model'

@Component({
  selector: 'app-auth-form',
  imports: [RouterModule, ReactiveFormsModule, CardModule, ButtonModule, Input],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  private fb = inject(FormBuilder)

  isLoading = input<boolean | null>(false)
  title = input('')
  labelButton = input('')
  link = input('#')
  labelLink = input('')
  labelDescription = input('')
  formSubmit = output<AuthFormValue>()

  authForm: FormGroup<AuthFormControls>
  validationMessages = validationMessages

  constructor() {
    this.authForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(PATTERN_PASSWORD)]],
    })
  }

  get email(): FormControl<string> {
    return this.authForm.controls.email
  }

  get password(): FormControl<string> {
    return this.authForm.controls.password
  }

  onSubmit() {
    this.authForm.markAllAsTouched()
    if (this.authForm.invalid) return

    this.formSubmit.emit(this.authForm.value)
  }
}
