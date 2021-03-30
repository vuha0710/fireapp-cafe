import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { INews } from 'app/model/news.model';
import { createRequestOption } from 'app/shared/util/request-util';
import { INewsTop } from 'app/model/newsTop.model';

type EntityResponseType = HttpResponse<INews>;
type EntityArrayResponseType = HttpResponse<INews[]>;

@Injectable({ providedIn: 'root' })
export class NewsViewService {
  public resourceUrl = SERVER_API_URL + 'api/public/news';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INews>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findShortenCode(shortenCode: string): Observable<EntityResponseType> {
    return this.http.get<INews>(`${this.resourceUrl}/code/${shortenCode}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INews[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryTop(): Observable<EntityArrayResponseType> {
    return this.http.get<INewsTop[]>(`${this.resourceUrl}/top`, { observe: 'response' });
  }
}
