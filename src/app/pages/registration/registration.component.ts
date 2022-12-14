import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public step: number = 1;
  regForm = new FormGroup({
    name: new FormControl(''),
    login: new FormControl(''),
    role: new FormControl(''),
    birthDate: new FormControl(''),
    password: new FormControl(''),
    passwordSubmit: new FormControl(''),
  });

  constructor(
    private router: Router,

  ) {

  }

  next() {
    if (this.step < 4) {
      this.step++;
    }
  }

  back() {
    if (this.step > 1) {
      this.step--;
    }
  }

  register() {
    // вход
  }

  goToMain() {
    this.router.navigate(['main']);
  }
}
