import { ActivatedRouteSnapshot, Resolve, Route, Router } from '@angular/router';

import { ProductPublicDetailSeoComponent } from './product-detail-seo.component';
import { Injectable } from '@angular/core';
import { ProductViewService } from 'app/product/product-view.service';
import { EMPTY, Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import { ISeo, Seo } from 'app/model/seo.model';

@Injectable({ providedIn: 'root' })
export class ProductViewSeoResolve implements Resolve<ISeo> {
  constructor(private service: ProductViewService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISeo> | Observable<never> {
    const seoPath = route.params['seoPath'];
    if (seoPath) {
      return this.service.findSeoPath(seoPath).pipe(
        flatMap((seo: HttpResponse<Seo>) => {
          if (seo.body) {
            return of(seo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Seo());
  }
}

export const PRODUCT_SEO_ROUTE: Route = {
  path: ':seoPath',
  component: ProductPublicDetailSeoComponent,
  resolve: {
    seo: ProductViewSeoResolve
  },
  data: {
    pageTitle: 'xin chao'
  }
};
