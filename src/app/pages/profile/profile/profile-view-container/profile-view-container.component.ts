import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core'
import {ProfileViewComponent} from '../profile-view/profile-view.component'
import {select, Store} from "@ngrx/store";
import {selectCurrentUser} from "../../../../core/auth/data-access/+state/auth.selectors";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from "@angular/router";
import {profileActions} from "../../data-access/+state/profile.actions";
import {Observable, Subscription} from "rxjs";
import {UserProfile} from "../../../../core/api-types/profile";
import {GetCurrentUser} from "../../../../core/api-types/user";
import {selectProfileLoadingStatus, selectUserProfile} from "../../data-access/+state/profile.selectors";
import {LetDirective} from "@ngrx/component";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'profile-view-container',
  standalone: true,
  imports: [ProfileViewComponent, AsyncPipe, LetDirective, MatProgressBar],
  templateUrl: './profile-view-container.component.html',
  styleUrl: './profile-view-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileViewContainerComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store)
  private readonly route = inject(ActivatedRoute)

  private routeSubscribtion!: Subscription


  public readonly user$ = this.store.pipe(select(selectUserProfile))
  public readonly currentUser$ = this.store.pipe(select(selectCurrentUser))
  public readonly loadingStatus$ = this.store.pipe(select(selectProfileLoadingStatus))


  ngOnInit() {
    this.routeSubscribtion = this.route.params.subscribe((params: Params) => {
      const paramValue = params['username'];
      this.store.dispatch(profileActions.loadUserProfile({username: paramValue}))
    })
  }
  ngOnDestroy() {
    this.routeSubscribtion.unsubscribe()
  }
}
