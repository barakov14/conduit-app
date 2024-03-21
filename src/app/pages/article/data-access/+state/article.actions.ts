import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {
  Article,
  ArticleComments,
  ArticlesList,
  CreateArticle,
  GetArticle,
  PublishCommentResponse,
  PublishCommentToArticle,
  Comment,
  TagList,
  UpdateArticle,
} from '../../../../core/api-types/article'
export const articleActions = createActionGroup({
  source: 'Article',
  events: {
    loadArticles: props<{feed: string}>(),
    loadArticlesSuccess: props<{articlesList: ArticlesList}>(),
    loadArticlesFailure: emptyProps(),

    loadArticle: props<{slug: string}>(),
    loadArticleSuccess: props<{article: GetArticle}>(),
    loadArticleFailure: emptyProps(),

    loadTags: emptyProps(),
    loadTagsSuccess: props<{tagList: TagList}>(),
    loadTagsFailure: emptyProps(),

    createArticle: props<{data: CreateArticle}>(),
    createArticleSuccess: emptyProps(),
    createArticleFailure: emptyProps(),

    updateArticle: props<{slug: string; data: UpdateArticle}>(),
    updateArticleSuccess: emptyProps(),
    updateArticleFailure: emptyProps(),

    deleteArticle: props<{slug: string}>(),
    deleteArticleSuccess: emptyProps(),
    deleteArticleFailure: emptyProps(),

    unfavoriteArticle: props<{slug: string}>(),
    unfavoriteArticleSuccess: props<{article: GetArticle}>(),
    unfavoriteArticleFailure: emptyProps(),

    favoriteArticle: props<{slug: string}>(),
    favoriteArticleSuccess: props<{article: GetArticle}>(),
    favoriteArticleFailure: emptyProps(),
  },
})
