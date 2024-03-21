import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {ProfileEditUiComponent} from '../profile-edit-ui/profile-edit-ui.component'
import {UpdateUser} from '../../../../core/api-types/user'
import {select, Store} from '@ngrx/store'
import {selectCurrentUser} from '../../../../core/auth/data-access/+state/auth.selectors'
import {AsyncPipe} from '@angular/common'
import {profileActions} from '../../data-access/+state/profile.actions'
import {MatSnackBar} from '@angular/material/snack-bar'
import {
  selectAvatarUrl,
  selectProfileLoadingStatus,
} from '../../data-access/+state/profile.selectors'
import {LetDirective} from '@ngrx/component'

@Component({
  selector: 'profile-edit-container',
  standalone: true,
  imports: [ProfileEditUiComponent, AsyncPipe, LetDirective],
  templateUrl: './profile-edit-container.component.html',
  styleUrl: './profile-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditContainerComponent {
  private readonly store = inject(Store)
  public readonly currentUser$ = this.store.pipe(select(selectCurrentUser))
  public readonly avatarUrl$ = this.store.pipe(select(selectAvatarUrl))

  onUpdateCurrentUser(data: UpdateUser) {
    this.store.dispatch(profileActions.updateCurrentUserProfile({data}))
  }

  onUploadImage(image: File) {
    this.store.dispatch(profileActions.uploadAvatar({file: image}))
  }
}
