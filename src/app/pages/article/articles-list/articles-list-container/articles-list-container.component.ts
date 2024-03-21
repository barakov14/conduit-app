import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core'
import {ArticlesListComponent} from '../articles-list/articles-list.component'
import {select, Store} from '@ngrx/store'
import {articleActions} from '../../data-access/+state/article.actions'
import {Params, Router} from '@angular/router'
import {
  selectArticlesList,
  selectLoadingStatus,
  selectTagList,
} from '../../data-access/+state/article.selectors'
import {LetDirective} from '@ngrx/component'
import {MatButton} from '@angular/material/button'
import {AsyncPipe} from '@angular/common'
import {PaginationComponent} from '../../../../shared/ui/pagination/pagination.component'
import {MatProgressBar} from '@angular/material/progress-bar'
import {FeedTabsComponent} from '../../../../shared/ui/feed-tabs/feed-tabs.component'
import {Subscription} from "rxjs";
import {selectCurrentUser} from "../../../../core/auth/data-access/+state/auth.selectors";

@Component({
  selector: 'articles-list-container',
  standalone: true,
  imports: [
    ArticlesListComponent,
    LetDirective,
    MatButton,
    AsyncPipe,
    PaginationComponent,
    MatProgressBar,
    FeedTabsComponent,
  ],
  templateUrl: './articles-list-container.component.html',
  styleUrl: './articles-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesListContainerComponent implements OnInit {
  private readonly store = inject(Store)
  private readonly router = inject(Router)

  public readonly articlesList$ = this.store.pipe(select(selectArticlesList))
  public readonly loadingStatus$ = this.store.pipe(select(selectLoadingStatus))

  public readonly tagList$ = this.store.pipe(select(selectTagList))

  public currentPage: number = 1

  public currentFeed: string = ''

  ngOnInit() {
    this.store.dispatch(
      articleActions.loadArticles({feed: '/?limit=10&&offset=1'}),
    )
    this.store.dispatch(articleActions.loadTags())
  }

  onCurrentPageChanged(page: number) {
    this.currentPage = page
    const queryParams = {page}
    this.navigateToArticlesList(queryParams)
  }

  onFeedChoose(feed: string): void {
    this.currentFeed = feed
    this.navigateToArticlesList({})
  }

  onFavoriteArticle(slug: string) {
    this.store.dispatch(articleActions.favoriteArticle({slug}))
  }

  onUnFavoriteArticle(slug: string) {
    this.store.dispatch(articleActions.unfavoriteArticle({slug}))
  }

  private navigateToArticlesList(queryParams?: Params): void {
    const page = queryParams?.['page'] || '1'
    const feedQueryParam = this.currentFeed && this.currentFeed !== 'feed'
      ? `?tag=${this.currentFeed}&offset=${page}`
      : `/${this.currentFeed}?offset=${page}`

    const queryParamsWithFeed = {...queryParams}
    if (this.currentFeed) {
      queryParamsWithFeed['feed'] = this.currentFeed
    }

    const navigationExtras = {queryParams: queryParamsWithFeed}

    this.router.navigate(['/articles'], navigationExtras)

    this.store.dispatch(articleActions.loadArticles({feed: feedQueryParam}))
  }

  protected readonly Math = Math
}
