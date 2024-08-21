import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/users-details';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { UserDetailsServiceService } from '../../services/user-details-service.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})

export class NewUserComponent {
  user: User | undefined;
  users: User[] = [];
  userControlDetails = new FormGroup({
    
    CardID: new FormControl(),
    LoginID: new FormControl(),
    FirstName: new FormControl(),
    LastName: new FormControl(),
    PhoneNumber: new FormControl(),
    JoinDate: new FormControl(),
    startingWeight: new FormControl(),
    BirthdayDate: new FormControl(),
    height: new FormControl(),
    // age: new FormControl(),
    Email: new FormControl(),
    Sex: new FormControl(),
    Athlete: new FormControl(),
    DefaultLang: new FormControl(),
  });

  onSubmit() {
    console.log("submit new user")
    const userItem: User = {
      CustomerID: -1,
      CardID: this.userControlDetails.value.CardID,
      LoginID: this.userControlDetails.value.LoginID,
      FirstName: this.userControlDetails.value.FirstName,
      LastName: this.userControlDetails.value.LastName,
      PhoneNumber: this.userControlDetails.value.PhoneNumber,
      JoinDate: this.userControlDetails.value.JoinDate,
      startingWeight: this.userControlDetails.value.startingWeight,
      BirthdayDate: this.userControlDetails.value.BirthdayDate,
      height: this.userControlDetails.value.height,
      // age: this.userControlDetails.value.age,
      Email: this.userControlDetails.value.Email,
      Sex: this.userControlDetails.value.Sex,
      Athlete: this.userControlDetails.value.Athlete,
      DefaultLang: this.userControlDetails.value.DefaultLang,
    };
    console.log("dauser", userItem)
    this.userService.updateUserItem(userItem).subscribe(() => {
      console.log('Food item updated successfully.');
      // Navigate back to previous page or component
      this.location.back();
    }, (error: any) => {
      console.error('Error updating food item:', error);
      // Handle error scenario if needed
    });
    // this.location.back();
  }
  constructor(
    private router: Router,
    private userService: UserDetailsServiceService,
    private location: Location,
    ) {}




// test() {
// this.router.navigateByUrl('/user-measurment/1');
// throw new Error('Method not implemented.');
// }

}