import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private profileService: ProfileService, 
  ) {
  }

  checkAuth() {
    if (localStorage.getItem('token')) {
      this.auth.next(true);
    } else {
      this.auth.next(false);
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this.auth.next(false);
  }

  getToken() {
    return localStorage.getItem('token') ?? '';
  }

  register(name: string, login: string, birth_date: string, password: string, role: string): Observable<any>  {
    const body = {
      'method': 'registration',
      'name': name,
      'login': login,
      'birth_date': birth_date,
      'password': password,
      'role': role,
    };
    this.post(body).subscribe(
      (res) => {
        if (res.result == 'ok') {
          localStorage.setItem('token', res.data.token);
          this.checkAuth();
          console.log('registration');
          console.log(res.data);
          this.profileService.setUser(res.data);
        }
      }
    );
    return this.post(body)
  }

  login(login: string, password: string) {
    const body = {
      'method': 'login',
      'login': login,
      'password': password,
    }
    this.post(body).subscribe(
      (res) => {
        if (res.result == 'ok') {
          localStorage.setItem('token', res.data.token);
          this.checkAuth();
          console.log(res.data);
          this.profileService.setUser(res.data);
        }
      }
    );
  }

  logout() {
    const body = {
      'method': 'logout',
      'token': this.getToken(),
    }
    this.post(body).subscribe(
      (res) => {
        if (res.result == 'ok') {
          localStorage.removeItem('token');
          this.checkAuth();
        }
      }
    );
  }
  
  post(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(environment.api, body, { headers: headers })
  }
}
