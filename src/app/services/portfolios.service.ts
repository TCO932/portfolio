import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PortfoliosService {
  constructor(
    private http: HttpClient,
    private authServise: AuthService,
  ) {

  }

  getPortfolios() {
    let params = new HttpParams();
    params = params.append('method', 'getPortfolios');
    return this.get(params);
  }

  getPortfolio(portfolioId: string) {
    let params = new HttpParams()
      .append('method', 'getPortfolio')
      .append('portfolio_id', portfolioId);
    return this.get(params);
  }

  getUser(userId: string) {
    let params = new HttpParams()
      .append('method', 'getUserById')
      .append('user_id', userId);
    return this.get(params);
  }

  getComments(portfolioId: string) {
    let params = new HttpParams()
      .append('method', 'getComments')
      .append('portfolio_id', portfolioId);
    return this.get(params);
  }

  getImages(portfolioId: string) {
    let params = new HttpParams()
      .append('method', 'getImages')
      .append('portfolio_id', portfolioId);
    return this.get(params);
  }
  
  addPortfolio(name: string, description: string, creation_date: string, file: File, files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('method', 'addPortfolio');
    formData.append('token', this.authServise.getToken()!);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('creation_date', creation_date);
    formData.append(`title_image`, file, file.name);
    for (let i = 0; i < files.length; i++) {
      formData.append(`image${i}`, files[i], files[i].name);
    }

    const req = new HttpRequest('POST', environment.api, formData, {reportProgress: true});

    return this.http.request(req);
  }

  deletePortfolio(portfolioId: string) {
    const body = {
      'method': 'deletePortfolio',
      'portfolio_id': portfolioId,
      'token': this.authServise.getToken()!,
    }
    this.post(body).subscribe(
      (res) => {
        console.log(res);
        if (res.result == 'ok') {
        }
      }
    );
  }

  get(params?: HttpParams): Observable<any> {
    return this.http.get(environment.api, {params: params})
  }

  post(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(environment.api, body, { headers: headers })
  }
}
