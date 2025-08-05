import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from './auth.model'
import { authKey } from './auth.const'

export const selectAuthState = createFeatureSelector<AuthState>(authKey)
export const selectIsLoggedIn = createSelector(selectAuthState, (state: AuthState) => !!state.uid)
export const selectUser = createSelector(selectAuthState, (state: AuthState) => ({
  uid: state.uid,
  email: state.email,
}))
export const selectCurrentUser = createSelector(selectAuthState, (state: AuthState) => state.uid)
