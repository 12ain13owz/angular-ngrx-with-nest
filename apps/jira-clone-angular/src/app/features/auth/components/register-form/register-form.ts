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
import {
  PATTERN_PASSWORD,
  validationMessages,
} from '../../../../shared/const/validations/validation.const'
import { RegisterFormControls, RegisterFormValue } from '../../../../store/auth/auth.model'

@Component({
  selector: 'app-register-form',
  imports: [RouterModule, ReactiveFormsModule, CardModule, ButtonModule, Input],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  private fb = inject(FormBuilder)

  isLoading = input<boolean | null>(false)
  link = input('#')
  formSubmit = output<RegisterFormValue>()

  registerForm: FormGroup<RegisterFormControls>
  validationMessages = validationMessages

  constructor() {
    this.registerForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(PATTERN_PASSWORD)]],
      name: ['', [Validators.required]],
    })
  }
  get email(): FormControl<string> {
    return this.registerForm.controls.email
  }

  get password(): FormControl<string> {
    return this.registerForm.controls.password
  }

  get name(): FormControl<string> {
    return this.registerForm.controls.name
  }

  onSubmit() {
    this.registerForm.markAllAsTouched()
    if (this.registerForm.invalid) return

    this.formSubmit.emit(this.registerForm.value)
  }
}
