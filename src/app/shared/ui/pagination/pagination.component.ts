import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {MatButton, MatMiniFabButton} from '@angular/material/button'
import {NgClass, NgForOf, NgIf} from '@angular/common'
import {RouterLinkActive} from '@angular/router'

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [
    MatButton,
    MatMiniFabButton,
    NgIf,
    NgForOf,
    RouterLinkActive,
    NgClass,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input() currentPage!: number
  @Input() totalPages!: number

  public pages!: number[]

  @Output() currentPageChanged = new EventEmitter<number>()
  ngOnInit() {
    this.pages = Array.from({length: this.totalPages}, (_, index) => index + 1)
  }

  onPage(page: number) {
    this.currentPageChanged.emit(page)
    console.log('current', page)
  }
}
