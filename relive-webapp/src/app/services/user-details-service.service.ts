import { Injectable } from '@angular/core';
import { USERS } from '../mock-data';
import { User } from '../interfaces/users-details';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseURL } from './baseURL';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsServiceService {

  addUser = 'createNewUser/'
  
  updateUserItem(userItem: User): Observable<Object> {
    console.log(userItem)
    return this.http.post(baseURL+this.addUser, userItem)
  }

  constructor(
    private http: HttpClient
  ) { }
  
  getUsers(): Observable<User[]> {
    const users = of(USERS);
    return users;
  }
  
  getUser(id: number): Observable<User> {
    // For now, assume that a food with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const user = USERS.find(u => u.id === id)!;
    return of(user);
  }
}