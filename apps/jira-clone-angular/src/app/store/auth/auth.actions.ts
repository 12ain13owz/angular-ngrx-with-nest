import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { User } from '../users/users.model'

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ email: string; password: string }>(),
    LoginSuccess: props<User>(),
    LoginFailure: props<{ error: string }>(),

    LoginWithToken: props<{ token: string }>(),
    LoginWithTokenSuccess: props<User>(),
    LoginWithTokenFailure: props<{ error: string }>(),

    Register: props<{ email: string; password: string }>(),
    RegisterSuccess: props<User>(),
    RegisterFailure: props<{ error: string }>(),

    Logout: emptyProps(),
    LogoutSuccess: emptyProps(),
    LogoutFailure: props<{ error: string }>(),
  },
})
