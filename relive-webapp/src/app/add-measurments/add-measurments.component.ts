import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { UserMeasurementsService } from '../services/user-measurements.service';
import { UserMeasurement } from '../interfaces/user-measurement';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-measurments',
  templateUrl: './add-measurments.component.html',
  styleUrl: './add-measurments.component.css'
})
export class AddMeasurmentsComponent {
  existingMeasure = Boolean(this.route.snapshot.paramMap.get('measureID'))
  customerID = Number(this.route.snapshot.paramMap.get('custID'));
  measureID = Number(this.route.snapshot.paramMap.get('measureID'));
  measureDetail: UserMeasurement | undefined

  measurementForm = new FormGroup({
    MeasureID: new FormControl(''),
    CustomerID: new FormControl(''),
    MeasureDate: new FormControl(''),
    TotalWeight: new FormControl(''),
    Height: new FormControl(''),
    BMI: new FormControl(''),
    BMR: new FormControl(''),
    AbdominalFatPercentage: new FormControl(''),
    FatPercentage: new FormControl(''),
    Muscles: new FormControl(''),
    Bones: new FormControl(''),
    Liquids: new FormControl(''),
    HipCircumference: new FormControl(''),
    HandCircumference: new FormControl(''),
    ThighCircumference: new FormControl(''),
    ChestCircumference: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private userMeasureService: UserMeasurementsService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    console.log(this.customerID, this.route.snapshot.paramMap.get("measureID"), this.existingMeasure)
    if(this.existingMeasure == true) {
      this.measureID = Number(this.route.snapshot.paramMap.get('measureID'));
      console.log(this.measureID)
      this.userMeasureService.getMeasurement(this.measureID).subscribe(
        (measurement) => {
          this.measureDetail = measurement[0];
          console.log("measurement", measurement, this.measureDetail);
        },
        (error) => {
          console.error("Error fetching diet programs or meals summary:", error);
        }
      );
      // .subscribe((measurement) => {
      //   this.measureDetail = measurement;
      //   console.log("m", measurement, this.measureDetail)
      // })
    }
      // this.measureDetail = this.userMeasureService.getMeasurement(this.measureID)
  }

  goBack(): void {
    this.location.back();
  }

  handleSubmit() {
    console.log(this.measurementForm, this.measureDetail, this.existingMeasure)
    if(this.measureDetail && this.existingMeasure) {
      this.userMeasureService.UpdateUserMeasurements(this.measureDetail).subscribe(() => {
        console.log('Food item updated successfully.');
        // Navigate back to previous page or component
        this.location.back();
      }, error => {
        console.error('Error updating food item:', error);
        // Handle error scenario if needed
      });
    } else {
      const measurement: UserMeasurement = {
        MeasureID: Number(this.measurementForm.value.MeasureID),
        CustomerID: Number(this.measurementForm.value.CustomerID),
        MeasureDate: new Date(),
        TotalWeight: Number(this.measurementForm.value.TotalWeight),
        Height: Number(this.measurementForm.value.Height),
        BMI: Number(this.measurementForm.value.BMI),
        BMR: Number(this.measurementForm.value.BMR),
        AbdominalFatPercentage: Number(this.measurementForm.value.AbdominalFatPercentage),
        FatPercentage: Number(this.measurementForm.value.FatPercentage),
        Muscles: Number(this.measurementForm.value.Muscles),
        Bones: Number(this.measurementForm.value.Bones),
        Liquids: Number(this.measurementForm.value.Liquids),
        HipCircumference: Number(this.measurementForm.value.HipCircumference),
        HandCircumference: Number(this.measurementForm.value.HandCircumference),
        ThighCircumference: Number(this.measurementForm.value.ThighCircumference),
        ChestCircumference: Number(this.measurementForm.value.ChestCircumference),
      };
      this.userMeasureService.AddUserMeasurements(measurement).subscribe(() => {
        console.log('Food item updated successfully.');
        // Navigate back to previous page or component
        this.location.back();
      }, error => {
        console.error('Error updating food item:', error);
        // Handle error scenario if needed
      });
    }
  }
}
