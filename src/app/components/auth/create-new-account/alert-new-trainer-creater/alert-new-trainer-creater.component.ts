import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trainer } from 'src/app/components/trainer';

@Component({
  selector: 'app-alert-new-trainer-creater',
  templateUrl: './alert-new-trainer-creater.component.html',
  styleUrls: ['./alert-new-trainer-creater.component.css']
})
export class AlertNewTrainerCreaterComponent implements OnInit {
  @Input() trainer!: Trainer
  @Output() closeAlert: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onClickCloseWindow() {
    this.closeAlert.emit("")
  }
  onEvent(event: Event){
    event.stopPropagation();
  }
}
