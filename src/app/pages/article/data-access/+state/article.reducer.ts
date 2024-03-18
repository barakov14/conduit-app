import {createFeature, createReducer, on} from '@ngrx/store'
import {articleInitialState} from '../article.model'
import {articleActions} from "./article.actions";


export const articleFeatureKey = 'article'


export const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    articleInitialState,
    on(articleActions.loadArticles, (state) => ({
      ...state,
      loadingStatus: 'loading' as const,
    })),
    on(articleActions.loadArticlesSuccess, (state, action) => ({
      ...state,
      loadingStatus: 'loaded' as const,
      articlesList: action.articlesList
    })),
    on(articleActions.loadArticlesFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const
    })),

    on(articleActions.loadArticle, (state) => ({
      ...state,
      loadingStatus: 'loading' as const
    })),
    on(articleActions.loadArticleSuccess, (state, action) => ({
      ...state,
      loadingStatus: 'loaded' as const,
      article: action.article
    })),
    on(articleActions.loadArticleFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const
    })),

    on(articleActions.loadArticleComments, (state) => ({
      ...state,
      loadingStatus: 'loading' as const
    })),
    on(articleActions.loadArticleCommentsSuccess, (state, action) => ({
      ...state,
      loadingStatus: 'loaded' as const,
      articleComments: action.articleComments
    })),
    on(articleActions.loadArticleCommentsFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const
    })),

    on(articleActions.favoriteArticle, (state) => ({
      ...state,
      loadingStatus: 'loading' as const
    })),
    on(articleActions.favoriteArticleSuccess, (state, action) => ({
      ...state,
      loadingStatus: 'loaded' as const,
      article: action.article
    })),
    on(articleActions.favoriteArticleFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const,
    })),
  ),
});

