import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {UserProfile} from "../../../../core/api-types/profile";

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    // changeProfileDataSuccess: props<{ res: ChangeProfileDataResponse }>(),

    loadUserProfile: props<{ username: string }>(),

    loadUserProfileSuccess: props<{ profile: UserProfile}>(),

    loadUserProfileFailure: emptyProps()
  }
});


