import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetListOptionsType } from '../models/get-list-options';

//: Injectable, bir class'ın IoC'e katılması ve injectable olmasını sağlar. Dependency Injection mekanizmasını kullanarak servisin referansını alabiliriz.
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  controllerUrl: string = `${environment.apiUrl}/categories`;
  getCategory: any;

  constructor(private httpClient: HttpClient) {}

  //: undefined ve null ikilik sistemde karşıkları 00000000 olucak.
  //: undefined ilgili değişkenin tanımlanmamış olduğunu belirtir.
  //: null ilgili değişkenin tanımlanmış olduğunu belirtir fakat null değer geçildiği söyleyen. Programcılar geçiyoruz.
  // { pagination }: { pagination?: Pagination } = {} okuması biraz zor olduğu için tercih etmedik.
  getList(options?: GetListOptionsType): Observable<Category[]> {
    let queryParams: any = {};
    if (options?.pagination) {
      queryParams['_page'] = options.pagination.page;
      queryParams['_limit'] = options.pagination.pageSize;
    }
    if (options?.filters) {
      queryParams = { ...queryParams, ...options.filters };
    }

    return this.httpClient.get<Category[]>(this.controllerUrl, {
      params: queryParams,
    });
    // observe: 'response', //: Http Response tipini döndürür. (response.headers, response.body, response.status)
  }

  getById(categoryId: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.controllerUrl}/${categoryId}`);
  }

  add(request:Category): Observable<Category> {
    return this.httpClient.post<Category>(this.controllerUrl, request);
  }

  update(request: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${this.controllerUrl}/${request.id}`,
      request
    );
  }

  delete(categoryId: number): Observable<Category> {
    return this.httpClient.delete<Category>(
      `${this.controllerUrl}/${categoryId}`
    );
  }
}

