import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ email: string; password: string }>(),
    LoginSuccess: props<{ _id: string; email: string }>(),
    LoginFailure: props<{ error: string }>(),

    Register: props<{ email: string; password: string }>(),
    RegisterSuccess: props<{ _id: string; email: string }>(),
    RegisterFailure: props<{ error: string }>(),

    Logout: emptyProps(),
    LogoutSuccess: emptyProps(),
    LogoutFailure: props<{ error: string }>(),
  },
})
