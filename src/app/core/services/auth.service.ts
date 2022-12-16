import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/loginRequestModel';
import { LoginResponseModel } from '../models/loginResponseModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  controllerUrl: string = `${environment.apiUrl}/auth`;
  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService,
    private localStorageService: LocalStorageService
  ) {}

  login(request: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      this.controllerUrl + '/login',
      request
    );
  }

  get isAuthenticated(): boolean {
    let token = this.localStorageService.get('token');
    if (!token) return false;
    if (this.jwtHelperService.isTokenExpired()) return false;
    return true;
  }
}
