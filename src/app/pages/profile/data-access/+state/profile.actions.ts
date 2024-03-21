import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {UserProfile} from '../../../../core/api-types/profile'
import {UpdateUser} from '../../../../core/api-types/user'
import {ImageResponse} from '../../../../core/api-types/image'

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    loadUserProfile: props<{username: string}>(),
    loadUserProfileSuccess: props<{profile: UserProfile}>(),
    loadUserProfileFailure: emptyProps(),

    updateCurrentUserProfile: props<{data: UpdateUser}>(),
    updateCurrentUserProfileSuccess: emptyProps(),
    updateCurrentUserProfileFailure: emptyProps(),

    uploadAvatar: props<{file: File}>(),
    uploadAvatarSuccess: props<{res: ImageResponse}>(),
    uploadAvatarFailure: emptyProps(),

    followUser: props<{username: string}>(),
    followUserSuccess: props<{profile: UserProfile}>(),
    followUserFailure: emptyProps(),

    unfollowUser: props<{username: string}>(),
    unfollowUserSuccess: props<{profile: UserProfile}>(),
    unfollowUserFailure: emptyProps(),
  },
})
