import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';
import { ServerResponse } from './server-response';
import { Hero } from 'src/app/components/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }

  getHeroesList() {
    return this.http
      .get<ServerResponse>(environment.apiUrl + '/heroes')
      .pipe
        (
          map((res: ServerResponse)=> {
          if(res.isSuccess){
            let heroesList: Hero[] = res.payload
            heroesList = this.sortHeroesListByPower(heroesList)
          }
          return res
          }),
          take(1)
        )
  }

  getHeroesByTrainerId(trainerId: string){
    return this.http.get<ServerResponse>(environment.apiUrl + '/heroes/trainer/' + trainerId)
    .pipe(
      map((res: ServerResponse)=> {
        if(res.isSuccess){
          let heroesList: Hero[] = res.payload
          heroesList = this.sortHeroesListByPower(heroesList)
        }
        return res
        }),
      take(1)
    )
  }

  trainHero(heroId: number){
    return this.http.patch<ServerResponse>(environment.apiUrl + '/heroes/trainHero/' + heroId, {})
    .pipe(take(1))
  }

  private sortHeroesListByPower(heroesList: Hero[]){
    heroesList.sort((hero1, hero2)=> {
      return hero2.currentPower-hero1.currentPower
    })
    return heroesList
  }
}
