import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {ArticleService} from '../../article.service'
import {articleCommentActions} from './article-comment.actions'
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({providedIn: 'root'})
export class ArticleCommentEffects {
  private readonly actions$ = inject(Actions)
  private readonly articleService = inject(ArticleService)

  loadArticleCommentsEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(articleCommentActions.loadArticleComments),
        switchMap(({slug}) =>
          this.articleService.getArticleComments(slug).pipe(
            map((articleComments) =>
              articleCommentActions.loadArticleCommentsSuccess({
                articleComments: articleComments,
              }),
            ),
            catchError(() =>
              of(articleCommentActions.loadArticleCommentsFailure()),
            ),
          ),
        ),
      ),
    {functional: true},
  )

  commentArticleEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(articleCommentActions.commentArticle),
        switchMap(({data}) =>
          this.articleService.publishCommentToArticle(data).pipe(
            map((res) => articleCommentActions.commentArticleSuccess({res})),
            catchError(() => of(articleCommentActions.commentArticleFailure())),
          ),
        ),
      ),
    {functional: true},
  )

  deleteCommentEffect$ = createEffect(
    (_snackBar = inject(MatSnackBar)) =>
      this.actions$.pipe(
        ofType(articleCommentActions.deleteComment),
        switchMap(({id, slug}) =>
          this.articleService.deleteCommentFromArticle(id, slug).pipe(
            map(() => {
              _snackBar.open('Comment succesfully removed', 'Got it')
              return articleCommentActions.deleteCommentSuccess({id})
            }),
            catchError(() => of(articleCommentActions.deleteCommentFailure())),
          ),
        ),
      ),
    {functional: true},
  )
}
