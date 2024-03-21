import {LoadingStatus} from '../../../../../core/data-access/loading-status.type'
import {
  ArticleComments,
  ArticlesList,
  GetArticle,
  TagList,
} from '../../../../../core/api-types/article'
import {Errors} from '../../../../../core/api-types/error'

export type ArticleState = {
  loadingStatus: LoadingStatus
  articlesList: ArticlesList | null | undefined
  article: GetArticle | null | undefined
  tagList: TagList | null | undefined
  error: Errors | null | undefined
}
export const articleInitialState: ArticleState = {
  loadingStatus: 'init',
  articlesList: null,
  article: null,
  tagList: null,
  error: null,
}
