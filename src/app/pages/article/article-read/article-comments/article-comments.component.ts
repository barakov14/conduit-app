import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core'
import {LetDirective} from '@ngrx/component'
import {MatProgressSpinner} from '@angular/material/progress-spinner'
import {ArticleCommentComponent} from './article-comment/article-comment.component'
import {select, Store} from '@ngrx/store'
import {
  selectArticleCommentLoadingStatus,
  selectArticleComments,
} from '../../data-access/+state/article-comment/article-comment.selectors'
import {selectCurrentUser} from '../../../../core/auth/data-access/+state/auth.selectors'
import {articleCommentActions} from '../../data-access/+state/article-comment/article-comment.actions'
import {PublishCommentToArticle} from '../../../../core/api-types/article'

@Component({
  selector: 'article-comments',
  standalone: true,
  imports: [LetDirective, MatProgressSpinner, ArticleCommentComponent],
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentsComponent implements OnInit {
  @Input() slug!: string

  private readonly store = inject(Store)
  public readonly articleComments$ = this.store.pipe(
    select(selectArticleComments),
  )
  public readonly currentUser$ = this.store.pipe(select(selectCurrentUser))
  public readonly loadingStatus$ = this.store.pipe(
    select(selectArticleCommentLoadingStatus),
  )

  ngOnInit() {
    this.store.dispatch(
      articleCommentActions.loadArticleComments({slug: this.slug}),
    )
  }

  onCommentArticle(text: string) {
    const data: PublishCommentToArticle = {
      slug: this.slug,
      comment: {
        comment: {
          body: text,
        },
      },
    }

    console.log(text)
    this.store.dispatch(articleCommentActions.commentArticle({data}))
  }

  onDeleteComment(id: number) {
    this.store.dispatch(
      articleCommentActions.deleteComment({id, slug: this.slug}),
    )
  }
}
