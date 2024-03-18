import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ArticleState} from "../article.model";
import {articleFeatureKey} from "./article.reducer";
import {Article, ArticleComments, ArticlesList, GetArticle} from "../../../../core/api-types/article";

export const selectArticleFeature = createFeatureSelector<ArticleState>(articleFeatureKey);


export const selectArticlesList = createSelector(
  selectArticleFeature,
  (state: ArticleState) => state.articlesList as ArticlesList
)
export const selectLoadingStatus = createSelector(
  selectArticleFeature,
  (state: ArticleState) => state.loadingStatus
)
export const selectArticle = createSelector(
  selectArticleFeature,
  (state: ArticleState) => state.article as GetArticle
)

export const selectArticleComments = createSelector(
  selectArticleFeature,
  (state: ArticleState) => state.articleComments as ArticleComments
)
