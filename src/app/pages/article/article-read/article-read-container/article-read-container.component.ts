import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {ActivatedRoute} from '@angular/router'
import {articleActions} from '../../data-access/+state/article.actions'
import {
  selectArticle,
  selectLoadingStatus,
} from '../../data-access/+state/article.selectors'
import {LetDirective} from '@ngrx/component'
import {ArticleReadComponent} from '../article-read/article-read.component'
import {MatProgressBar} from '@angular/material/progress-bar'
import {selectCurrentUser} from '../../../../core/auth/data-access/+state/auth.selectors'
import {profileActions} from '../../../profile/data-access/+state/profile.actions'

@Component({
  selector: 'article-read-container',
  standalone: true,
  imports: [LetDirective, ArticleReadComponent, MatProgressBar],
  templateUrl: './article-read-container.component.html',
  styleUrl: './article-read-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleReadContainerComponent implements OnInit {
  private readonly store = inject(Store)
  private readonly route = inject(ActivatedRoute)

  public readonly article$ = this.store.pipe(select(selectArticle))
  public readonly loadingStatus$ = this.store.pipe(select(selectLoadingStatus))
  public readonly currentUser$ = this.store.pipe(select(selectCurrentUser))

  ngOnInit() {
    const param = this.route.snapshot.params['slug']
    this.store.dispatch(articleActions.loadArticle({slug: param}))
  }

  onFollowUser(username: string) {
    this.store.dispatch(profileActions.followUser({username}))
  }
  onUnfollowUser(username: string) {
    this.store.dispatch(profileActions.unfollowUser({username}))
  }

  onFavoriteArticle(slug: string) {
    this.store.dispatch(articleActions.favoriteArticle({slug}))
  }
  onUnFavoriteArticle(slug: string) {
    this.store.dispatch(articleActions.unfavoriteArticle({slug}))
  }

  onDeleteArticle(slug: string) {
    this.store.dispatch(articleActions.deleteArticle({slug}))
  }
}
