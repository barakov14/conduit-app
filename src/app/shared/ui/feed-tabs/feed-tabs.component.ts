import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  MatTab,
  MatTabGroup,
  MatTabLink,
  MatTabNav,
  MatTabNavPanel,
} from '@angular/material/tabs'
import {TagList} from '../../../core/api-types/article'

@Component({
  selector: 'feed-tabs',
  standalone: true,
  imports: [MatTabGroup, MatTab, MatTabNav, MatTabLink, MatTabNavPanel],
  templateUrl: './feed-tabs.component.html',
  styleUrl: './feed-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedTabsComponent {
  @Input() tagList!: TagList
  @Output() feedChoose = new EventEmitter<string>()

  active: string = ''

  onFeedChoose(feed: string) {
    this.feedChoose.emit(feed)
    this.active = feed
  }
}
