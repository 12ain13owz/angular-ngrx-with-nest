import { Directive, HostListener, inject } from '@angular/core'
import { FormGroupDirective } from '@angular/forms'

@Directive({
  selector: '[appMarkAllAsTouched]',
})
export class FormMarkAllAsTouched {
  private formGroup = inject(FormGroupDirective)

  @HostListener('submit')
  onSubmit() {
    this.formGroup.form.markAllAsTouched()
  }
}
