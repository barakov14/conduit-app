import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {MatInputModule} from '@angular/material/input'
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {MatIconModule} from '@angular/material/icon'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
} from '@angular/material/card'
import {Comment} from '../../../../../core/api-types/article'
import {AsyncPipe, DatePipe, NgClass, NgIf} from '@angular/common'
import {RouterLink} from '@angular/router'
import {MatDivider} from '@angular/material/divider'
import {GetCurrentUser} from '../../../../../core/api-types/user'

@Component({
  selector: 'article-comment',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCard,
    MatCardFooter,
    MatCardContent,
    MatCardActions,
    NgIf,
    AsyncPipe,
    RouterLink,
    DatePipe,
    MatDivider,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './article-comment.component.html',
  styleUrl: './article-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  @Input() articleComments!: Comment[] | undefined | null
  @Input() currentUser!: GetCurrentUser

  @Output() commentArticle = new EventEmitter<string>()
  @Output() deleteComment = new EventEmitter<number>()

  public formGroup = new FormBuilder().group({
    text: new FormControl('', [Validators.required]),
  })

  onCommentArticle() {
    if (this.formGroup.valid) {
      this.commentArticle.emit(this.formGroup.value.text as string)
      this.formGroup.get('text')?.setValue('')
    }
  }

  onDelete(id: number) {
    this.deleteComment.emit(id)
  }
}
