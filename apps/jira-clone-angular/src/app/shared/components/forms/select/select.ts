import { Component, input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { FloatLabel } from 'primeng/floatlabel'
import { MessageModule } from 'primeng/message'
import { SelectModule } from 'primeng/select'

import { ErrorField } from '../error-field/error-field'

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule, SelectModule, FloatLabel, MessageModule, ErrorField],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  id = input('')
  label = input('')
  readonly = input(false)
  errorMessage = input<Record<string, unknown>>({})
  control = input.required<FormControl<string | null>>()
  options = input<unknown[] | undefined>([])
}
