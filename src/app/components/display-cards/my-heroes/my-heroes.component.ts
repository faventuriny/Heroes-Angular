import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-my-heroes',
  templateUrl: './my-heroes.component.html',
  styleUrls: ['../display-cards-style.css','./my-heroes.component.css'],
})
export class MyHeroesComponent implements OnInit {
  heroesList: Hero[]
  isDataFromServerOk: boolean = false
  serverMsg: string = ''

  constructor(private route: ActivatedRoute) {
    this.heroesList = []
  }

  ngOnInit(): void {
      this.getHeroesListByTrainerId();
  }

  getHeroesListByTrainerId() {
    this.route.data
      .subscribe((data: Data) => {
        console.log(data);
        if(data.serverResponse.isSuccess){
          this.heroesList = <Hero[]><unknown>data.serverResponse.payload
          this.isDataFromServerOk = true;
        } else {
          this.isDataFromServerOk = false;
          this.serverMsg = data.serverResponse.payload;
        }
      }, (error: any)=>{
        console.log('error',error);

        this.isDataFromServerOk = false;
        this.serverMsg = error.message;
      })
  }
}
