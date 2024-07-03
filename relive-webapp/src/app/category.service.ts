import { Injectable } from '@angular/core';
import { Category } from './categories';
import { CATEGORIES } from './mock-data';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    // private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`CategoryService: ${message}`);
  }

  getCategories(): Observable<Category[]> {
    const categories = of(CATEGORIES);
    this.messageService.add('CategoryService: fetched categories');
    return categories;
  }

  getCategory(id: number): Observable<Category> {
    // For now, assume that a food with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const category = CATEGORIES.find(f => f.id === id)!;
    this.messageService.add(`CategoryService: fetched category id=${id}`);
    return of(category);
  }
}