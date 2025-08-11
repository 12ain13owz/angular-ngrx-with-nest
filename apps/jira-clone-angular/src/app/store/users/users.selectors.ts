import { createFeatureSelector, createSelector } from '@ngrx/store'

import { usersKey } from './users.const'
import { UserState } from './users.model'

export const selectUsersState = createFeatureSelector<UserState>(usersKey)
export const selectAllUsers = createSelector(selectUsersState, (state: UserState) => state.users)
