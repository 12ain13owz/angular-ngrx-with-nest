import { Route } from '@angular/router'
import { Dashboard } from './layouts/dashboard'
import { authGuard } from './features/auth/guards/auth.guard'

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      {
        path: 'board',
        loadChildren: () => import('./features/board/board.module').then(m => m.BoardModule),
      },
      { path: '', redirectTo: '/board', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'board', pathMatch: 'full' },
]
