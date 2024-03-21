import {createFeatureSelector, createSelector} from '@ngrx/store'
import {profileFeatureKey} from './profile.reducer'
import {ProfileState} from '../profile.model'

export const selectProfileFeature =
  createFeatureSelector<ProfileState>(profileFeatureKey)

export const selectUserProfile = createSelector(
  selectProfileFeature,
  (state: ProfileState) => state.profile,
)
export const selectProfileLoadingStatus = createSelector(
  selectProfileFeature,
  (state: ProfileState) => state.loadingStatus,
)

export const selectAvatarUrl = createSelector(
  selectProfileFeature,
  (state: ProfileState) => state.avatarUrl,
)
