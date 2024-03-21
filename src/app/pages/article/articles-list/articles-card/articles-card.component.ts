import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {MatCard, MatCardContent} from '@angular/material/card'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {MatBadge} from '@angular/material/badge'
import {MatChip, MatChipSet} from '@angular/material/chips'
import {RouterLink} from '@angular/router'
import {Article} from '../../../../core/api-types/article'
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common'
import {LoadingStatus} from '../../../../core/data-access/loading-status.type'
import {Observable} from 'rxjs'
import {emit} from '@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker'

@Component({
  selector: 'articles-card',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatIconButton,
    MatIcon,
    MatBadge,
    MatChip,
    MatButton,
    MatChipSet,
    RouterLink,
    NgOptimizedImage,
    DatePipe,
    AsyncPipe,
  ],
  templateUrl: './articles-card.component.html',
  styleUrl: './articles-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCardComponent implements OnInit {
  @Input({required: true}) article!: Article
  @Input({required: true}) loadingStatus!: LoadingStatus
  @Output() favorite = new EventEmitter<string>()
  @Output() unFavorite = new EventEmitter<string>()

  public isFavorited!: boolean
  public favoritesCount!: number

  ngOnInit() {
    this.isFavorited = this.article.favorited
    this.favoritesCount = this.article.favoritesCount
  }

  onFavoriteArticle(slug: string) {
    this.isFavorited = true
    this.favoritesCount++
    this.favorite.emit(slug)
  }
  onUnFavoriteArticle(slug: string) {
    this.isFavorited = false
    this.favoritesCount--
    this.unFavorite.emit(slug)
  }
}
