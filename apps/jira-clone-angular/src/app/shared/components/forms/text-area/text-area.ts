import { Component, input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { IftaLabelModule } from 'primeng/iftalabel'
import { MessageModule } from 'primeng/message'
import { TextareaModule } from 'primeng/textarea'

import { ErrorField } from '../error-field/error-field'

@Component({
  selector: 'app-text-area',
  imports: [ReactiveFormsModule, TextareaModule, IftaLabelModule, MessageModule, ErrorField],
  templateUrl: './text-area.html',
  styleUrl: './text-area.scss',
})
export class TextArea {
  id = input('')
  label = input('')
  readonly = input(false)
  errorMessage = input<Record<string, unknown>>({})
  control = input.required<FormControl<string | null>>()
  rows = input(5)
  cols = input(30)
}
