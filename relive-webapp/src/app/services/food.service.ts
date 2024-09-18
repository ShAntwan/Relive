import { Injectable } from '@angular/core';
import { Food } from '../interfaces/food';
import { MealFood } from '../interfaces/meal-food';
import { Observable, of } from 'rxjs';
import { baseURL } from './baseURL';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  getAll = 'FoodItems/getAll/';
  getSpecific = 'FoodItems/get/';
  updateFood = 'FoodItems/update/'
  getFoodsByMeal = 'MealFoods/getByMeal/'

  constructor(
    private http: HttpClient,
  ) { }

  async getFoodsAPI(): Promise<Food[]> {
    // gets all food items
    const data = await fetch(baseURL+this.getAll)
    return await data.json()
  }

  async getFoodAPI(FoodID: number): Promise<Food> {
    // gets a single food item
    const data = await fetch(baseURL+this.getSpecific+String(FoodID))
    return await data.json()
  }

  getFoodsAPIhttpGet(): Observable<Food[]> {
    return this.http.get<Food[]>(baseURL+this.getAll)
    // return this.http.get<Food[]>(baseURL+this.getAllItems)
  }

  updateFoodItem(foodItem: Food): Observable<Object> {
    // maker sure the return type from the server is JSON
    return this.http.post(baseURL+this.updateFood, foodItem)
  }

  getFoodItemsByMeal(mealID: number): Observable<MealFood[]> {
    return this.http.get<MealFood[]>(baseURL+this.getFoodsByMeal+String(mealID))
    // return this.http.get<Food[]>(baseURL+this.getAllItems)
  }
}
