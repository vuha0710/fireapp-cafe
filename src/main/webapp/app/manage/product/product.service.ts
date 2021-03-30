import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProduct, Product } from 'app/model/product.model';

type EntityResponseType = HttpResponse<IProduct>;
type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {
  public resourceUrl = SERVER_API_URL + 'api/products';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  update(item: Product): Observable<Product> {
    return this.http.put<Product>(`${this.resourceUrl}/${item.id}`, item);
  }

  delete(id: number): Observable<Product> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  create(item: Product): Observable<Product> {
    return this.http.post<Product>(`${this.resourceUrl}`, item);
  }
}
