import { FormControl, FormGroup } from '@angular/forms'

import { User } from '../users/users.model'

export interface AuthState {
  _id: string | null
  email: string | null
  isLoading: boolean
  error: string | null
}

export interface LoginFormControls {
  email: FormControl<string>
  password: FormControl<string>
}

export type LoginFormValue = FormGroup<LoginFormControls>['value']
export type LoginFormPayload = Required<LoginFormValue>

export interface RegisterFormControls extends LoginFormControls {
  name: FormControl<string>
}

export type RegisterFormValue = FormGroup<RegisterFormControls>['value']
export type RegisterFormPayload = Required<RegisterFormValue>

export interface AuthResponse {
  data: User
  accessToken: string
}
