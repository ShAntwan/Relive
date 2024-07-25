import { Injectable } from '@angular/core';
import { USERS } from '../mock-data';
import { User } from '../interfaces/users-details';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsServiceService {

  constructor() { }
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