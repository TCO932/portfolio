import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPortfolioComponent } from './pages/add-portfolio/add-portfolio.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'portfolio/:id', component: PortfolioComponent },
  { path: 'add-portfolio', component: AddPortfolioComponent },
  { path: '**',   redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
