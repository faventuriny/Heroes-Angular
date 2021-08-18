import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = '';
  userNameSubscription: Subscription;
  showTextMyHeroes = true;
  buttonMsg = 'My Heroes';

  constructor(private router: Router, private authServer: AuthService) {
    this.userNameSubscription = this.authServer.userNameObservable.subscribe((data)=> {
      this.userName = data
    })
  }
  ngOnInit(): void {
    let user = this.authServer.getUser()
    if(user !== null) {
      this.userName = user.name
    } else {
      this.userName = ''
    }
  }

  onClickLogo() {
    this.buttonMsg = "My Heroes"
    this.showTextMyHeroes = true
    this.router.navigateByUrl('/')
  }

  onClickMyHeroes(){
    if(this.showTextMyHeroes){
      console.log("onClickMyHeroes");
      this.buttonMsg = "All Heroes"
      this.router.navigateByUrl('/my-heroes')
    } else {
      console.log("onClickAllHeroes");
      this.buttonMsg = "My Heroes"
      this.router.navigateByUrl('/')
    }
    this.showTextMyHeroes = !this.showTextMyHeroes
  }

  onClickLogout(){
    console.log("onClickLogout()");
    this.authServer.resetUser()
    window.location.reload();
  }

}
