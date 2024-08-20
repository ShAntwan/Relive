import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './baseURL';
import { LoginUser } from '../interfaces/user-login';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor 
{
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    let token = localStorage.getItem("access_token");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
 }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }

  login(UserName:string, Password: string){
    // return new Promise((resolve, reject) => {
    //   this.http.post<LoginUser>(baseURL+'loginauth', {UserName, Password})
    //     .subscribe(
    //       response => resolve(response),
    //       err => reject(err)
    //     );
    // });
    return this.http.post<LoginUser>(baseURL+'loginauth', {UserName, Password})
  }

  // private setSession(authResult) {
  //   const expiresAt = moment().add(authResult.expiresIn,'second');

  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  // }  
  
  logout() {
    localStorage.removeItem("access_token");
    // localStorage.removeItem("expires_at");
  }


  testAuth() {
    return this.http.get(baseURL+'protected')
  }

// public isLoggedIn() {
//     return moment().isBefore(this.getExpiration());
// }

// isLoggedOut() {
//     return !this.isLoggedIn();
// }

// getExpiration() {
//     const expiration = localStorage.getItem("expires_at");
//     const expiresAt = JSON.parse(expiration);
//     return moment(expiresAt);
// }  
}
