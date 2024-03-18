import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core'
import {MatButton} from '@angular/material/button'
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'
import {MatIcon} from '@angular/material/icon'
import {MatLabel} from '@angular/material/form-field'
import {MatTab, MatTabGroup} from '@angular/material/tabs'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {GetCurrentUser} from "../../../../core/api-types/user";
import {UserProfile} from "../../../../core/api-types/profile";
import {Observable} from "rxjs";
import {AsyncPipe, NgClass} from "@angular/common";
import {LoadingStatus} from "../../../../core/data-access/loading-status.type";

@Component({
  selector: 'profile-view',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatIcon,
    MatLabel,
    MatTab,
    MatTabGroup,
    RouterLink,
    NgClass,
    AsyncPipe,
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileViewComponent {
  @Input() user!: UserProfile | null | undefined
  @Input() currentUser!: GetCurrentUser | null | undefined
  @Input() loadingStatus!: LoadingStatus
}
