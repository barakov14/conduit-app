import {createFeature, createReducer, on} from '@ngrx/store'
import {articleCommentInitialState} from '../models/article-comment.model'
import {articleCommentActions} from './article-comment.actions'
import {ArticleComments} from '../../../../../core/api-types/article'

export const articleCommentFeatureKey = 'articleComment'

export const articleCommentFeature = createFeature({
  name: 'articleComment',
  reducer: createReducer(
    articleCommentInitialState,
    on(articleCommentActions.loadArticleComments, (state) => ({
      ...state,
      loadingStatus: 'loading' as const,
    })),
    on(articleCommentActions.loadArticleCommentsSuccess, (state, action) => ({
      ...state,
      loadingStatus: 'loaded' as const,
      articleComments: action.articleComments,
    })),
    on(articleCommentActions.loadArticleCommentsFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const,
    })),

    on(articleCommentActions.commentArticleSuccess, (state, action) => {
      const newComment = action.res.comment
      const updatedComments = state.articleComments
        ? [newComment, ...state.articleComments.comments]
        : [newComment]
      const newArticleComments: ArticleComments = {comments: updatedComments}

      return {
        ...state,
        articleComments: newArticleComments,
      }
    }),

    on(articleCommentActions.deleteCommentSuccess, (state, action) => {
      const deletedCommentId = action.id
      const updatedComments = state.articleComments
        ? state.articleComments.comments.filter(
            (comment) => comment.id !== deletedCommentId,
          )
        : []
      const newArticleComments: ArticleComments = {comments: updatedComments}
      return {
        ...state,
        articleComments: newArticleComments,
      }
    }),
  ),
})
