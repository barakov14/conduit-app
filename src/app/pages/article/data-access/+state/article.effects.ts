import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {articleActions} from "./article.actions";
import {ArticleService} from "../article.service";

@Injectable({providedIn: 'root'})

export class ArticleEffects {

  private readonly actions$ = inject(Actions)
  private readonly articleService = inject(ArticleService)


  loadArticlesEffect$ = createEffect( () =>
      this.actions$.pipe(
        ofType(articleActions.loadArticles),
        switchMap(
          ({feed}) =>
            this.articleService.loadArticles(feed).pipe(
              map((articlesList) => {
                console.log(articlesList)
                return articleActions.loadArticlesSuccess({ articlesList: articlesList })
              }),
              catchError(() => of(articleActions.loadArticlesFailure()))
            )
        )
      ), {functional: true}
  )

  loadArticleEffect$ = createEffect( () =>
    this.actions$.pipe(
      ofType(articleActions.loadArticle),
      switchMap(
        ({slug}) =>
          this.articleService.loadArticle(slug).pipe(
            map((article) =>
              articleActions.loadArticleSuccess({ article })
            ),
            catchError(() => of(articleActions.loadArticleFailure()))
          )
      )
    ), {functional: true}
  )

  loadArticleCommentsEffect$ = createEffect( () =>
    this.actions$.pipe(
      ofType(articleActions.loadArticleComments),
      switchMap(
        ({slug}) =>
          this.articleService.getArticleComments(slug).pipe(
            map((articleComments) =>
              articleActions.loadArticleCommentsSuccess({ articleComments })
            ),
            catchError(() => of(articleActions.loadArticleCommentsFailure()))
          )
      )
    ), {functional: true}
  )

/*  favoriteArticleEffect$ = createEffect(() => this.actions$.pipe(
    ofType(articleActions.favoriteArticle),
    switchMap(
      ({slug}) =>
        this.articleService.favoriteArticle(slug).pipe(
          map((article) => articleActions.favoriteArticleSuccess({article})),
          catchError(() => of(articleActions.favoriteArticleFailure()))
        )
    )
  ), {functional: true, dispatch: false})*/
}
