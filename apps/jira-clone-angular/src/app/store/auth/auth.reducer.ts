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

  on(AuthActions.login, AuthActions.loginWithToken, AuthActions.register, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, user) => ({
    ...state,
    _id: user._id,
    email: user.email,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.loginWithTokenSuccess, (state, user) => ({
    ...state,
    _id: user._id,
    email: user.email,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, AuthActions.loginWithTokenFailure, (state, { error }) => ({
    ...initialState,
    error,
  })),

  on(AuthActions.logoutSuccess, () => initialState)
)
