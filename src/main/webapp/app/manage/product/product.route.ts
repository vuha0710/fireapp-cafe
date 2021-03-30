import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProduct, Product } from 'app/model/product.model';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { ProductViewComponent } from './product-view.component';

@Injectable({ providedIn: 'root' })
export class ProductResolve implements Resolve<IProduct> {
  constructor(private service: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
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

export const productRoute: Routes = [
  {
    path: '',
    component: ProductComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Products'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductViewComponent,
    resolve: {
      product: ProductResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Products'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductViewComponent,
    resolve: {
      product: ProductResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Product'
    }
  }
];
