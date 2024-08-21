import { Component } from '@angular/core';
import { DietProgramService } from '../services/diet-program.service';
import { dietProgram } from '../interfaces/diet-program';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-last-diet-plan',
  templateUrl: './last-diet-plan.component.html',
  styleUrl: './last-diet-plan.component.css'
})
export class LastDietPlanComponent {
  dietprograms: dietProgram[]=[];
  
  constructor(
    private DietProgramService: DietProgramService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void{
    this.getPrograms();
  }

  getPrograms(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.DietProgramService.getUserDietPrograms(id).subscribe(data => { this.dietprograms = data; console.log("programs", data)})
  }
  

}
