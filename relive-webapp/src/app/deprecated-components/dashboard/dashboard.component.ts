import { Component, OnInit } from '@angular/core';
import { Food } from '../../interfaces/food';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodService: FoodService) {}
  
  ngOnInit(): void {
    // this.getFoods();
    this.getFoodsAPI();
  }
  
  getFoodsAPI(): void {
    // console.log('promise', this.foodService.getFoodsAPI())
    this.foodService.getFoodsAPI().then((data: any) => { this.foods = data.slice(1, 5) }).then(()=>{console.log("inner foods:", this.foods)})
    // console.log("foods:", this.foods)
  }

  // getFoods(): void {
  //   this.foodService.getFoods().subscribe(foods => this.foods = foods.slice(1, 5))
  // }

}
