import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {ProfileEditUiComponent} from '../profile-edit-ui/profile-edit-ui.component'
import {UpdateUser} from '../../../../core/api-types/user'
import {select, Store} from "@ngrx/store";
import {selectCurrentUser} from "../../../../core/auth/data-access/+state/auth.selectors";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'profile-edit-container',
  standalone: true,
  imports: [ProfileEditUiComponent, AsyncPipe],
  templateUrl: './profile-edit-container.component.html',
  styleUrl: './profile-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditContainerComponent {

  private readonly store = inject(Store)
  public readonly currentUser = this.store.pipe(select(selectCurrentUser))
  onUpdateCurrentUser(data: UpdateUser) {
    console.log(data)
  }
}
