import {Routes} from '@angular/router'
import {authGuard} from '../../core/auth/data-access/services/auth.guard'

export const ArticleRoutes: Routes = [
  {
    path: 'article/:slug',
    loadComponent: () =>
      import(
        './article-read/article-read-container/article-read-container.component'
      ).then((c) => c.ArticleReadContainerComponent),
  },
  {
    path: 'article/:slug/edit',
    loadComponent: () =>
      import(
        './article-edit/article-edit-container/article-edit-container.component'
      ).then((c) => c.ArticleEditContainerComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import(
        './article-create/article-create-container/article-create-container.component'
      ).then((c) => c.ArticleCreateContainerComponent),
  },
  {
    path: 'articles',
    loadComponent: () =>
      import(
        './articles-list/articles-list-container/articles-list-container.component'
      ).then((c) => c.ArticlesListContainerComponent),
  },
  {
    path: 'articles/feed',
    loadComponent: () =>
      import(
        './articles-list/articles-list-container/articles-list-container.component'
      ).then((c) => c.ArticlesListContainerComponent),
  },
  {
    path: 'feed',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './articles-list/articles-list-container/articles-list-container.component'
      ).then((c) => c.ArticlesListContainerComponent),
  },
]
