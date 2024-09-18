import { Component, Injectable, OnInit } from '@angular/core';
import { Food } from '../interfaces/food';
import { FoodService } from '../services/food.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})

export class FoodsComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodService: FoodService, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.getFoodsAPI()
  }

  getFoodsAPI(): void {
    this.foodService.getFoodsAPI().then((data: any) => { this.foods = data }).then(()=>{console.log("inner foods:", this.foods)})
    console.log("foods:", this.foods)
  }
}
