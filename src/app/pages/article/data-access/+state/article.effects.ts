import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {articleActions} from './article.actions'
import {ArticleService} from '../article.service'
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({providedIn: 'root'})
export class ArticleEffects {
  private readonly actions$ = inject(Actions)
  private readonly articleService = inject(ArticleService)
  private readonly router = inject(Router)

  loadArticlesEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(articleActions.loadArticles),
        switchMap(({feed}) =>
          this.articleService.loadArticles(feed).pipe(
            map((articlesList) => {
              console.log(articlesList)
              return articleActions.loadArticlesSuccess({
                articlesList: articlesList,
              })
            }),
            catchError(() => of(articleActions.loadArticlesFailure())),
          ),
        ),
      ),
    {functional: true},
  )

  loadArticleEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(articleActions.loadArticle),
        switchMap(({slug}) =>
          this.articleService.loadArticle(slug).pipe(
            map((article) => articleActions.loadArticleSuccess({article})),
            catchError(() => of(articleActions.loadArticleFailure())),
          ),
        ),
      ),
    {functional: true},
  )

  createArticleEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(articleActions.createArticle),
        switchMap(({data}) =>
          this.articleService.createArticle(data).pipe(
            map((res) => {
              this.router.navigate(['/article', res.article.slug])
              return articleActions.createArticleSuccess()
            }),
            catchError(() => of(articleActions.createArticleFailure())),
          ),
        ),
      ),
    {functional: true, dispatch: false},
  )

  updateArticleEffect$ = createEffect(
    (_snackBar = inject(MatSnackBar)) =>
      this.actions$.pipe(
        ofType(articleActions.updateArticle),
        switchMap(({slug, data}) =>
          this.articleService.updateArticle(slug, data).pipe(
            map((res) => {
              this.router.navigate(['/article', res.article.slug])
              _snackBar.open('Article updated successfully', 'OK, Got it!')
              return articleActions.updateArticleSuccess()
            }),
            catchError(() => of(articleActions.updateArticleFailure())),
          ),
        ),
      ),
    {functional: true},
  )

  loadTagsEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(articleActions.loadTags),
        switchMap(() =>
          this.articleService.loadTags().pipe(
            map((tagList) => articleActions.loadTagsSuccess({tagList})),
            catchError(() => of(articleActions.loadTagsFailure())),
          ),
        ),
      ),
    {functional: true},
  )

  deleteArticleEffect$ = createEffect(
    (_snackBar = inject(MatSnackBar)) =>
      this.actions$.pipe(
        ofType(articleActions.deleteArticle),
        switchMap(({slug}) =>
          this.articleService.deleteArticle(slug).pipe(
            map(() => {
              this.router.navigate(['/articles'])
              _snackBar.open('Article deleted successfully', 'OK, Got it!')
              return articleActions.deleteArticleSuccess()
            }),
            catchError(() => of(articleActions.deleteArticleFailure())),
          ),
        ),
      ),
    {functional: true},
  )

  favoriteArticleEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.favoriteArticle),
      switchMap(({slug}) =>
        this.articleService.favoriteArticle(slug).pipe(
          map((article) => articleActions.favoriteArticleSuccess({article})),
          catchError(() => of(articleActions.favoriteArticleFailure())),
        ),
      ),
    ),
  )

  unfavoriteArticleEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.unfavoriteArticle),
      switchMap(({slug}) =>
        this.articleService.unFavoriteArticle(slug).pipe(
          map((article) => articleActions.unfavoriteArticleSuccess({article})),
          catchError(() => of(articleActions.unfavoriteArticleFailure())),
        ),
      ),
    ),
  )
}
