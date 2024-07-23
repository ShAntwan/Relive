import { Injectable } from '@angular/core';
import { Food } from './food';
import { FOODS } from './mock-data';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  baseURL = 'http://localhost:8080/';
  getAll = 'getFoodItems';
  getSpecific = 'getFoodItem/';
  updateFood = 'updatefooditem/'

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private foodsUrl = 'api/foods';
  // private log(message: string) {
    // this.messageService.add(`FoodService: ${message}`);
  // }

  // getFoods(): Observable<Food[]> {
  //   const foods = of(FOODS);
  //   this.messageService.add('FoodService: fetched foods');
  //   return foods;
  // }

  // getFood(FoodID: number): Observable<Food> {
  //   // For now, assume that a food with the specified `id` always exists.
  //   // Error handling will be added in the next step of the tutorial.
  //   const food = FOODS.find(f => f.FoodID === FoodID)!;
  //   this.messageService.add(`FoodService: fetched food id=${FoodID}`);
  //   return of(food);
  // }

  async getFoodsAPI(): Promise<Food[]> {
    // gets all food items
    const data = await fetch(this.baseURL+this.getAll)
    return await data.json()
  }

  async getFoodAPI(FoodID: number): Promise<Food> {
    // gets a single food item
    const data = await fetch(this.baseURL+this.getSpecific+String(FoodID))
    return await data.json()
  }

  updateFoodItem(foodItem: Food): Observable<Object> {
    // maker sure the return type from the server is JSON
    return this.http.post(this.baseURL+this.updateFood, foodItem)
  }

}
