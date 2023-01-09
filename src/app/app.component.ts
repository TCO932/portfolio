import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { ProfileService } from './services/profile.service';
import { User } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'portfolio';
  public isLogedIn = false;
  public user?: User;
  public options = [
    {
      label: 'Добавить портфолио',
      icon: 'pi pi-refresh',
      command: () => {
        this.navigate('add-portfolio');
      }
    },
    // {
    //   label: 'Настройки',
    //   icon: 'pi pi-refresh',
    //   command: () => {
    //     this.logout();
    //   }
    // },
    {
      label: 'Выйти',
      icon: 'pi pi-refresh',
      command: () => {
        this.logout();
      }
    }
  ]

  constructor (
    private router: Router,
    private authServise: AuthService,
    private matIconRegistry: MatIconRegistry,
    private profileService: ProfileService, 
    ) {
    profileService.user.subscribe(res => {
      this.user = res;
    });
    authServise.auth.subscribe(res => {
      this.isLogedIn = res;
      const token = authServise.getToken();
      profileService.setUserByToken(token);
    });
    authServise.checkAuth();
  }
  
  navigate(route: string) {
    this.router.navigate([route]);
    console.log('routed!!')
  }

  logout() {
    this.authServise.logout();
  }
}
