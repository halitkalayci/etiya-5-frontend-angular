import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetListOptionsType } from '../../../core/models/get-list-options';

//: Injectable, bir class'ın IoC'e katılması ve injectable olmasını sağlar. Dependency Injection mekanizmasını kullanarak servisin referansını alabiliriz.
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  controllerUrl: string = `${environment.apiUrl}/categories`;

  constructor(private httpClient: HttpClient) {}

  //: Generic, bir class'ın/metodun içerisnde kullanılacak tipi/tipleri belirlemek için kullanılır.
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
  }

  getById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.controllerUrl}/${id}`);
  }
}
