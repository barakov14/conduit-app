import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {ArticlesCardComponent} from '../articles-card/articles-card.component'
import {FeedTabsComponent} from '../../../../shared/ui/feed-tabs/feed-tabs.component'
import {ArticlesList} from '../../../../core/api-types/article'
import {LoadingStatus} from '../../../../core/data-access/loading-status.type'
import {PaginationComponent} from '../../../../shared/ui/pagination/pagination.component'
import {MatProgressBar} from '@angular/material/progress-bar'

@Component({
  selector: 'articles-list',
  standalone: true,
  imports: [
    ArticlesCardComponent,
    FeedTabsComponent,
    PaginationComponent,
    MatProgressBar,
  ],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesListComponent {
  @Input({required: true}) articlesList!: ArticlesList
  @Input({required: true}) loadingStatus!: LoadingStatus

  @Output() favorite = new EventEmitter<string>()
  @Output() unFavorite = new EventEmitter<string>()

  onFavoriteArticle(slug: string) {
    this.favorite.emit(slug)
  }

  onUnFavoriteArticle(slug: string) {
    this.unFavorite.emit(slug)
  }

  protected readonly Math = Math
}
