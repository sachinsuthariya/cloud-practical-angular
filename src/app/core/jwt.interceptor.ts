import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { HelperService } from '../services/helper.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private helperService: HelperService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     // add auth header with jwt if user is logged in and request it to the api url
     const token = this.helperService.getLocalStorage('token');
     const isLoggedIn = this.authenticationService.isLoggedIn();
     const isApiUrl = request.url.startsWith(environment.API_URL);
     if (isLoggedIn && isApiUrl) {
         request = request.clone({
             setHeaders: {
                 authorization: `Bearer ${token}`
             }
         });
     }
    return next.handle(request);
  }
}
