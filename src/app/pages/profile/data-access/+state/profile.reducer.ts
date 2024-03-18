import {createFeature, createReducer, on} from '@ngrx/store'
import {profileInitialState} from '../profile.model'
import {profileActions} from "./profile.actions";

export const profileFeatureKey = 'profile'

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    profileInitialState,
    /*    on(authActions.login, (state) => ({
          ...state,
          authStatus: 'loading' as const,
        })),*/
    on(profileActions.loadUserProfile, (state) => ({
      ...state,
      loadingStatus: 'loading' as const
    })),

    on(profileActions.loadUserProfileSuccess, (state, action) => ({
      ...state,
      loadingStatus: 'loaded' as const,
      profile: action.profile
    })),

    on(profileActions.loadUserProfileSuccess, (state) => ({
      ...state,
      loadingStatus: 'error' as const,
    })),
  ),
});

