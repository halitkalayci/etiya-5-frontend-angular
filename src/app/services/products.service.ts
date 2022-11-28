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

  getList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.controllerUrl);
  }
}
