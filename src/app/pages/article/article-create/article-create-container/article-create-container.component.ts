import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core'
import {ArticleCreateUiComponent} from '../article-create-ui/article-create-ui.component'
import {CreateArticle} from '../../../../core/api-types/article'
import {select, Store} from '@ngrx/store'
import {articleActions} from '../../data-access/+state/article.actions'
import {selectLoadingStatus} from '../../data-access/+state/article.selectors'
import {AsyncPipe} from '@angular/common'
import {Observable} from 'rxjs'
import {LoadingStatus} from '../../../../core/data-access/loading-status.type'

@Component({
  selector: 'article-create-container',
  standalone: true,
  imports: [ArticleCreateUiComponent, AsyncPipe],
  templateUrl: './article-create-container.component.html',
  styleUrl: './article-create-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCreateContainerComponent {
  private readonly store = inject(Store)

  public readonly loadingStatus$ = this.store.pipe(select(selectLoadingStatus))

  onCreateArticle(data: CreateArticle) {
    this.store.dispatch(articleActions.createArticle({data}))
  }
}
