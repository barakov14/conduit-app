import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ArticleCommentState} from '../models/article-comment.model'
import {articleCommentFeatureKey} from './article-comment.reducer'
import {ArticleComments} from '../../../../../core/api-types/article'
import {LoadingStatus} from '../../../../../core/data-access/loading-status.type'

export const selectArticleCommentFeature =
  createFeatureSelector<ArticleCommentState>(articleCommentFeatureKey)

export const selectArticleComments = createSelector(
  selectArticleCommentFeature,
  (state) => {
    const comments = state.articleComments?.comments.slice() // Создаем копию массива
    if (comments) {
      comments.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return dateB - dateA
      })
    }
    return comments
  },
)
export const selectArticleCommentLoadingStatus = createSelector(
  selectArticleCommentFeature,
  (state) => state.loadingStatus as LoadingStatus,
)
