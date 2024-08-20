import { Injectable } from '@angular/core';
// import { USERS } from '../mock-data';
import { User } from '../interfaces/users-details';
import { baseURL } from './baseURL';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsServiceService {
  getLatest = 'CustomerDetails/getLatest100/';
  getAll = 'CustomerDetails/getAll/';
  findUser = 'CustomerDetails/get/'
  // updateFood = 'FoodItems/update/'

  constructor(
    private http: HttpClient
  ) { }
  
  getUsersLimited(): Observable<User[]> {
    let users = this.http.get<User[]>(baseURL+this.getLatest)
    console.log("users", users)
    return users;
  }
  
  getUser(customerID: number): Observable<User[]> {
    let user = this.http.get<User[]>(baseURL+this.findUser+String(customerID))
    console.log("user", user)
    return user;
  }


  // utilities:

  public calculateAge(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  
}
