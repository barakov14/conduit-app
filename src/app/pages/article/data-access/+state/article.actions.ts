import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Article, ArticleComments, ArticlesList, GetArticle} from "../../../../core/api-types/article";
export const articleActions = createActionGroup({
  source: 'Article',
  events: {
    loadArticles: props<{ feed: string }>(),
    loadArticlesSuccess: props<{ articlesList: ArticlesList }>(),
    loadArticlesFailure: emptyProps(),

    loadArticle: props<{ slug: string }>(),
    loadArticleSuccess: props<{ article: GetArticle }>(),
    loadArticleFailure: emptyProps(),


    loadArticleComments: props<{ slug: string }>(),
    loadArticleCommentsSuccess: props<{articleComments: ArticleComments}>(),
    loadArticleCommentsFailure: emptyProps(),

    favoriteArticle: props<{ slug: string }>(),
    unFavoriteArticle: props<{ slug: string }>(),

    favoriteArticleSuccess: props<{ article: GetArticle }>(),
    unFavoriteArticleSuccess: emptyProps(),

    favoriteArticleFailure: emptyProps(),
    unFavoriteArticleFailure: emptyProps(),
  }
});


