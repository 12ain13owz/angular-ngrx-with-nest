/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { appRoutes } from './app.routes'
import { ActionReducer, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideRouterStore, routerReducer } from '@ngrx/router-store'
import { provideEffects } from '@ngrx/effects'
import { localStorageSync } from 'ngrx-store-localstorage'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeuix/themes/aura'
import { authKey } from './store/auth/auth.const'
import { authReducer } from './store/auth/auth.reducer'
import { provideHttpClient } from '@angular/common/http'
import { AuthEffects } from './store/auth/auth.effects'

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [authKey],
    rehydrate: true,
  })(reducer)
}

const metaReducers = [localStorageSyncReducer]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({ router: routerReducer, auth: authReducer }, { metaReducers }),
    provideEffects([AuthEffects]),
    provideStoreDevtools(),
    provideRouterStore(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
  ],
}
