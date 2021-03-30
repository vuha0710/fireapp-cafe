import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INews, News } from 'app/model/news.model';
import { NewsService } from './news.service';
import { NewsComponent } from './news.component';
import { NewsViewComponent } from './news-view.component';

@Injectable({ providedIn: 'root' })
export class NewsResolve implements Resolve<INews> {
  constructor(private service: NewsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INews> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
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

export const newsRoute: Routes = [
  {
    path: '',
    component: NewsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'News'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NewsViewComponent,
    resolve: {
      news: NewsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'News'
    }
  },
  {
    path: ':id/view',
    component: NewsViewComponent,
    resolve: {
      news: NewsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'News'
    },
    canActivate: [UserRouteAccessService]
  }
];
