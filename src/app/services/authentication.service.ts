import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/user';
import { API } from '../shared/constant';
import { HelperService } from './helper.service';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private helperService: HelperService,
    private router: Router,
    private http: HttpClient) {}

  // login
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}${API.LOGIN}`, {
        email,
        password,
      })
      .pipe(
        map((res: LoginResponse) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.helperService.setLocalStorage('user', JSON.stringify({ id: res.data.id, email: res.data.email }));
          this.helperService.setLocalStorage('token', res.data.token || '');
          return res;
        })
      );
  }

  // to check whether user is loggedin or not
  isLoggedIn(): boolean {
    const token: string = this.helperService.getLocalStorage('token');
    return token ? true : false;
  }

  // logout
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
