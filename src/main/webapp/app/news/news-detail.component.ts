import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NewsViewService } from 'app/news/news-view.service';
import { News } from 'app/model/news.model';
import { DATE_TIME_NEWS } from 'app/shared/constants/input.constants';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'jhi-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['news-detail.scss']
})
// https://docs.angularjs.org/api/ng/filter/date
export class NewsPublicDetailComponent implements OnInit {
  news!: News;
  DATE_FORMAT = DATE_TIME_NEWS;

  constructor(
    private title: Title,
    private meta: Meta,
    private newsService: NewsViewService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ news }) => {
      this.news = news;
      window.scrollTo(0, 0);
      this.title.setTitle(news.title);
      this.meta.updateTag({ name: 'description', content: news.quote });
    });
  }
}
