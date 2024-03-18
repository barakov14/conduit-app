import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core'
import {ArticlesListComponent} from '../articles-list/articles-list.component'
import {select, Store} from "@ngrx/store";
import {articleActions} from "../../data-access/+state/article.actions";
import {Router} from "@angular/router";
import {selectArticlesList, selectLoadingStatus} from "../../data-access/+state/article.selectors";
import {LetDirective} from "@ngrx/component";
import {MatButton} from "@angular/material/button";
import {AsyncPipe} from "@angular/common";
import {PaginationComponent} from "../../../../shared/ui/pagination/pagination.component";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'articles-list-container',
  standalone: true,
  imports: [ArticlesListComponent, LetDirective, MatButton, AsyncPipe, PaginationComponent, MatProgressBar],
  templateUrl: './articles-list-container.component.html',
  styleUrl: './articles-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesListContainerComponent implements OnInit {
  private readonly store = inject(Store)
  private readonly router = inject(Router)

  public articlesList$ = this.store.pipe(select(selectArticlesList))
  public loadingStatus$ = this.store.pipe(select(selectLoadingStatus))

  public currentPage!: number


  ngOnInit() {
    this.store.dispatch(articleActions.loadArticles({feed: '/?limit=10&&offset=1'}))
  }

  onFavoriteArticle(slug: string) {
    this.store.dispatch(articleActions.favoriteArticle({slug}))
  }

  onCurrentPageChanged(page: number) {
    this.router.navigate(['/articles'], {queryParams: {page: page}})
    this.currentPage = page
    this.store.dispatch(articleActions.loadArticles({feed: `/?limit=10&&offset=${page}`}))
  }

  protected readonly Math = Math;
}
