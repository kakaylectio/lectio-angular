import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public login: LoginService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.login.getToken()}`
      }
    });
    return next.handle(request);
  }
}