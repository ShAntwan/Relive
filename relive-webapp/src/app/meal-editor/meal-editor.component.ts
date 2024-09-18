import { Component } from '@angular/core';
import { FoodService } from '../services/food.service';
import { HttpClient } from '@angular/common/http';
import { MealFood } from '../interfaces/meal-food';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-meal-editor',
  templateUrl: './meal-editor.component.html',
  styleUrl: './meal-editor.component.css'
})
export class MealEditorComponent {
  mealFoods: MealFood[] = [];

  constructor(
    private foodService: FoodService,    
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getFoodsByMeal()
  }

  getFoodsByMeal(): void {
    const mealID = Number(this.route.snapshot.paramMap.get('id'));
    this.foodService.getFoodItemsByMeal(mealID).subscribe(data => { this.mealFoods = data; console.log(data) });
    console.log(this.mealFoods)
  }

}
