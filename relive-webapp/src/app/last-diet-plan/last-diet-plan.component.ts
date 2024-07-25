import { Component } from '@angular/core';
import { DietProgramService } from '../services/diet-program.service';
import { dietProgram } from '../interfaces/diet-program';


@Component({
  selector: 'app-last-diet-plan',
  templateUrl: './last-diet-plan.component.html',
  styleUrl: './last-diet-plan.component.css'
})
export class LastDietPlanComponent {
  dietprograms: dietProgram[]=[];
  constructor(private DietProgramService: DietProgramService) {}
  ngOnInit(): void{
    this.getmeals();
  }
  getmeals():void {
    this.DietProgramService.getDietPrograms().subscribe(dietprograms => this.dietprograms = dietprograms)
  }
  

}
