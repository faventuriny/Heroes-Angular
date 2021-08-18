import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CreateNewTrainerResponse } from 'src/app/components/create-new-trainer-response';
import { Trainer } from 'src/app/components/trainer';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.css', '../style-auth.css']
})
export class CreateNewAccountComponent implements OnInit {
  constructor(private fb: FormBuilder, private apiService: AuthService, private router: Router) { }

  form!: FormGroup;
  name: any
  email: any
  password: any

  newTrainer: Trainer = {
    name: "any",
    email: "any",
    password: "any"
  }
  displayAlertWindow: boolean = false

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.minLength(2), Validators.pattern(/^[A-Z][a-z]+$/),Validators.required])),
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.compose([Validators.minLength(8),Validators.pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&"]).*$/), Validators.required])),
    })

    this.name = this.form.get('name')
    this.email = this.form.get('email')
    this.password = this.form.get('password')
  }

  onSubmit(newTrainerDetails: any) {
    console.log("newTrainerDetails",newTrainerDetails);

    this.newTrainer.name = newTrainerDetails.name;
    this.newTrainer.email = newTrainerDetails.email;
    this.newTrainer.password = newTrainerDetails.password;

    this.apiService.createNewUser({
      userName: newTrainerDetails.name,
      email: newTrainerDetails.email,
      password: newTrainerDetails.password
    })
    .subscribe((resData: CreateNewTrainerResponse | any) => {
      console.log('resData', resData);
      this.newTrainer.id = resData.userId;
      this.displayAlertWindow = true;
    }, error => {
      console.log('error', error.message);
    })
  }

  onClickCloseAlert(event: Event) {
    this.displayAlertWindow = false;
  }

}
