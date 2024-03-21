import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {MatButton} from '@angular/material/button'
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'
import {MatIcon} from '@angular/material/icon'
import {MatLabel} from '@angular/material/form-field'
import {
  MatTab,
  MatTabGroup,
  MatTabLink,
  MatTabNav,
  MatTabNavPanel,
} from '@angular/material/tabs'
import {RouterLink} from '@angular/router'
import {GetCurrentUser} from '../../../../core/api-types/user'
import {UserProfile} from '../../../../core/api-types/profile'
import {AsyncPipe, NgClass} from '@angular/common'
import {LoadingStatus} from '../../../../core/data-access/loading-status.type'
import {ArticlesListComponent} from '../../../article/articles-list/articles-list/articles-list.component'
import {ArticlesList} from '../../../../core/api-types/article'
import {PaginationComponent} from '../../../../shared/ui/pagination/pagination.component'
import {MatProgressSpinner} from '@angular/material/progress-spinner'

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
    ArticlesListComponent,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    PaginationComponent,
    MatProgressSpinner,
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileViewComponent {
  @Input() user!: UserProfile | null | undefined
  @Input() currentUser!: GetCurrentUser | null | undefined
  @Input() loadingStatus!: LoadingStatus

  @Input() articlesList!: ArticlesList
  @Input() articleLoadingStatus!: LoadingStatus

  @Output() followUser = new EventEmitter<string>()
  @Output() unfollowUser = new EventEmitter<string>()

  @Output() feedChoose = new EventEmitter<string>()
  @Output() pageChoose = new EventEmitter<number>()

  public active = 'feed'

  public currentPage!: number

  onFeedChoose(feed: string) {
    this.feedChoose.emit(feed)
    this.active = feed
  }

  onFeedPageChoose(page: number) {
    this.currentPage = page
    this.pageChoose.emit(page)
  }

  onFollowUser(username: string) {
    this.followUser.emit(username)
  }
  onUnfollowUser(username: string) {
    this.unfollowUser.emit(username)
  }

  protected readonly Math = Math
}
