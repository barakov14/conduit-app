import {ApplicationConfig, isDevMode} from '@angular/core'
import {provideRouter} from '@angular/router'
import {routes} from './app.routes'
import {environment} from '../environments/environment.prod'
import {API_URL, STORAGE_URL} from './core/http/api-url.token'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import {tokenInterceptor} from './core/auth/data-access/services/token-interceptor.service'
import {provideStore} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects'
import {authFeature} from './core/auth/data-access/+state/auth.reducer'
import {articleFeature} from './pages/article/data-access/+state/article.reducer'
import {profileFeature} from './pages/profile/data-access/+state/profile.reducer'
import {AuthEffects} from './core/auth/data-access/+state/auth.effects'
import {ArticleEffects} from './pages/article/data-access/+state/article.effects'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {IMAGE_CONFIG} from '@angular/common'
import {ProfileEffects} from './pages/profile/data-access/+state/profile.effects'
import {articleCommentFeature} from './pages/article/data-access/+state/article-comment/article-comment.reducer'
import {ArticleCommentEffects} from './pages/article/data-access/+state/article-comment/article-comment.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    {
      provide: STORAGE_URL,
      useValue: environment.storage_url,
    },
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    provideStore({
      [authFeature.name]: authFeature.reducer,
      [profileFeature.name]: profileFeature.reducer,
      [articleFeature.name]: articleFeature.reducer,
      [articleCommentFeature.name]: articleCommentFeature.reducer,
    }),
    provideEffects(
      AuthEffects,
      ArticleEffects,
      ArticleCommentEffects,
      ProfileEffects,
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [
          16, 32, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920,
        ],
      },
    },
  ],
}
