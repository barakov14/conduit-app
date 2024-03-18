import {
  ChangeDetectionStrategy,
  Component, inject,
  input,
  output,
} from '@angular/core'
import {MatToolbar} from '@angular/material/toolbar'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {RouterLink} from '@angular/router'
import {AsyncPipe, NgClass, NgIf, NgOptimizedImage} from '@angular/common'
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu'
import {MatLabel} from '@angular/material/form-field'
import {ArticleCreateButtonComponent} from '../../../pages/article/article-create/article-create-button/article-create-button.component'
import {select, Store} from "@ngrx/store";
import {selectCurrentUser, selectIsLoggedIn} from "../../../core/auth/data-access/+state/auth.selectors";
import {authActions} from "../../../core/auth/data-access/+state/auth.actions";

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatButton,
    NgOptimizedImage,
    NgIf,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatLabel,
    ArticleCreateButtonComponent,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  switchMode = output<void>()
  isDarkMode = input<boolean>()

  private readonly store = inject(Store)

  public readonly isLoggedIn = this.store.pipe(select(selectIsLoggedIn))
  public readonly currentUser = this.store.pipe(select(selectCurrentUser))

  onSwitchMode() {
    this.switchMode.emit()
  }

  logout() {
    this.store.dispatch(authActions.logout())
  }
}
