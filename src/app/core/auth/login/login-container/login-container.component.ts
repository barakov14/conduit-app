import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {LoginFormUiComponent} from '../login-form-ui/login-form-ui.component'
import {LoginUser} from '../../../api-types/auth'
import {Router} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {authActions} from '../../data-access/+state/auth.actions'
import {selectAuthStatus} from "../../data-access/+state/auth.selectors";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {LoadingStatus} from "../../../data-access/loading-status.type";

@Component({
  selector: 'login-container',
  standalone: true,
  imports: [LoginFormUiComponent, AsyncPipe],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  private readonly router = inject(Router)
  private readonly store = inject(Store)

  public readonly selectLoadingStatus = this.store.pipe(select(selectAuthStatus))

  onLogin(data: LoginUser) {
    this.store.dispatch(authActions.login({data}))
  }

  onRedirectToRegister() {
    this.router.navigate(['/register'])
  }
}
