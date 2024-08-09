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
    return this.http.post<LoginUser>(baseURL+'/api/login', {UserName, Password})//.shareReplay()
  }
}
