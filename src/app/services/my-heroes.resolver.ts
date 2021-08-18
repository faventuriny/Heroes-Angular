import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { HeroService } from './hero.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class MyHeroesResolver implements Resolve<any> {
  constructor(private heroService: HeroService, private authService: AuthService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('--MyHeroesResolver--');

    let user: User
    user = this.authService.getUser()

    if(user != null){
      return this.heroService.getHeroesByTrainerId(user.id);
    }
    return of(arguments, {serverResponse: {isSuccess: false, payload: "Couldn't find user details"}})
  }
}
