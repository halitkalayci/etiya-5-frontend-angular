import { GetListOptionsType } from '../../../core/models/get-list-options';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  controllerUrl: string = `${environment.apiUrl}/products`;

  constructor(private httpClient: HttpClient) {}

  //: undefined ve null ikilik sistemde karşıkları 00000000 olucak.
  //: undefined ilgili değişkenin tanımlanmamış olduğunu belirtir.
  //: null ilgili değişkenin tanımlanmış olduğunu belirtir fakat null değer geçildiği söyleyen. Programcılar geçiyoruz.
  // { pagination }: { pagination?: Pagination } = {} okuması biraz zor olduğu için tercih etmedik.
  getList(options?: GetListOptionsType): Observable<Product[]> {
    let queryParams: any = {};
    if (options?.pagination) {
      queryParams['_page'] = options.pagination.page;
      queryParams['_limit'] = options.pagination.pageSize;
    }
    if (options?.filters) {
      queryParams = { ...queryParams, ...options.filters };
    }

    return this.httpClient.get<Product[]>(this.controllerUrl, {
      params: queryParams,
    });
    // observe: 'response', //: Http Response tipini döndürür. (response.headers, response.body, response.status)
  }

  getById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.controllerUrl}/${productId}`);
  }

  add(request: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.controllerUrl, request);
  }

  update(request: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `${this.controllerUrl}/${request.id}`,
      request
    );
  }

  delete(productId: number): Observable<Product> {
    return this.httpClient.delete<Product>(
      `${this.controllerUrl}/${productId}`
    );
  }
}
