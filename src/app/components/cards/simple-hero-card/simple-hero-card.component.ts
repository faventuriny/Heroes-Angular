import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../hero';

@Component({
  selector: 'app-simple-hero-card',
  templateUrl: './simple-hero-card.component.html',
  styleUrls: ['../card-style.css','./simple-hero-card.component.css']
})
export class SimpleHeroCardComponent {
  @Input() hero: Hero;

  constructor(){
    this.hero = {
      name : "Stam",
      ability: "Stam",
      dateStarted: new Date(12/3/2021),
      suitColor: "Stam",
      startingPower: 12.08,
      currentPower: 20.67,
      howManyTimesTrainedToday: 0,
      trainerID: ""
    }
  }
  showAbility: boolean = false
  onClickTogglHideShow() {
    this.showAbility = !this.showAbility
  }
}
