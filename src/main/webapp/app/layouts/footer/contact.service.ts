import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { Contact, IContact } from 'app/model/contact.model';

type EntityResponseType = HttpResponse<IContact>;
type EntityArrayResponseType = HttpResponse<IContact[]>;

@Injectable({ providedIn: 'root' })
export class ContactViewService {
  public resourceUrl = SERVER_API_URL + 'api/public/contacts';

  constructor(protected http: HttpClient) {}

  sendContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.resourceUrl}/send`, contact);
  }
}
