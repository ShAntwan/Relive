import { Component,OnInit } from '@angular/core';
import { DietProgramService } from '../services/diet-program.service';
import { dietProgram } from '../interfaces/diet-program';
import { ActivatedRoute } from '@angular/router';

import { dietProgramMeals } from '../interfaces/diet-program-meal-foods';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-diet-program',
  templateUrl: './diet-program.component.html',
  styleUrl: './diet-program.component.css'
})
export class DietProgramComponent {
  dietprograms: dietProgram[] | undefined;
  dietProgramMeals: dietProgramMeals[] | undefined

  weekdays: String[]=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  hours = Array.from({ length: 25 }).map((_, i) => i + ":00").slice(5,24)

  
  constructor(
    private DietProgramService: DietProgramService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void{
    // this.getDietPrograms();
    // this.getDietProgramsMealsSummary()
    this.getDietProgramsAndMealsSummary();
    console.log(this.hours)
  }

  convertToNum(hour:string): number{
    return Number(hour)
  }
  
  getDietProgramsAndMealsSummary() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.DietProgramService.getUserDietPrograms(id)
      .pipe(
        switchMap(dietPrograms => {
          this.dietprograms = dietPrograms;
          if (dietPrograms.length > 0) {
            const programId = dietPrograms[0].ProgramID;
            return this.DietProgramService.getUserDietProgramMealsSummary(programId);
          } else {
            return []; // Return an empty observable if no programs are found
          }
        })
      )
      .subscribe(
        (dietProgramMeals) => {
          this.dietProgramMeals = dietProgramMeals;
          console.log("programMeals", dietProgramMeals);
        },
        (error) => {
          console.error("Error fetching diet programs or meals summary:", error);
        }
      );
  }

  formatDate(date: any, type: string): string {
    if (date == undefined)
      return "Not Set"
    if (type == "date")
      return new Date(date).toLocaleDateString()
    return new Date(date).toLocaleString()
  }
}
