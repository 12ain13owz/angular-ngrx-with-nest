import { createFeatureSelector, createSelector } from '@ngrx/store'

import { authKey } from './auth.const'
import { AuthState } from './auth.model'

export const selectAuthState = createFeatureSelector<AuthState>(authKey)
export const selectIsLoggedIn = createSelector(selectAuthState, (state: AuthState) => !!state.uid)
export const selectUser = createSelector(selectAuthState, (state: AuthState) => ({
  uid: state.uid,
  email: state.email,
}))
export const selectCurrentUser = createSelector(selectAuthState, (state: AuthState) => state.uid)
