import { Component } from '@angular/core';
import { SystemRecommendationService } from '../services/system-recommendation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-system-recommendation',
  templateUrl: './system-recommendation.component.html',
  styleUrl: './system-recommendation.component.css'
})
export class SystemRecommendationComponent {
  weekdays: String[]=['Plan 1', 'Plan 2', 'Plan 3', 'Plan 4']

  fullPlan: any; 
  isLoading: boolean = true;
  error: string | null = null; 
  meals: any[] = []; 


  constructor(
    private systemRecommendationService: SystemRecommendationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("loading");
    
    this.systemRecommendationService.getUserSystemRecommendation(id).subscribe(
      (dietPlan) => {
        this.fullPlan = dietPlan;
        this.isLoading = false; // Set loading to false when data is received
        this.meals = this.fullPlan.meals['0']; // Extract meals from the fullPlan object
        console.log("fullplan", dietPlan);
      },
      (error) => {
        this.error = "Error fetching diet programs or meals summary.";
        this.isLoading = false; // Set loading to false even if there is an error
        console.error("Error fetching diet programs or meals summary:", error);
      }

    );
  }

}

