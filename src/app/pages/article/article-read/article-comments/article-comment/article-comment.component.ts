import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {MatInputModule,} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter
} from "@angular/material/card";
import {ArticleComments} from "../../../../../core/api-types/article";
import {Observable} from "rxjs";
import {AsyncPipe, DatePipe, NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {GetCurrentUser} from "../../../../../core/api-types/user";

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
    NgClass
  ],
  templateUrl: './article-comment.component.html',
  styleUrl: './article-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  @Input() articleComments!: ArticleComments
  @Input() currentUser!: GetCurrentUser
}
