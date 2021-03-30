import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { Contact, IContact } from 'app/model/contact.model';

type EntityResponseType = HttpResponse<IContact>;
type EntityArrayResponseType = HttpResponse<IContact[]>;

@Injectable({ providedIn: 'root' })
export class ContactService {
  public resourceUrl = SERVER_API_URL + 'api/contacts';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContact>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContact[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<Contact> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  read(id: number): Observable<{}> {
    return this.http.post(`${this.resourceUrl}/${id}/read`, {});
  }
}
