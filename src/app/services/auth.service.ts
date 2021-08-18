import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private userNameSubject =  new Subject<string>();
  userNameObservable = this.userNameSubject.asObservable()


  handleLoginResponse(res:any) {
    console.log('handleLoginResponse()',res);

    let user :User = {
      name: res.body.userName,
      token: res.body.token,
      id: res.body.userId
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    this.userNameSubject.next(res.body.userName);
  }

  getUser() {
    let userAsString = sessionStorage.getItem('user');
    if(userAsString !== null){
      return JSON.parse(userAsString)
    }
    return null;
  }
  resetUser() {
    sessionStorage.removeItem('user')
  }

  login(userDetails: { email: string, password: string }) {
    return this.http.post(
      environment.apiUrl + "/auth/login",
      userDetails,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      tap(data => this.handleLoginResponse(data),
        error => "")
    );
  }
  createNewUser(newTrainerDetails: any){
    return this.http.post(
      environment.apiUrl + '/auth/register',
      newTrainerDetails
    ).pipe(
      take(1)
    )
  }
}
