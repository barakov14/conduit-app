import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {ArticleCommentsComponent} from '../article-comments/article-comments.component'
import {Article, GetArticle} from '../../../../core/api-types/article'
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card'
import {AsyncPipe, DatePipe, NgIf} from '@angular/common'
import {MatChip, MatChipSet} from '@angular/material/chips'
import {Observable} from 'rxjs'
import {MatButton} from '@angular/material/button'
import {RouterLink} from '@angular/router'
import {GetCurrentUser} from '../../../../core/api-types/user'

@Component({
  selector: 'article-read',
  standalone: true,
  imports: [
    ArticleCommentsComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    DatePipe,
    MatChipSet,
    MatChip,
    NgIf,
    AsyncPipe,
    MatButton,
    RouterLink,
    MatCardActions,
  ],
  templateUrl: './article-read.component.html',
  styleUrl: './article-read.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleReadComponent implements OnInit {
  @Input() article!: Article
  @Input() currentUser!: GetCurrentUser

  @Output() deleteArticle = new EventEmitter<string>()

  @Output() followUser = new EventEmitter<string>()
  @Output() unfollowUser = new EventEmitter<string>()

  @Output() favoriteArticle = new EventEmitter<string>()
  @Output() unfavoriteArticle = new EventEmitter<string>()

  public favorited!: boolean
  public followed!: boolean

  ngOnInit() {
    this.favorited = this.article.favorited
    this.followed = this.article.author.following
  }

  onFollowUser(username: string) {
    this.followed = true
    this.followUser.emit(username)
  }
  onUnfollowUser(username: string) {
    this.followed = false
    this.unfollowUser.emit(username)
  }

  onFavoriteArticle(slug: string) {
    this.favorited = true
    this.favoriteArticle.emit(slug)
  }
  onUnFavoriteArticle(slug: string) {
    this.favorited = false
    this.unfavoriteArticle.emit(slug)
  }

  onDeleteArticle(slug: string) {
    this.deleteArticle.emit(slug)
  }
}
