import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private authServise: AuthService,
  ) {
    authServise.auth.subscribe(res => {
      if (res == true) {
        this.router.navigate(['main']);
      }
    });
    authServise.checkAuth();
  }

  logIn() {
    const controls = this.loginForm.controls;
    this.authServise.login(controls.login.value!, controls.password.value!);
  }

  goToReg() {
    this.router.navigate(['registration']);
  }
}
