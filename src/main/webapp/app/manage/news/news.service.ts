import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INews, News } from 'app/model/news.model';

type EntityResponseType = HttpResponse<INews>;
type EntityArrayResponseType = HttpResponse<INews[]>;

@Injectable({ providedIn: 'root' })
export class NewsService {
  public resourceUrl = SERVER_API_URL + 'api/news';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INews>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INews[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  update(news: News): Observable<News> {
    return this.http.put<News>(`${this.resourceUrl}/${news.id}`, news);
  }

  delete(id: number): Observable<News> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  create(news: News): Observable<News> {
    return this.http.post<News>(`${this.resourceUrl}`, news);
  }
}
