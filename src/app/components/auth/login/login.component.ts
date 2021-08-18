import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../style-auth.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiService: AuthService, private router: Router) { }

  form!: FormGroup
  email: any
  password: any

  isErrorLogin = false
  errorMessage =''

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.compose([Validators.minLength(8),Validators.pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&"]).*$/), Validators.required])),
    })

    this.email = this.form.get('email')
    this.password = this.form.get('password')
  }

  onSubmit(userDetails: any) {
    console.log("userDetails:",userDetails);

    this.apiService.login(userDetails)
      .subscribe((res: any) => {
        console.log('res:',res);
        this.router.navigateByUrl('/heroes-cards')
      }, (error: { message: any, status: number}) => {
        console.log('error', error);
        this.errorMessage = error.status === 400? 'The email address or password you entered is invalid. Please try again' : error.message
        this.isErrorLogin = true;
      })

  }

}
