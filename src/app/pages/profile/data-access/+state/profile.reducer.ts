import {createFeature, createReducer, on} from '@ngrx/store'
import {profileInitialState} from '../profile.model'
import {profileActions} from './profile.actions'

export const profileFeatureKey = 'profile'

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    profileInitialState,
    on(profileActions.loadUserProfile, (state) => ({
      ...state,
      loadingStatus: 'loading' as const,
    })),

    on(profileActions.loadUserProfileSuccess, (state, action) => ({
      ...state,
      loadingStatus: 'loaded' as const,
      profile: action.profile,
    })),

    on(profileActions.loadUserProfileFailure, (state) => ({
      // Исправлено на loadUserProfileFailure
      ...state,
      loadingStatus: 'error' as const,
    })),

    on(profileActions.updateCurrentUserProfile, (state) => ({
      ...state,
      loadingStatus: 'loading' as const,
    })),
    on(profileActions.updateCurrentUserProfileSuccess, (state) => ({
      ...state,
      loadingStatus: 'loaded' as const,
    })),
    on(profileActions.updateCurrentUserProfileFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const,
    })),

    on(profileActions.uploadAvatar, (state) => ({
      ...state,
      loadingStatus: 'loading' as const,
    })),
    on(profileActions.uploadAvatarSuccess, (state, action) => ({
      ...state,
      loadingStatus: 'loaded' as const,
      avatarUrl: action.res.files[0].fileUrl,
    })),
    on(profileActions.uploadAvatarFailure, (state) => ({
      ...state,
      loadingStatus: 'error' as const,
    })),
  ),
})
