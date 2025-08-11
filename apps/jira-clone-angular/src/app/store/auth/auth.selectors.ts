import { createFeatureSelector, createSelector } from '@ngrx/store'

import { authKey } from './auth.const'
import { AuthState } from './auth.model'

export const selectAuthState = createFeatureSelector<AuthState>(authKey)
export const selectIsLoggedIn = createSelector(selectAuthState, (state: AuthState) => !!state._id)
export const selectAuthUser = createSelector(selectAuthState, (state: AuthState) => ({
  _id: state._id,
  email: state.email,
}))
export const selectCurrentUser = createSelector(selectAuthState, (state: AuthState) => state._id)
