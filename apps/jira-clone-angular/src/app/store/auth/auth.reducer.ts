import { createReducer, on } from '@ngrx/store'

import { AuthActions } from './auth.actions'
import { AuthState } from './auth.model'

export const initialState: AuthState = {
  _id: null,
  email: null,
  isLoading: false,
  error: null,
}

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, AuthActions.register, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, data) => ({
    ...state,
    _id: data._id,
    email: data.email,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(AuthActions.logoutSuccess, () => initialState)
)
