import { Component, Injectable, OnInit } from '@angular/core';
import { Food } from '../interfaces/food';
import { FoodService } from '../services/food.service';
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
    // console.log(this.foodService.getFoodsAPIhttpGet())
    // this.foodService.getFoodsAPIhttpGet().subscribe(foods => this.foods = foods)
    // this.foodService.getFoodsAPIhttpGet().subscribe(foods => this.foods = foods.map((item) => { 
    //   item.FoodName = decodeURI(item.FoodName);
    //   item.FoodNameDisp = decodeURI(item.FoodNameDisp);
    //   item.Category = decodeURI(item.Category);
    //   item.ImagePath = decodeURI(item.ImagePath);
    //   return item
    // }))
    this.foodService.getFoodsAPI().then((data: any) => { this.foods = data }).then(()=>{console.log("inner foods:", this.foods)})
    console.log("foods:", this.foods)
  }
}

// @Injectable({providedIn: 'root'})
// export class ConfigService {
//   constructor(private http: HttpClient) {
//     // This service can now make HTTP requests via `this.http`.
//   }
// }