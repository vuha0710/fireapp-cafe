import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IHomeData } from 'app/model/home.model';

type EntityResponseType = HttpResponse<IHomeData>;
type EntityArrayResponseType = HttpResponse<IHomeData[]>;

@Injectable({ providedIn: 'root' })
export class HomeService {
  public resourceUrl = SERVER_API_URL + 'api/public/home';

  constructor(protected http: HttpClient) {}

  get(): Observable<EntityResponseType> {
    return this.http.get<IHomeData>(this.resourceUrl, { observe: 'response' });
  }
}
