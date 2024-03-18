import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core'
import {select, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {articleActions} from "../../data-access/+state/article.actions";
import {selectArticle, selectLoadingStatus} from "../../data-access/+state/article.selectors";
import {LetDirective} from "@ngrx/component";
import {ArticleReadComponent} from "../article-read/article-read.component";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'article-read-container',
  standalone: true,
  imports: [
    LetDirective,
    ArticleReadComponent,
    MatProgressBar
  ],
  templateUrl: './article-read-container.component.html',
  styleUrl: './article-read-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleReadContainerComponent implements OnInit {

  private readonly store = inject(Store)
  private readonly route = inject(ActivatedRoute)

  public readonly article$ = this.store.pipe(select(selectArticle))
  public readonly loadingStatus$ = this.store.pipe(select(selectLoadingStatus))

  ngOnInit() {
    const param = this.route.snapshot.params['slug']
    this.store.dispatch(articleActions.loadArticle({slug: param}))
  }
}
