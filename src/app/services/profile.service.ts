import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public user = new Subject<User>();
  private _user?: User;

  constructor(
    private http: HttpClient,
  ) {

  }

  getUser() {
    return this._user;
  }

  setUser(user: User) {
    console.log(user);
    this._user= user;
    this.user.next(user);
  }

  setUserByToken(token: string) {
    let params = new HttpParams()
      .append('method', 'getUserByToken')
      .append('token', token);
    this.get(params).subscribe(res => {
      this.setUser(res.data);
    })
  }
  
  private get(params?: HttpParams): Observable<any> {
    return this.http.get(environment.api, {params: params})
  }
}
