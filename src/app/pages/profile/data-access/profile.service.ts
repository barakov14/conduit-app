import {inject, Injectable} from '@angular/core'
import {ApiService} from '../../../core/http/api.service'
import {UserProfile} from '../../../core/api-types/profile'
import {Observable} from 'rxjs'
import {GetCurrentUser, UpdateUser} from '../../../core/api-types/user'
import {ImageResponse} from '../../../core/api-types/image'

@Injectable({providedIn: 'root'})
export class ProfileService {
  private readonly apiService = inject(ApiService)
  loadProfile(username: string): Observable<UserProfile> {
    return this.apiService.get<UserProfile>(`/profiles/${username}`)
  }

  updateCurrentUser(data: UpdateUser): Observable<GetCurrentUser> {
    return this.apiService.put<GetCurrentUser, UpdateUser>('/user', data)
  }

  uploadAvatar(file: File) {
    return this.apiService.uploadImage<ImageResponse, File>(file)
  }

  followUser(username: string): Observable<UserProfile> {
    return this.apiService.post<UserProfile, void>(
      `/profiles/${username}/follow`,
    )
  }
  unfollowUser(username: string): Observable<UserProfile> {
    return this.apiService.delete<UserProfile>(`/profiles/${username}/follow`)
  }
}
