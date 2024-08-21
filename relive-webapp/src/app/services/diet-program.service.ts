import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { baseURL } from './baseURL';

import { dietProgram } from '../interfaces/diet-program';
import { dietProgramMeals } from '../interfaces/diet-program-meal-foods';

@Injectable({
  providedIn: 'root'
})
export class DietProgramService {

  getByCustomer = 'DietPlan/getByCustomer/'
  getMealSumByCustomer = 'MealsSum/getByPlan/'

  constructor(
    private http: HttpClient,
  ) { }

  getUserDietPrograms(customerID: number): Observable<dietProgram[]> {
    return this.http.get<dietProgram[]>(baseURL+this.getByCustomer+String(customerID))
  }

  getUserDietProgramMealsSummary(programID: number): Observable<dietProgramMeals[]> {
    return this.http.get<dietProgramMeals[]>(baseURL+this.getMealSumByCustomer+String(programID))
  }
}
