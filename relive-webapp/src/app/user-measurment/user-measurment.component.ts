import { Component } from '@angular/core';
import { User } from '../interfaces/users-details';
import { UserMeasurement } from '../interfaces/user-measurement';

import { ActivatedRoute } from '@angular/router';
import { UserDetailsServiceService } from '../services/user-details-service.service';
import { UserMeasurementsService } from '../services/user-measurements.service';

import { Location } from '@angular/common';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-user-measurment',
  templateUrl: './user-measurment.component.html',
  styleUrl: './user-measurment.component.css'
})
export class UserMeasurmentComponent {
  user: User | undefined;
  measurements: UserMeasurement[] | undefined

  constructor(
    private route: ActivatedRoute,
    private userService: UserDetailsServiceService,
    private userMeasureService: UserMeasurementsService,
    private location: Location,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getUserMeasures();
    this.appComponent.setBackVisibility(true)
  }

  goBack(): void {
    this.location.back();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(data => { this.user = data[0], console.log("user", data)})
  }

  getUserMeasures(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userMeasureService.getUserMeasurements(id).subscribe(data => { this.measurements = data, console.log("Measures", data)})
  }

  calcAge(date: any){
    return this.userService.calculateAge(date)
  }

  formatDate(date: any, type: string): string {
    if (type == "date")
      return new Date(date).toLocaleDateString()
    return new Date(date).toLocaleString()
  }
}
