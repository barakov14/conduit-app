import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {ProfileViewComponent} from '../profile-view/profile-view.component'
import {select, Store} from '@ngrx/store'
import {selectCurrentUser} from '../../../../core/auth/data-access/+state/auth.selectors'
import {AsyncPipe} from '@angular/common'
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from '@angular/router'
import {profileActions} from '../../data-access/+state/profile.actions'
import {Observable, Subscription} from 'rxjs'
import {UserProfile} from '../../../../core/api-types/profile'
import {GetCurrentUser} from '../../../../core/api-types/user'
import {
  selectProfileLoadingStatus,
  selectUserProfile,
} from '../../data-access/+state/profile.selectors'
import {LetDirective} from '@ngrx/component'
import {MatProgressBar} from '@angular/material/progress-bar'
import {
  selectArticlesList,
  selectLoadingStatus,
} from '../../../article/data-access/+state/article.selectors'
import {articleActions} from '../../../article/data-access/+state/article.actions'

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
  public readonly loadingStatus$ = this.store.pipe(
    select(selectProfileLoadingStatus),
  )

  public readonly articlesList$ = this.store.pipe(select(selectArticlesList))
  public readonly articleLoadingStatus$ = this.store.pipe(
    select(selectLoadingStatus),
  )

  private currentFeed!: string
  private username!: string

  onFollowUser(username: string) {
    this.store.dispatch(profileActions.followUser({username}))
  }

  onUnfollowUser(username: string) {
    this.store.dispatch(profileActions.unfollowUser({username}))
  }

  onFeedChoose(feed: string) {
    if (feed === 'favorites') {
      this.currentFeed = `?favorited=${this.username}`
      this.navigateToArticlesList(this.currentFeed)
    }
    if (feed === 'feed') {
      this.currentFeed = `?author=${this.username}`
      this.navigateToArticlesList(this.currentFeed)
    }
  }

  onFeedPageChoose(page: number) {
    this.store.dispatch(
      articleActions.loadArticles({
        feed: `${this.currentFeed}&&offset=${page}`,
      }),
    )
  }
  ngOnInit() {
    this.routeSubscribtion = this.route.params.subscribe((params: Params) => {
      this.username = params['username']
      this.currentFeed = `?author=${this.username}`
      this.navigateToArticlesList(this.currentFeed)
      this.store.dispatch(
        profileActions.loadUserProfile({username: this.username}),
      )
    })
  }
  ngOnDestroy() {
    this.routeSubscribtion.unsubscribe()
  }

  private navigateToArticlesList(feed: string): void {
    this.store.dispatch(articleActions.loadArticles({feed: feed}))
  }
}
