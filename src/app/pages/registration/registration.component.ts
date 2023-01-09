import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
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
    private authServise: AuthService,
  ) {
    authServise.auth.subscribe(res => {
      if (res == true) {
        this.router.navigate(['main']);
      }
    });
    authServise.checkAuth();
  }
  ngOnInit(): void {
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
    console.log(this.regForm.controls)
    if (this.regForm.controls.password.value == this.regForm.controls.passwordSubmit.value) {
      const controls = this.regForm.controls;
      this.authServise.register(controls.name.value!, controls.login.value!, controls.birthDate.value!, controls.password.value!, controls.role.value!).subscribe(
        (res) => {
          if (res.result == 'ok') {
            this.next();
          } else {
            this.step = 1;
          }
        }
      );
    } else {
      console.log('пароли не совпадают')
    }
  }

  goToMain() {
    this.router.navigate(['main']);
  }
}
