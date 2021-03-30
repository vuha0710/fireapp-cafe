import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';

import { ProductViewComponent } from './product-view.component';
import { ProductPublicDetailComponent } from './product-detail.component';
import { Injectable } from '@angular/core';
import { IProduct, Product } from 'app/model/product.model';
import { EMPTY, Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import { ProductViewService } from 'app/product/product-view.service';

@Injectable({ providedIn: 'root' })
export class ProductViewResolve implements Resolve<IProduct> {
  constructor(private service: ProductViewService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> | Observable<never> {
    const shortenCode = route.params['shortenCode'];
    if (shortenCode) {
      return this.service.findShortenCode(shortenCode).pipe(
        flatMap((product: HttpResponse<Product>) => {
          if (product.body) {
            return of(product.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Product());
  }
}

export const productViewRoute: Routes = [
  {
    path: '',
    component: ProductViewComponent,
    data: {
      pageTitle: 'Mộc Vinh Hoa!'
    }
  },
  {
    path: ':shortenCode',
    component: ProductPublicDetailComponent,
    resolve: {
      product: ProductViewResolve
    },
    data: {
      pageTitle: 'Mộc Vinh Hoa!'
    }
  }
];
