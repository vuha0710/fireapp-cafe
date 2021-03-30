import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPartner, Partner } from 'app/model/partner.model';
import { PartnerService } from './partner.service';
import { PartnerComponent } from './partner.component';
import { PartnerViewComponent } from './partner-view.component';

@Injectable({ providedIn: 'root' })
export class PartnerResolve implements Resolve<IPartner> {
  constructor(private service: PartnerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPartner> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((partner: HttpResponse<Partner>) => {
          if (partner.body) {
            return of(partner.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Partner());
  }
}

export const partnerRoute: Routes = [
  {
    path: '',
    component: PartnerComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Partners'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PartnerViewComponent,
    resolve: {
      partner: PartnerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Partners'
    }
  },
  {
    path: ':id/view',
    component: PartnerViewComponent,
    resolve: {
      partner: PartnerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Partners'
    },
    canActivate: [UserRouteAccessService]
  }
];
