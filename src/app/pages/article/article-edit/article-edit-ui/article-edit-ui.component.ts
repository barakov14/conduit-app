import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {AsyncPipe} from '@angular/common'
import {InputTagsComponent} from '../../../../shared/ui/input-tags/input-tags.component'
import {MatButton} from '@angular/material/button'
import {MatCard, MatCardContent} from '@angular/material/card'
import {MatFormField, MatLabel} from '@angular/material/form-field'
import {MatInput} from '@angular/material/input'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {
  Article,
  GetArticle,
  UpdateArticle,
} from '../../../../core/api-types/article'
import {LoadingStatus} from '../../../../core/data-access/loading-status.type'

@Component({
  selector: 'article-edit-ui',
  standalone: true,
  imports: [
    AsyncPipe,
    InputTagsComponent,
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './article-edit-ui.component.html',
  styleUrl: './article-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditUiComponent implements OnInit {
  @Output() updateArticle = new EventEmitter<UpdateArticle>()
  @Input() loadingStatus!: LoadingStatus
  @Input() getArticle!: GetArticle
  public formGroup!: FormGroup

  ngOnInit() {
    this.formGroup = new FormBuilder().group({
      title: new FormControl(this.getArticle.article.title),
      description: new FormControl(this.getArticle.article.description),
      body: new FormControl(this.getArticle.article.body),
    })
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const data: UpdateArticle = {
        article: {
          title: this.formGroup.value.title as string,
          description: this.formGroup.value.description as string,
          body: this.formGroup.value.body as string,
        },
      }
      this.updateArticle.emit(data)
    }
  }
}
