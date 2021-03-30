import { Component, OnInit } from '@angular/core';
import { INews, News } from 'app/model/news.model';
import { ActivatedRoute } from '@angular/router';
import { NewsViewService } from 'app/news/news-view.service';
import { HttpResponse } from '@angular/common/http';
import { INewsTop } from 'app/model/newsTop.model';

@Component({
  selector: 'jhi-public-news',
  templateUrl: './news-view.component.html',
  styleUrls: ['news-view.scss']
})
export class NewsViewComponent implements OnInit {
  newsTop?: INewsTop[];
  news?: INews[];

  constructor(protected activatedRoute: ActivatedRoute, private newsViewService: NewsViewService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      window.scrollTo(0, 0);
      this.loadTop();
    });
  }

  private loadTop(): void {
    this.newsViewService.queryTop().subscribe((res: HttpResponse<News[]>) => {
      this.newsTop = res.body ? res.body : [];
      this.loadAll(this.newsTop);
    });
  }

  protected loadAll(newsTop: INews[] | null): void {
    const idsExclude = [];
    if (newsTop != null) {
      for (const val of newsTop) {
        idsExclude.push(val.id);
      }
    }

    this.newsViewService
      .query({
        ids: idsExclude
      })
      .subscribe((res: HttpResponse<News[]>) => {
        this.news = res.body ? res.body : [];
      });
  }
}
