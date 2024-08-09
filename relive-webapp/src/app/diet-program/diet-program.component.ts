import { Component,OnInit } from '@angular/core';
import { DietProgramService } from '../services/diet-program.service';
import { dietProgram } from '../interfaces/diet-program';

@Component({
  selector: 'app-diet-program',
  templateUrl: './diet-program.component.html',
  styleUrl: './diet-program.component.css'
})
export class DietProgramComponent {
  dietprograms: dietProgram[]=[];
  
  weekdays: String[]=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  hours = Array.from({ length: 25 }).map((_, i) => i + ":00").slice(5,24)

  constructor(private DietProgramService: DietProgramService) {}
  
  ngOnInit(): void{
    this.getmeals();
    console.log(this.hours)
  }

  getmeals():void {
    this.DietProgramService.getDietPrograms().subscribe(dietprograms => this.dietprograms = dietprograms)
  }
}
