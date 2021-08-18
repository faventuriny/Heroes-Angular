import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewAccountComponent } from './components/auth/create-new-account/create-new-account.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HeroesCardsComponent } from './components/display-cards/heroes-cards/heroes-cards.component';
import { MyHeroesComponent } from './components/display-cards/my-heroes/my-heroes.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';
import { HeroesResolver } from './services/heroes.resolver';
import { MyHeroesResolver } from './services/my-heroes.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/heroes-cards', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'new-account', component: CreateNewAccountComponent, canActivate: [AuthGuard] },
  { path: 'heroes-cards', component: HeroesCardsComponent, canActivate: [AuthGuard], resolve: {serverResponse: HeroesResolver}, },
  { path: 'my-heroes', component: MyHeroesComponent, canActivate: [AuthGuard], resolve: {serverResponse: MyHeroesResolver}, },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
