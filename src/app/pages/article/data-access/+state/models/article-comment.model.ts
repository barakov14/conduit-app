import {LoadingStatus} from '../../../../../core/data-access/loading-status.type'
import {
  Article,
  ArticleComments,
  ArticlesList,
  GetArticle,
} from '../../../../../core/api-types/article'
import {Errors} from '../../../../../core/api-types/error'

export type ArticleCommentState = {
  loadingStatus: LoadingStatus
  articleComments: ArticleComments | null | undefined
  error: Errors | null | undefined
}
export const articleCommentInitialState: ArticleCommentState = {
  loadingStatus: 'init',
  articleComments: null,
  error: null,
}
