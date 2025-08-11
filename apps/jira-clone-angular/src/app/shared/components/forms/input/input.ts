import { Component, computed, input, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { FloatLabel } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'

import { HTMLInputType } from '../../../types/generic'
import { ErrorField } from '../error-field/error-field'

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, InputTextModule, FloatLabel, MessageModule, ErrorField],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  type = input<HTMLInputType>('text')
  id = input('')
  label = input('')
  readonly = input(false)
  errorMessage = input<Record<string, unknown>>({})
  control = input.required<FormControl<string | null>>()

  protected hidePassword = signal(true)
  protected IsEmailType = computed(() => this.type() === 'email')
  protected IsPasswordType = computed(() => this.type() === 'password')

  togglePasswordVisibility(): void {
    if (this.IsPasswordType()) this.hidePassword.update(value => !value)
  }

  onEmailBlur(): void {
    if (!this.IsEmailType()) return

    const control = this.control()
    const currentValue = this.control().value

    if (!currentValue || typeof currentValue !== 'string') return

    const normalizedEmail = currentValue.toLowerCase().trim()
    if (normalizedEmail !== currentValue) control.setValue(normalizedEmail, { emitEvent: false })
  }
}
