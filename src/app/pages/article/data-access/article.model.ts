import {LoadingStatus} from '../../../core/data-access/loading-status.type'
import {
  Article,
  ArticleComments,
  ArticlesList, GetArticle,
} from '../../../core/api-types/article'
import {Errors} from '../../../core/api-types/error'

export type ArticleState = {
  loadingStatus: LoadingStatus
  articlesList: ArticlesList | null | undefined
  article: GetArticle | null | undefined
  articleComments: ArticleComments | null | undefined
  error: Errors | null | undefined
}
export const articleInitialState: ArticleState = {
  loadingStatus: 'init',
  articlesList: null,
  article: null,
  articleComments: null,
  error: null,
}
