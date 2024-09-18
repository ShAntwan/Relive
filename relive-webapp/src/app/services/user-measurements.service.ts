import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserMeasurement } from '../interfaces/user-measurement';
import { baseURL } from './baseURL.js';

@Injectable({
  providedIn: 'root'
})
export class UserMeasurementsService {
  getbyCustomer = 'MeasurementDetails/getByCustomer/'
  getByID = 'MeasurementDetails/find/'
  addNew = 'MeasurementDetails/addNew/'
  updateExisting = 'MeasurementDetails/update/'

  constructor(
    private http: HttpClient
  ) { }

  getUserMeasurements(customerID: number): Observable<UserMeasurement[]> {
    let measures = this.http.get<UserMeasurement[]>(baseURL+this.getbyCustomer+String(customerID))
    console.log("measures", measures)
    return measures;
  }

  getMeasurement(measureID: number): Observable<UserMeasurement[]> {
    let measure = this.http.get<UserMeasurement[]>(baseURL+this.getByID+String(measureID))
    console.log("measure", measure)
    return measure;
  }

  AddUserMeasurements(measurementDetail: UserMeasurement): Observable<Object> {
    return this.http.post(baseURL+this.addNew, measurementDetail)
  }

  UpdateUserMeasurements(measurementDetail: UserMeasurement): Observable<Object> {
    return this.http.post(baseURL+this.updateExisting, measurementDetail)
  }
}
