import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './baseURL';
import { LoginUser } from '../interfaces/user-login';
import { shareReplay } from 'rxjs';
import { ShareReplayConfig } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }

  login(UserName:string, Password: string){
    return this.http.post<LoginUser>(baseURL+'/api/login', {UserName, Password})
    // .do(res => this.setSession) 
    // .shareReplay()
  }

  // private setSession(authResult) {
  //   const expiresAt = moment().add(authResult.expiresIn,'second');

  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  // }  
  
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
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
