import {UserProfile} from '../../../core/api-types/profile'
import {LoadingStatus} from '../../../core/data-access/loading-status.type'

export type ProfileState = {
  profile: UserProfile | null | undefined
  loadingStatus: LoadingStatus
  avatarUrl: string | null | undefined
}
export const profileInitialState: ProfileState = {
  profile: null,
  loadingStatus: 'init',
  avatarUrl: null,
}
