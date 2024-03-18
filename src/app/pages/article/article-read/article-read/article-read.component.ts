import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ArticleCommentsComponent} from "../article-comments/article-comments.component";
import {Article, GetArticle} from "../../../../core/api-types/article";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {Observable} from "rxjs";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'article-read',
  standalone: true,
  imports: [
    ArticleCommentsComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    DatePipe,
    MatChipSet,
    MatChip,
    NgIf,
    AsyncPipe,
    MatButton,
    RouterLink
  ],
  templateUrl: './article-read.component.html',
  styleUrl: './article-read.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleReadComponent {
  @Input() article!: Article
}
