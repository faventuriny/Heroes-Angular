import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CreateNewAccountComponent } from './components/auth/create-new-account/create-new-account.component';
import { AlertNewTrainerCreaterComponent } from './components/auth/create-new-account/alert-new-trainer-creater/alert-new-trainer-creater.component';
import { HeroCardComponent } from './components/cards/hero-card/hero-card.component';
import { SimpleHeroCardComponent } from './components/cards/simple-hero-card/simple-hero-card.component';
import { HeroesCardsComponent } from './components/display-cards/heroes-cards/heroes-cards.component';
import { MyHeroesComponent } from './components/display-cards/my-heroes/my-heroes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    LoginComponent,
    CreateNewAccountComponent,
    AlertNewTrainerCreaterComponent,
    HeroCardComponent,
    SimpleHeroCardComponent,
    HeroesCardsComponent,
    MyHeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
