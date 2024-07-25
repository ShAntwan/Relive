import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DIETPROGRAMS } from '../mock-data';
import { dietProgram } from '../interfaces/diet-program';
@Injectable({
  providedIn: 'root'
})
export class DietProgramService {

  constructor() { }
  getDietPrograms(): Observable<dietProgram[]>{
      const dietprograms = of(DIETPROGRAMS)
      return dietprograms
  }
}
