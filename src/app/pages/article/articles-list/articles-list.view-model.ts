import {DeepReadonly} from "../../../core/utils/deep-readonly";
import {ArticlesList} from "../../../core/api-types/article";
import {LoadingStatus} from "../../../core/data-access/loading-status.type";

export type ArticlesListVM = DeepReadonly<{
  articlesList: ArticlesList,
  status: LoadingStatus
}>
