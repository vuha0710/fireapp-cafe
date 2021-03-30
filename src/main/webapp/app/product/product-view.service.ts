import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IProduct } from 'app/model/product.model';
import { ISeo } from 'app/model/seo.model';

type EntityResponseType = HttpResponse<IProduct>;
type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductViewService {
  public resourceUrl = SERVER_API_URL + 'api/public/products';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findShortenCode(shortenCode: string): Observable<EntityResponseType> {
    return this.http.get<IProduct>(`${this.resourceUrl}/code/${shortenCode}`, { observe: 'response' });
  }

  findSeoPath(seoPath: string): Observable<EntityResponseType> {
    return this.http.get<ISeo>(`${this.resourceUrl}/seo/${seoPath}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http.get<IProduct[]>(this.resourceUrl, { observe: 'response' });
  }
}
