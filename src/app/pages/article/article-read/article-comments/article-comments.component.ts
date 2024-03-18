import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core'
import {ArticleCommentComponent} from './article-comment/article-comment.component'
import {select, Store} from "@ngrx/store";
import {articleActions} from "../../data-access/+state/article.actions";
import {selectArticleComments, selectLoadingStatus} from "../../data-access/+state/article.selectors";
import {selectCurrentUser} from "../../../../core/auth/data-access/+state/auth.selectors";
import {LetDirective} from "@ngrx/component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'article-comments',
  standalone: true,
  imports: [
    ArticleCommentComponent,
    LetDirective,
    MatProgressSpinner
  ],
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentsComponent implements OnInit {
  @Input() slug!: string

  private readonly store = inject(Store)
  public readonly articleComments$ = this.store.pipe(select(selectArticleComments))
  public readonly currentUser$ = this.store.pipe(select(selectCurrentUser))
  public readonly loadingStatus$ = this.store.pipe(select(selectLoadingStatus))
  ngOnInit() {
    this.store.dispatch(articleActions.loadArticleComments({slug: this.slug}))
  }
}
