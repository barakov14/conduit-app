import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http'
import {catchError, Observable, throwError} from 'rxjs'
import {inject} from '@angular/core'
import {CookieJwtService} from './cookie-jwt.service'
import {Router} from '@angular/router'
import {environment} from '../../../../../environments/environment.prod'

export const tokenInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  let token: string | null = null
  const router = inject(Router)
  const cookieJwtService = inject(CookieJwtService)
  inject(CookieJwtService)
    .getItem()
    .subscribe((t) => (token = t))

  if (request.url.includes(environment.api_url)) {
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
    return next(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          router.navigate(['/login'])
          cookieJwtService.removeItem()
        }
        return throwError(() => error)
      }),
    )
  } else {
    return next(request)
  }
}
