/* eslint-disable @typescript-eslint/no-explicit-any */
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideRouterStore, routerReducer } from '@ngrx/router-store'
import { ActionReducer, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import Aura from '@primeuix/themes/aura'
import { localStorageSync } from 'ngrx-store-localstorage'
import { providePrimeNG } from 'primeng/config'

import { appRoutes } from './app.routes'
import { authInterceptor } from './shared/interceptors/auth.interceptors'
import { authKey } from './store/auth/auth.const'
import { AuthEffects } from './store/auth/auth.effects'
import { authReducer } from './store/auth/auth.reducer'
import { TasksEffects } from './store/tasks/tasks.effects'
import { tasksReducer } from './store/tasks/tasks.reducer'
import { UsersEffects } from './store/users/users.effects'
import { usersReducers } from './store/users/users.reducer'

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [authKey],
    rehydrate: true,
  })(reducer)
}

const metaReducers = [localStorageSyncReducer]
const rootReducers = {
  router: routerReducer,
  auth: authReducer,
  tasks: tasksReducer,
  users: usersReducers,
}
const rootEffects = [AuthEffects, TasksEffects, UsersEffects]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(rootReducers, { metaReducers }),
    provideEffects(rootEffects),
    provideStoreDevtools(),
    provideRouterStore(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-theme' } } }),
  ],
}
