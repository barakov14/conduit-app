import {createFeature, createReducer, on} from '@ngrx/store'
import {articleInitialState} from './models/article.model'
import {articleActions} from './article.actions'

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
      articlesList: action.articlesList,
    })),
    on(articleActions.loadArticlesFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const,
    })),

    on(articleActions.loadArticle, (state) => ({
      ...state,
      loadingStatus: 'loading' as const,
    })),
    on(articleActions.loadArticleSuccess, (state, action) => ({
      ...state,
      loadingStatus: 'loaded' as const,
      article: action.article,
    })),
    on(articleActions.loadArticleFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const,
    })),

    on(articleActions.createArticle, (state) => ({
      ...state,
      loadingStatus: 'loading' as const,
    })),
    on(articleActions.createArticleSuccess, (state) => ({
      ...state,
      loadingStatus: 'loaded' as const,
    })),
    on(articleActions.createArticleFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const,
    })),

    on(articleActions.updateArticle, (state) => ({
      ...state,
      loadingStatus: 'loading' as const,
    })),
    on(articleActions.updateArticleSuccess, (state) => ({
      ...state,
      loadingStatus: 'loaded' as const,
    })),
    on(articleActions.updateArticleFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const,
    })),

    on(articleActions.loadTagsSuccess, (state, action) => ({
      ...state,
      tagList: action.tagList,
    })),
  ),
})
