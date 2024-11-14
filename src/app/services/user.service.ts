import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserJwt } from '../interfaces';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL: string = '';
  constructor(private http: HttpClient) {
    this.baseURL = environment.API_URL;
  }

  public decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  public login(email: string, password: string) {
    return this.http.post(`${this.baseURL}/login`, { email, password });
  }

  public register(email: string, password: string, name: string) {
    return this.http.post(`${this.baseURL}/register`, {
      email,
      password,
      name,
    });
  }

  public getUsers() {
    return this.http.get(`${this.baseURL}/users`);
  }

  public registerUserMfa(userToken: string) {
    return this.http.post(`${this.baseURL}/register-mfa/${userToken}`, {});
  }

  public registerUserMfaValidation(userToken: string, totpCode: string) {
    return this.http.post(
      `${this.baseURL}/register-mfa-validation/${userToken}`,
      { totpCode }
    );
  }

  public userMfaAuthentication(userToken: string, totpCode: string) {
    return this.http.post(`${this.baseURL}/mfa-authentication/${userToken}`, {
      totpCode,
    });
  }
}
