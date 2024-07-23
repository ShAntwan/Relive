import { Component, Injectable, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';
// import { ConfigService } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})

export class FoodsComponent implements OnInit {
  // foods = FOODS
  foods: Food[] = [];

  constructor(private foodService: FoodService, private http: HttpClient) {}
  
  ngOnInit(): void {
    // this.getFoods();
    this.getFoodsAPI()
  }
  
  // getFoods(): void {
  //   this.foodService.getFoods().subscribe(foods => this.foods = foods)
  // }

  getFoodsAPI(): void {
    // console.log('promise', this.foodService.getFoodsAPI())
    this.foodService.getFoodsAPI().then((data: any) => { this.foods = data }).then(()=>{console.log("inner foods:", this.foods)})
    // console.log("foods:", this.foods)
  }
}

// @Injectable({providedIn: 'root'})
// export class ConfigService {
//   constructor(private http: HttpClient) {
//     // This service can now make HTTP requests via `this.http`.
//   }
// }