import { Injectable } from '@angular/core';
import { Food } from '../interfaces/food';
// import { FOODS } from './mock-data';
import { Observable, of } from 'rxjs';
import { baseURL } from './baseURL';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  getAll = 'FoodItems/getAll/';
  // getAllItems = "FoodItems/getAll/"
  getSpecific = 'FoodItems/get/';
  updateFood = 'FoodItems/update/'

  constructor(
    private http: HttpClient,
    // private messageService: MessageService
  ) { }

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

}
