import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseURL } from './baseURL';

@Injectable({
  providedIn: 'root'
})
export class SystemRecommendationService {

  getByCustomer = 'SystemRecommendation/getPlans/'

  constructor(
    private http: HttpClient,
  ) { }

  getUserSystemRecommendation(customerID: number): Observable<Object[]> {
    return this.http.get<Object[]>(baseURL+this.getByCustomer+String(customerID))
  }

}
