import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  OnDestroy,
} from '@angular/core'
import {ArticleEditUiComponent} from '../article-edit-ui/article-edit-ui.component'
import {select, Store} from '@ngrx/store'
import {
  selectArticle,
  selectLoadingStatus,
} from '../../data-access/+state/article.selectors'
import {CreateArticle, UpdateArticle} from '../../../../core/api-types/article'
import {articleActions} from '../../data-access/+state/article.actions'
import {ArticleCreateUiComponent} from '../../article-create/article-create-ui/article-create-ui.component'
import {LetDirective} from '@ngrx/component'
import {ActivatedRoute, Params} from '@angular/router'
import {Subscription} from 'rxjs'

@Component({
  selector: 'article-edit-container',
  standalone: true,
  imports: [ArticleEditUiComponent, ArticleCreateUiComponent, LetDirective],
  templateUrl: './article-edit-container.component.html',
  styleUrl: './article-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditContainerComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store)
  private readonly route = inject(ActivatedRoute)
  private routeSubscription!: Subscription

  private slug!: string

  public readonly loadingStatus$ = this.store.pipe(select(selectLoadingStatus))
  public readonly article$ = this.store.pipe(select(selectArticle))

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.store.dispatch(articleActions.loadArticle({slug: this.slug}))
    })
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  onUpdateArticle(data: UpdateArticle) {
    this.store.dispatch(articleActions.updateArticle({slug: this.slug, data}))
  }
}
