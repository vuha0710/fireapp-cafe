import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPartner, Partner } from 'app/model/partner.model';

type EntityResponseType = HttpResponse<IPartner>;
type EntityArrayResponseType = HttpResponse<IPartner[]>;

@Injectable({ providedIn: 'root' })
export class PartnerService {
  public resourceUrl = SERVER_API_URL + 'api/partners';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPartner>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPartner[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  update(partner: Partner): Observable<Partner> {
    return this.http.put<Partner>(`${this.resourceUrl}/${partner.id}`, partner);
  }

  delete(id: number): Observable<Partner> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  create(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(`${this.resourceUrl}`, partner);
  }
}
