import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'validation',
})
export class ValidationPipe implements PipeTransform {
  transform(value: unknown, errorObj: Record<string, unknown>): unknown {
    return (value as Record<string, unknown>)[Object.keys(errorObj)[0]]
  }
}
