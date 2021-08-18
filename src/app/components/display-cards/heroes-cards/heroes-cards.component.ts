import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-heroes-cards',
  templateUrl: './heroes-cards.component.html',
  styleUrls: ['../display-cards-style.css','./heroes-cards.component.css'],
})
export class HeroesCardsComponent implements OnInit {

  heroesList: Hero[]
  isDataFromServerOk: boolean = false
  serverMsg: string = ''

  constructor(private route: ActivatedRoute) {
    this.heroesList = []
  }

  ngOnInit(): void {
    this.getHeroesList();
  }

  getHeroesList() {
    console.log('getHeroesList');

    this.route.data
    .subscribe((data: Data) => {
      console.log(data);
      if(data.serverResponse.isSuccess){
        this.heroesList = <Hero[]><unknown>data.serverResponse.payload
        this.isDataFromServerOk = true;
      }
      else {
        this.isDataFromServerOk = false;
        this.serverMsg = data.serverResponse.payload;
      }
    })
  }
}
