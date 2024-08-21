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

  constructor(
    private http: HttpClient
  ) { }

  getUserMeasurements(customerID: number): Observable<UserMeasurement[]> {
    let measures = this.http.get<UserMeasurement[]>(baseURL+this.getbyCustomer+String(customerID))
    console.log("users", measures)
    return measures;
  }
}
