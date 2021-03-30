import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';

import { NewsViewComponent } from './news-view.component';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { NewsViewService } from 'app/news/news-view.service';
import { flatMap } from 'rxjs/operators';
import { INews, News } from 'app/model/news.model';
import { NewsPublicDetailComponent } from './news-detail.component';

@Injectable({ providedIn: 'root' })
export class NewsViewResolve implements Resolve<INews> {
  constructor(private service: NewsViewService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INews> | Observable<never> {
    const shortenCode = route.params['shortenCode'];
    if (shortenCode) {
      return this.service.findShortenCode(shortenCode).pipe(
        flatMap((news: HttpResponse<News>) => {
          if (news.body) {
            return of(news.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new News());
  }
}

export const newsViewRoute: Routes = [
  {
    path: '',
    component: NewsViewComponent,
    data: {
      pageTitle: 'Mộc Vinh Hoa!'
    }
  },
  {
    path: ':shortenCode',
    component: NewsPublicDetailComponent,
    resolve: {
      news: NewsViewResolve
    },
    data: {
      pageTitle: 'Mộc Vinh Hoa!'
    }
  }
];
