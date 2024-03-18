import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {profileActions} from "./profile.actions";
import {ProfileService} from "../profile.service";

@Injectable({providedIn: 'root'})

export class ProfileEffects {

  private readonly actions$ = inject(Actions)
  private readonly profileService = inject(ProfileService)

  loadProfileEffect$ = createEffect( () =>
    this.actions$.pipe(
      ofType(profileActions.loadUserProfile),
      switchMap(
        ({username}) =>
          this.profileService.loadProfile(username).pipe(
            map((profile) => {
              return profileActions.loadUserProfileSuccess({ profile })
            }),
            catchError(() => of(profileActions.loadUserProfileFailure()))
          )
      )
    ), {functional: true}
  )
}
