import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/users-details';
import { UserDetailsServiceService } from '../../services/user-details-service.service';
import { Location } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.css'
})
export class UsersDetailsComponent {
  users: User[] = [];

  constructor(
    private userDetailsService: UserDetailsServiceService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userDetailsService.getUsersLimited().subscribe(data => { this.users = data; console.log(data) });
    // this.foodService.getFoodsAPIhttpGet().subscribe(foods => this.foods = foods)
    // this.userDetailsService.getUsersLimited().then((data: any) => { this.foods = data }).then(()=>{console.log("inner foods:", this.foods)})
    console.log(this.users)
  }

  calcAge(date: any){
    return this.userDetailsService.calculateAge(date)
  }
}
