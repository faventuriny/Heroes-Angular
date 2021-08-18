import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('--AuthInterceptor--');

    let user: User
    user = this.authService.getUser()
    if(user !== null){
      return next.handle(request.clone({headers: new HttpHeaders({Authorization: `Bearer ${user.token}`})}));
    }

    return next.handle(request.clone({headers: new HttpHeaders()}));
  }
}
