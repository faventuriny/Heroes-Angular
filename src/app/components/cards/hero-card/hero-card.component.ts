import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroService } from 'src/app/services/hero.service';
import { ServerResponse } from 'src/app/services/server-response';
import { Hero } from '../../hero';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['../card-style.css','./hero-card.component.css'],
  providers: [HeroService]
})
export class HeroCardComponent implements OnInit {
  @Input() hero: Hero;

  form!: FormGroup;
  name: any
  ability: any
  dateStarted: any
  suitColor: any
  startingPower: any
  currentPower: any
  howManyTimesTrainedToday: any


  isDataFromServerOk: boolean = false
  serverMsg: string = ''

  constructor(private heroService: HeroService, private fb: FormBuilder){
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

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl(this.hero.id),
      currentPower: new FormControl(this.hero.currentPower),
      howManyTimesTrainedToday: new FormControl(this.hero.howManyTimesTrainedToday,Validators.max(4))
    })
  }

  onSubmit() {
    this.heroService.trainHero(this.form.value.id)
      .subscribe((data: ServerResponse) => {
        if(data.isSuccess){
          console.log(data);
          this.hero = <Hero><unknown>data.payload
          this.isDataFromServerOk = true;
          this.ngOnInit()
        } else {
          this.isDataFromServerOk = false;
          this.serverMsg = data.payload;
        }
      })
  }

  showAbility: boolean = false
  onClickTogglHideShow() {
    this.showAbility = !this.showAbility
  }
}
