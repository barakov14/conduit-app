import {inject, Injectable} from "@angular/core";
import {ApiService} from "../../../core/http/api.service";
import {UserProfile} from "../../../core/api-types/profile";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class ProfileService {
  private readonly apiService = inject(ApiService)
  loadProfile(username: string): Observable<UserProfile> {
    return this.apiService.get<UserProfile>(`/profiles/${username}`)
  }
}
