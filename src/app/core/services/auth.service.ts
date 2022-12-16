import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/loginRequestModel';
import { LoginResponseModel } from '../models/loginResponseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  controllerUrl: string = `${environment.apiUrl}/auth`;
  constructor(private httpClient: HttpClient) {}

  login(request: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      this.controllerUrl + '/login',
      request
    );
  }
}
