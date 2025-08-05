import { Component, input, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { FloatLabel } from 'primeng/floatlabel'
import { MessageModule } from 'primeng/message'
import { ErrorField } from '../error-field/error-field'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    MessageModule,
    ErrorField,
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  type = input('text')
  id = input('')
  label = input('')
  readonly = input(false)
  disabled = input(false)
  errorMessage = input<Record<string, unknown>>({})
  control = input.required<FormControl<string | null>>()

  protected hidePassword = signal(true)

  togglePasswordVisibility(): void {
    if (this.type() === 'password') this.hidePassword.update(value => !value)
  }
}
