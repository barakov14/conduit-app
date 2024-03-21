import {Routes} from '@angular/router'
import {HomeComponent} from './pages/home/home.component'
import {CurrentUserResolver} from './core/auth/data-access/resolvers/currentUser.resolver'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      currentUser: CurrentUserResolver,
    },
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.routes').then((r) => r.ProfileRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/article/article.routes').then((r) => r.ArticleRoutes),
      },
    ],
  },
  {
    path: 'register',
    loadComponent: () =>
      import(
        './core/auth/register/register-container/register-container.component'
      ).then((c) => c.RegisterContainerComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import(
        './core/auth/login/login-container/login-container.component'
      ).then((c) => c.LoginContainerComponent),
  },
]
