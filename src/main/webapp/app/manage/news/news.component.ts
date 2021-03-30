import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { INews, News } from 'app/model/news.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { NewsService } from './news.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsDeleteDialogComponent } from 'app/manage/news/news-delete-dialog.component';

@Component({
  selector: 'jhi-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit, OnDestroy {
  news?: INews[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  previousPage!: number;

  constructor(
    protected newsService: NewsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.loadAll();
    });
    this.eventSubscriber = this.eventManager.subscribe('newsListModification', () => this.loadAll());
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  trackId(index: number, item: INews): number {
    return item.id!;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: INews[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.news = data ? data : [];
  }

  private loadAll(): void {
    this.newsService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<News[]>) => this.onSuccess(res.body, res.headers));
  }

  deleteNews(news: News): void {
    const modalRef = this.modalService.open(NewsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.news = news;
  }
}
