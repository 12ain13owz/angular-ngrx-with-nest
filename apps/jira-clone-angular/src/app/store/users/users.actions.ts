import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { User } from './users.model'

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    LoadUsers: emptyProps(),
    LoadUserSuccess: props<{ users: User[] }>(),
    LoadUserFailure: props<{ error: string }>(),
  },
})
