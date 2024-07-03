import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})

export class FoodsComponent implements OnInit {
  // foods = FOODS
  foods: Food[] = [];

  constructor(private foodService: FoodService) {}
  
  ngOnInit(): void {
    this.getFoods();
  }
  
  getFoods(): void {
    this.foodService.getFoods().subscribe(foods => this.foods = foods)
  }
}