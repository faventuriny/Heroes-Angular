import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ServerResponse } from 'src/app/services/server-response';
import { Observable, of } from 'rxjs';
import { HeroService } from './hero.service';

@Injectable({ providedIn: 'root'})
export class HeroesResolver implements Resolve<ServerResponse> {
  constructor(private heroService: HeroService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ServerResponse> {
    console.log("--HeroesResolver--");
    return this.heroService.getHeroesList();
  }
}
