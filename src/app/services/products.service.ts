import { GetListOptionsType } from './../models/get-list-options';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  controllerUrl: string = `${environment.apiUrl}/products`;
  getProduct: any;

  constructor(private httpClient: HttpClient) {}

  //: undefined ve null ikilik sistemde karşıkları 00000000 olucak.
  //: undefined ilgili değişkenin tanımlanmamış olduğunu belirtir.
  //: null ilgili değişkenin tanımlanmış olduğunu belirtir fakat null değer geçildiği söyleyen. Programcılar geçiyoruz.
  // { pagination }: { pagination?: Pagination } = {} okuması biraz zor olduğu için tercih etmedik.
  getList(options?: GetListOptionsType): Observable<Products[]> {
    let queryParams: any = {};
    if (options?.pagination) {
      queryParams['_page'] = options.pagination.page;
      queryParams['_limit'] = options.pagination.pageSize;
    }
    if (options?.filters) {
      queryParams = { ...queryParams, ...options.filters };
    }

    return this.httpClient.get<Products[]>(this.controllerUrl, {
      params: queryParams,
    });
    // observe: 'response', //: Http Response tipini döndürür. (response.headers, response.body, response.status)
  }

  getById(productId: number): Observable<Products> {
    return this.httpClient.get<Products>(`${this.controllerUrl}/${productId}`);
  }

  add(request: Products): Observable<Products> {
    return this.httpClient.post<Products>(this.controllerUrl, request);
  }

  update(request: Products): Observable<Products> {
    return this.httpClient.put<Products>(
      `${this.controllerUrl}/${request.id}`,
      request
    );
  }

  delete(productId: number): Observable<Products> {
    return this.httpClient.delete<Products>(
      `${this.controllerUrl}/${productId}`
    );
  }
}
