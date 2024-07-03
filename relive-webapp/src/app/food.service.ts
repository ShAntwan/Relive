import { Injectable } from '@angular/core';
import { Food } from './food';
import { FOODS } from './mock-data';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    // private http: HttpClient,
    private messageService: MessageService) { }

  private foodsUrl = 'api/foods';
  private log(message: string) {
    this.messageService.add(`FoodService: ${message}`);
  }

  getFoods(): Observable<Food[]> {
    const foods = of(FOODS);
    this.messageService.add('FoodService: fetched foods');
    return foods;
  }

  getFood(id: number): Observable<Food> {
    // For now, assume that a food with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const food = FOODS.find(f => f.id === id)!;
    this.messageService.add(`FoodService: fetched food id=${id}`);
    return of(food);
  }

}
