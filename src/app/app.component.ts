import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  public isLogedIn = false;

  constructor(
    private router: Router,
  ) {

  }

  
  navigate(route: string) {
    this.router.navigate([route]);
    console.log('routed!!')
  }
}
