import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AuthState} from '../auth.model'
import {authFeatureKey} from './auth.reducer'

export const selectAuthFeature =
  createFeatureSelector<AuthState>(authFeatureKey)

export const selectCurrentUser = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.currentUser,
)

export const selectAuthStatus = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.loadingStatus,
)

export const selectIsLoggedIn = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.currentUser !== null,
)
