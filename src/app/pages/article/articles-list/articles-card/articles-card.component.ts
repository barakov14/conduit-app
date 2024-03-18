import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core'
import {MatCard, MatCardContent} from '@angular/material/card'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {MatBadge} from '@angular/material/badge'
import {MatChip, MatChipSet} from '@angular/material/chips'
import {RouterLink} from "@angular/router";
import {Article} from "../../../../core/api-types/article";
import {AsyncPipe, DatePipe, NgOptimizedImage} from "@angular/common";
import {LoadingStatus} from "../../../../core/data-access/loading-status.type";
import {Observable} from "rxjs";

@Component({
  selector: 'articles-card',
  standalone: true,
  imports: [MatCardContent, MatCard, MatIconButton, MatIcon, MatBadge, MatChip, MatButton, MatChipSet, RouterLink, NgOptimizedImage, DatePipe, AsyncPipe],
  templateUrl: './articles-card.component.html',
  styleUrl: './articles-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCardComponent {
  @Input({ required: true}) article!: Article
  @Input({ required: true}) loadingStatus!: LoadingStatus
  @Output() favorite = new EventEmitter<string>()


  onFavoriteArticle(slug: string) {
    if(this.article.favorited) {
    } else {
      this.favorite.emit(slug)
    }
  }
}
