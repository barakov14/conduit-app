import {inject, Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {GetCurrentUser} from "../../../api-types/user";
import {Store} from "@ngrx/store";
import {authActions} from "../+state/auth.actions";
import {Actions, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap, take} from "rxjs";
import {CookieJwtService} from "../services/cookie-jwt.service";

@Injectable({providedIn: 'root'})

export class CurrentUserResolver implements Resolve<any> {
  private readonly store = inject(Store)
  private readonly actions$ = inject(Actions)
  private readonly cookieJwtService = inject(CookieJwtService)
  resolve() {
    return this.cookieJwtService.getItem().pipe(
      take(1),
      switchMap(cookieItem => {
        if (cookieItem) {
          this.store.dispatch(authActions.getCurrentUser());
        }
        return this.actions$.pipe(
          ofType(authActions.getCurrentUserSuccess),
          catchError(() => of(null))
        );
      })
    );
  }
}
