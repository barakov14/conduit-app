import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {profileActions} from './profile.actions'
import {ProfileService} from '../profile.service'
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({providedIn: 'root'})
export class ProfileEffects {
  private readonly actions$ = inject(Actions)
  private readonly profileService = inject(ProfileService)

  loadProfileEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileActions.loadUserProfile),
        switchMap(({username}) =>
          this.profileService.loadProfile(username).pipe(
            map((profile) => {
              return profileActions.loadUserProfileSuccess({profile})
            }),
            catchError(() => of(profileActions.loadUserProfileFailure())),
          ),
        ),
      ),
    {functional: true},
  )

  updateUserProfileEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.updateCurrentUserProfile),
      switchMap(({data}) =>
        this.profileService.updateCurrentUser(data).pipe(
          map(() => profileActions.updateCurrentUserProfileSuccess()),
          catchError(() =>
            of(profileActions.updateCurrentUserProfileFailure()),
          ),
        ),
      ),
    )
  })

  followUserEffect$ = createEffect((_snackBar = inject(MatSnackBar)) => {
    return this.actions$.pipe(
      ofType(profileActions.followUser),
      switchMap(({username}) =>
        this.profileService.followUser(username).pipe(
          map((profile) => {
            _snackBar.open(`You followed ${username}`, 'OK')
            return profileActions.followUserSuccess({profile})
          }),
          catchError(() => of(profileActions.followUserFailure())),
        ),
      ),
    )
  })

  unfollowUserEffect$ = createEffect((_snackBar = inject(MatSnackBar)) => {
    return this.actions$.pipe(
      ofType(profileActions.unfollowUser),
      switchMap(({username}) =>
        this.profileService.unfollowUser(username).pipe(
          map((profile) => {
            _snackBar.open(`You unfollowed ${username}`, 'OK')
            return profileActions.unfollowUserSuccess({profile})
          }),
          catchError(() => of(profileActions.unfollowUserFailure())),
        ),
      ),
    )
  })

  updateUserProfileSuccessEffect$ = createEffect(
    (_snackBar = inject(MatSnackBar)) =>
      this.actions$.pipe(
        ofType(profileActions.updateCurrentUserProfileSuccess),
        tap(() => _snackBar.open('Profile updated successfully', 'OK')),
      ),
    {dispatch: false},
  )

  uploadAvatarEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.uploadAvatar),
      switchMap(({file}) =>
        this.profileService.uploadAvatar(file).pipe(
          map((res) => profileActions.uploadAvatarSuccess({res})),
          catchError(() => of(profileActions.uploadAvatarFailure())),
        ),
      ),
    ),
  )
}
