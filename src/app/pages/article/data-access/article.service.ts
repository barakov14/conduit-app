import {inject, Injectable} from '@angular/core'
import {ApiService} from '../../../core/http/api.service'
import {
  Article,
  ArticleComments,
  ArticlesList,
  CreateArticle,
  DeleteCommentFromArticle,
  GetArticle,
  PublishCommentBody,
  PublishCommentResponse,
  PublishCommentToArticle,
  TagList,
  Tags,
  UpdateArticle,
  UpdateArticleRequest,
} from '../../../core/api-types/article'
import {Observable} from 'rxjs'

@Injectable({providedIn: 'root'})
export class ArticleService {
  private readonly apiService = inject(ApiService)

  public loadTags(): Observable<TagList> {
    return this.apiService.get<TagList>('/tags')
  }

  public loadArticles(feed: string): Observable<ArticlesList> {
    return this.apiService.get<ArticlesList>(`/articles${feed}`)
  }

  public createArticle(data: CreateArticle): Observable<GetArticle> {
    return this.apiService.post<GetArticle, CreateArticle>('/articles', data)
  }

  public loadArticle(slug: string): Observable<GetArticle> {
    return this.apiService.get<GetArticle>(`/articles/${slug}`)
  }

  public updateArticle(
    slug: string,
    data: UpdateArticle,
  ): Observable<GetArticle> {
    return this.apiService.put<GetArticle, UpdateArticle>(
      `/articles/${slug}`,
      data,
    )
  }

  public deleteArticle(slug: string): Observable<void> {
    return this.apiService.delete<void>(`/articles/${slug}`)
  }

  public favoriteArticle(slug: string): Observable<GetArticle> {
    return this.apiService.post<GetArticle, void>(`/articles/${slug}/favorite`)
  }

  public unFavoriteArticle(slug: string): Observable<GetArticle> {
    return this.apiService.delete<GetArticle>(`/articles/${slug}/favorite`)
  }

  public getArticleComments(slug: string): Observable<ArticleComments> {
    return this.apiService.get<ArticleComments>(`/articles/${slug}/comments`)
  }

  public publishCommentToArticle(req: PublishCommentToArticle) {
    return this.apiService.post<PublishCommentResponse, PublishCommentBody>(
      `/articles/${req.slug}/comments`,
      req.comment,
    )
  }

  public deleteCommentFromArticle(id: number, slug: string) {
    return this.apiService.delete<void>(`/articles/${slug}/comments/${id}`)
  }
}
