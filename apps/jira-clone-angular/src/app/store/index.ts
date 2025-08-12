/* eslint-disable @typescript-eslint/no-explicit-any */
import { routerReducer } from '@ngrx/router-store'
import { ActionReducer } from '@ngrx/store'
import { localStorageSync } from 'ngrx-store-localstorage'

import { authKey } from './auth/auth.const'
import { AuthEffects } from './auth/auth.effects'
import { authReducer } from './auth/auth.reducer'
import { CommentsEffects } from './comments/comments.effects'
import { commentsReducer } from './comments/comments.reducer'
import { TasksEffects } from './tasks/tasks.effects'
import { tasksReducer } from './tasks/tasks.reducer'
import { UsersEffects } from './users/users.effects'
import { usersReducers } from './users/users.reducer'

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [authKey],
    rehydrate: true,
  })(reducer)
}

export const metaReducers = [localStorageSyncReducer]
export const rootReducers = {
  router: routerReducer,
  auth: authReducer,
  tasks: tasksReducer,
  users: usersReducers,
  comments: commentsReducer,
}
export const rootEffects = [AuthEffects, TasksEffects, UsersEffects, CommentsEffects]
