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
    
    id: new FormControl(),
    loginID: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    phoneNumber: new FormControl(),
    joinDate: new FormControl(),
    startingWeight: new FormControl(),
    birthdayDate: new FormControl(),
    height: new FormControl(),
    age: new FormControl(),
    sex: new FormControl(),
    athlete: new FormControl(),
  });

  onSubmit() {
    console.log("submit new user")
    const userItem: User = {
      id: this.userControlDetails.value.id,
      loginID: this.userControlDetails.value.loginID,
      firstName: this.userControlDetails.value.firstName,
      lastName: this.userControlDetails.value.lastName,
      phoneNumber: this.userControlDetails.value.phoneNumber,
      joinDate: this.userControlDetails.value.joinDate,
      startingWeight: this.userControlDetails.value.startingWeight,
      birthdayDate: this.userControlDetails.value.birthdayDate,
      height: this.userControlDetails.value.height,
      age: this.userControlDetails.value.age,
      sex: this.userControlDetails.value.sex,
      athlete: this.userControlDetails.value.athlete,
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