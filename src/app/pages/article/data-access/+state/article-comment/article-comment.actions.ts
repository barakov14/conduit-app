import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {
  ArticleComments,
  PublishCommentResponse,
  PublishCommentToArticle,
} from '../../../../../core/api-types/article'

export const articleCommentActions = createActionGroup({
  source: 'ArticleComment',
  events: {
    loadArticleComments: props<{slug: string}>(),
    loadArticleCommentsSuccess: props<{articleComments: ArticleComments}>(),
    loadArticleCommentsFailure: emptyProps(),

    commentArticle: props<{data: PublishCommentToArticle}>(),
    commentArticleSuccess: props<{res: PublishCommentResponse}>(),
    commentArticleFailure: emptyProps(),

    deleteComment: props<{slug: string; id: number}>(),
    deleteCommentSuccess: props<{id: number}>(),
    deleteCommentFailure: emptyProps(),
  },
})
