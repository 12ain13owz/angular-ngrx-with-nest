import { FormControl, FormGroup } from '@angular/forms'

export interface AuthState {
  uid: string | null
  email: string | null
  isLoading: boolean
  error: string | null
}

export interface AuthFormControls {
  email: FormControl<string>
  password: FormControl<string>
}

export type AuthFormValue = FormGroup<AuthFormControls>['value']
export type AuthFormPayload = Required<AuthFormValue>

export interface AuthResponse {
  data: {
    uid: string
    email: string
  }
  accessToken: string
}

export interface User {
  uid: string
  email: string
}
