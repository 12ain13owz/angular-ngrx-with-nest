import { createReducer, on } from '@ngrx/store'

import { UserActions } from './users.actions'
import { UserState } from './users.model'

export const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
}

export const usersReducers = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(UserActions.loadUserSuccess, (state, { users }) => ({
    ...state,
    users,
    isLoading: false,
    error: null,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
)
