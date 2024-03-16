import {Observable, of} from 'rxjs'
import {inject, Injectable} from '@angular/core'
import {SsrCookieService} from 'ngx-cookie-service-ssr'

@Injectable({providedIn: 'root'})
export class CookieJwtService {
  private readonly cookieService = inject(SsrCookieService)
  getItem(): Observable<string | null> {
    // const data = this.cookieService.get('jwtToken')
    const data = localStorage.getItem('jwtToken')
    if (data) {
      return of(data)
    }
    return of(null)
  }

  setItem(data: string): Observable<string> {
    // this.cookieService.set('jwtToken', data)
    localStorage.setItem('jwtToken', data)
    return of(data)
  }

  removeItem(): Observable<boolean> {
    // this.cookieService.delete('jwtToken')
    localStorage.removeItem('jwtToken')
    return of(true)
  }
}
