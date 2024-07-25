import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/users-details';
import { UserDetailsServiceService } from '../services/user-details-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.css'
})
export class UsersDetailsComponent {
  users: User[] = [];

  constructor(
    private userDetailsService: UserDetailsServiceService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userDetailsService.getUsers().subscribe(users => this.users = users);
  }
}
