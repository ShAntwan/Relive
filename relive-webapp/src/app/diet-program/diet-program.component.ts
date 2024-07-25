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
  constructor(private DietProgramService: DietProgramService) {}
  ngOnInit(): void{
    this.getmeals();
  }
  getmeals():void {
    this.DietProgramService.getDietPrograms().subscribe(dietprograms => this.dietprograms = dietprograms)
  }
}
