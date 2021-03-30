import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContact, Contact } from 'app/model/contact.model';
import { ContactService } from './contact.service';
import { ContactComponent } from './contact.component';
import { ContactDetailComponent } from './contact-detail.component';

@Injectable({ providedIn: 'root' })
export class ContactResolve implements Resolve<IContact> {
  constructor(private service: ContactService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContact> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contact: HttpResponse<Contact>) => {
          if (contact.body) {
            return of(contact.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Contact());
  }
}

export const contactRoute: Routes = [
  {
    path: '',
    component: ContactComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Partners'
    }
  },
  {
    path: ':id/view',
    component: ContactDetailComponent,
    resolve: {
      contact: ContactResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Contacts'
    },
    canActivate: [UserRouteAccessService]
  }
];
